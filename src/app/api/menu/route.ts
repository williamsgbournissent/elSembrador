import { NextResponse } from "next/server";
import menu from "@/schemas/menu";
import connectDB from "@/libs/connectDB";

type Menu = {
  idMenu: Number;
  fecha: String;
  opcion: String;
  tipo: String;
};

export async function POST(req: Request) {
  await connectDB();
  try {
    const data: Menu = await req.json();

    const newMenu = await menu.create(data);

    if (newMenu) {
      return NextResponse.json(
        { message: "Creado con exito." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Error al crear el menu." },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  try {
    const menus = await menu.find();

    return NextResponse.json({ menus }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
