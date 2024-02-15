import { NextResponse } from "next/server";
import user from "@/schemas/user";
import connectDB from "@/libs/connectDB";
import type { Profile } from "@/types/userTypes";

export async function POST(req: Request) {
  await connectDB();
  try {
    const data: Profile = await req.json();
    const existingEmail = await user.findOne({ email: data.email });

    if (existingEmail) {
      return NextResponse.json(
        { error: "El email utilizado ya se encuentra registrado." },
        { status: 400 }
      );
    }

    const newUser = await user.create(data);

    if (newUser) {
      return NextResponse.json({ message: "Usuario creado" }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Error al crear usuario" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  try {
    const users = await user.find();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json("Internal Server Error");
  }
}

export async function PATCH(req: Request) {
  await connectDB();

  if (req.method === "PATCH") {
    try {
      const { userId, newRole } = await req.json();

      const updateRole = await user.findByIdAndUpdate(
        userId,
        { role: newRole },
        { new: true }
      );

      return NextResponse.json({ user: updateRole });
    } catch (error) {
      return NextResponse.json({ message: "Error Interno" }, { status: 500 });
    }
  }
}
