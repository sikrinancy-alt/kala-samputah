import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Admin from "../../../../models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json().catch(() => ({}));
    const secret = body.secret || req.nextUrl.searchParams.get("secret");

    // Protection: allow seed if no admin exists yet OR if correct secret provided
    const adminCount = await Admin.countDocuments();
    const allowedSecret = process.env.ADMIN_SEED_SECRET || "kala-admin-seed-2026";

    if (adminCount > 0 && secret !== allowedSecret) {
      return NextResponse.json(
        { error: "Admin already exists. Pass valid secret to reset." },
        { status: 403 }
      );
    }

    const email = (body.email || "admin@kalasamputah.com").toLowerCase().trim();
    const password = body.password || "Admin@123456";
    const name = body.name || "Nancy Sikri";

    let admin = await Admin.findOne({ email });
    if (admin) {
      admin.password = password; // Schema pre-save hook hashes with bcrypt
      admin.name = name;
      await admin.save();
    } else {
      admin = await Admin.create({ email, password, name });
    }

    return NextResponse.json({
      success: true,
      message: "Admin seeded successfully",
      admin: {
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (err) {
    console.error("[POST /api/admin/seed]", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
