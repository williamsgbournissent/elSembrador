import { NextResponse } from "next/server";
import order from "@/schemas/order";
import connectDB from "@/libs/connectDB";

type pedidoCliente = {
  menuId: any;
  menu: any;
  clienteId: any;
  cliente: any;
  comentario: any;
};

export async function POST(req: Request) {
  try {
    await connectDB();
    const data: pedidoCliente = await req.json();

    if (!data.menu || !data.cliente) {
      return NextResponse.json(
        {
          error: "Es necesaria toda la informacion para poder crear el pedido.",
        },
        { status: 400 }
      );
    }

    const pedido = await order.create(data);

    if (pedido) {
      return NextResponse.json(
        { message: "Pedido creado con exito." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "No fue posible crear el pedido." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error en la función POST:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const pedidos = await order.find();
    return NextResponse.json({ pedidos });
  } catch (error) {
    console.log(error);
  }
}
