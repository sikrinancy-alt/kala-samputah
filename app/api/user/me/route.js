import { NextResponse }     from "next/server";
import { connectDB }         from "../../../../lib/mongodb";
import { getUserSession }    from "../../../../lib/userAuth";
import User                  from "../../../../models/User";

export async function GET() {
  const session = getUserSession();
  if (!session) return NextResponse.json({ user: null }, { status: 200 });

  try {
    await connectDB();
    const user = await User.findById(session.id).select("-password").lean();
    if (!user) return NextResponse.json({ user: null }, { status: 200 });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
