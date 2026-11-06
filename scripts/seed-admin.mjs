import mongoose from "mongoose";
import Admin from "../models/Admin.js";

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
const ADMIN_NAME = process.env.ADMIN_NAME || "Nancy Sikri";

if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Set MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD before running this script.");
  process.exit(1);
}

if (ADMIN_PASSWORD.length < 12) {
  console.error("ADMIN_PASSWORD must be at least 12 characters.");
  process.exit(1);
}

try {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });

  const email = ADMIN_EMAIL.trim().toLowerCase();
  let admin = await Admin.findOne({ email });

  if (admin) {
    admin.password = ADMIN_PASSWORD;
    admin.name = ADMIN_NAME;
  } else {
    admin = new Admin({
      email,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    });
  }

  await admin.save();
  console.log(`Admin account seeded for ${email}.`);
} catch (error) {
  console.error("Admin seed failed. Check the MongoDB URI, database credentials, and network access.");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
