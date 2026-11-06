import { NextResponse }   from "next/server";
import { getAdminSession } from "../../../lib/auth";
import { uploadImage, deleteImage } from "../../../lib/cloudinary";
import { getClientIp, checkRateLimit } from "../../../lib/rateLimit";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB  = 10;
const MAX_SIZE_B   = MAX_SIZE_MB * 1024 * 1024;

export async function POST(req) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Rate limit — max 30 uploads per hour per admin session
  const ip        = getClientIp(req);
  const rateLimit = checkRateLimit(`upload:${ip}`, 30, 60 * 60);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: `Upload limit reached. Try again in ${Math.ceil(rateLimit.resetSeconds / 60)} minutes.` },
      { status: 429, headers: { "Retry-After": String(rateLimit.resetSeconds) } }
    );
  }

  try {
    const contentType = req.headers.get("content-type") || "";
    let fileData;
    let mimeType;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file     = formData.get("file");

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      // MIME type validation
      if (!ALLOWED_MIME.includes(file.type)) {
        return NextResponse.json(
          { error: "Only JPG, PNG, WEBP or GIF images are allowed." },
          { status: 415 }
        );
      }

      // Size validation
      const arrayBuffer = await file.arrayBuffer();
      if (arrayBuffer.byteLength > MAX_SIZE_B) {
        return NextResponse.json(
          { error: `File too large. Maximum allowed size is ${MAX_SIZE_MB} MB.` },
          { status: 413 }
        );
      }

      const buffer = Buffer.from(arrayBuffer);

      // Magic bytes check — verify file header matches declared MIME
      const magic = buffer.slice(0, 4).toString("hex");
      const validMagic =
        magic.startsWith("ffd8ff") ||           // JPEG
        magic.startsWith("89504e47") ||          // PNG
        magic.startsWith("52494646") ||          // WEBP (RIFF)
        magic.startsWith("47494638");            // GIF

      if (!validMagic) {
        return NextResponse.json(
          { error: "File content does not match its declared type." },
          { status: 415 }
        );
      }

      fileData = `data:${file.type};base64,${buffer.toString("base64")}`;
      mimeType = file.type;

    } else {
      const body = await req.json();
      if (!body.base64) {
        return NextResponse.json({ error: "No base64 data provided" }, { status: 400 });
      }

      // Validate base64 data URI prefix
      const match = body.base64.match(/^data:(image\/[a-z+]+);base64,/);
      if (!match || !ALLOWED_MIME.includes(match[1])) {
        return NextResponse.json(
          { error: "Invalid or unsupported image format." },
          { status: 415 }
        );
      }

      fileData = body.base64;
    }

    const result = await uploadImage(fileData, "kala-samputah/artworks");
    return NextResponse.json(result, { status: 201 });

  } catch (err) {
    console.error("[UPLOAD]", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { publicId } = await req.json();
    if (!publicId || typeof publicId !== "string") {
      return NextResponse.json({ error: "publicId required" }, { status: 400 });
    }

    // Only allow deleting from our own folder
    if (!publicId.startsWith("kala-samputah/")) {
      return NextResponse.json({ error: "Cannot delete images outside project folder." }, { status: 403 });
    }

    const result = await deleteImage(publicId);
    return NextResponse.json({ success: true, result });

  } catch (err) {
    console.error("[DELETE IMAGE]", err);
    return NextResponse.json({ error: err.message || "Delete failed" }, { status: 500 });
  }
}
