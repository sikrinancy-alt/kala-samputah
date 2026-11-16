const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

// Load .env.local if present
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI is not set in environment or .env.local");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema(
  {
    email:    { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    name:     { type: String, default: "Admin" },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log(" Connected to MongoDB successfully.");

    const email = process.env.ADMIN_EMAIL || process.argv[2] || "admin@kalasamputah.com";
    const plainPassword = process.env.ADMIN_PASSWORD || process.argv[3] || "Admin@123456";
    const name = "Nancy Sikri";

    console.log(`Checking existing admin with email: ${email}`);
    const existing = await Admin.findOne({ email });

    if (existing) {
      existing.password = plainPassword; // Schema pre-save hook handles hashing
      existing.name = name;
      await existing.save();
      console.log(`✅ Admin updated successfully:`);
    } else {
      await Admin.create({
        email,
        password: plainPassword,
        name,
      });
      console.log(`✅ Admin created successfully:`);
    }

    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${plainPassword}`);
    console.log(`   URL:      /admin/login`);

    await mongoose.disconnect();
    console.log("Finished.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
