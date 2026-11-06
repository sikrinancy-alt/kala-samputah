import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

/**
 * Upload a base64 or URL string to Cloudinary.
 * @param {string} file   — base64 data URI or remote URL
 * @param {string} folder — Cloudinary folder, defaults to "kala-samputah"
 * @returns {Promise<{url: string, publicId: string, width: number, height: number}>}
 */
export async function uploadImage(file, folder = "kala-samputah/artworks") {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    transformation: [
      { quality: "auto:best" },
      { fetch_format: "auto"  },
    ],
    overwrite: false,
  });

  return {
    url:      result.secure_url,
    publicId: result.public_id,
    width:    result.width,
    height:   result.height,
    format:   result.format,
  };
}

/**
 * Delete an image from Cloudinary by its public_id.
 */
export async function deleteImage(publicId) {
  return cloudinary.uploader.destroy(publicId);
}

/**
 * Generate a signed upload URL for direct browser uploads (optional, advanced).
 */
export function getSignedUploadParams(folder = "kala-samputah/artworks") {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET
  );
  return {
    timestamp,
    signature,
    apiKey:    process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
  };
}

export default cloudinary;
