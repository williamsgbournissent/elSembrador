"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IUserConfirmation } from "@/types/userTypes";

const fetchAPI = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [usuarioId, setUsuarioId] = useState<string>("");
  const [menus, setMenus] = useState([]);

  const { data: session } = useSession();

  const existingEmail = session?.user?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchAPI("/api/profile");
        const user = userData.users.find(
          (user: IUserConfirmation) => user.email === existingEmail
        );
        if (user) {
          setUsuarioId(user._id);
        }

        const pedidosData = await fetchAPI("/api/order");
        const pedidosUsuario = pedidosData.pedidos.filter(
          (pedido: any) => pedido.cliente === usuarioId
        );
        setPedidos(pedidosUsuario);

        const menuIds = pedidosUsuario.map((pedido: any) => pedido.menuId);
        const menuData = await fetchAPI("/api/menu");
        const menus = menuData.menus.filter((menu: any) =>
          menuIds.includes(menu.idMenu)
        );
        setMenus(menus);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, [existingEmail, usuarioId]);

  return (
    <>
      <h1>Pedidos del Usuario</h1>
      {pedidos.length > 0 ? (
        <ul>
          {pedidos.map((pedido: any) => (
            <li key={pedido._id}>
              <p>Pedido ID: {pedido.menuId}</p>
              <p>Cliente: {pedido.cliente}</p>
              <p>Menú:</p>
              <ul>
                {menus
                  .filter((menu: any) => menu.idMenu === pedido.menuId)
                  .map((menu: any) => (
                    <li key={menu._id}>
                      <p>Tipo: {menu.tipo}</p>
                      <p>Opcion: {menu.opcion}</p>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron pedidos para este usuario.</p>
      )}
    </>
  );
};

export default Pedidos;
