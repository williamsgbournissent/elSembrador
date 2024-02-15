"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { IDataItem, IData, IUserConfirmation, IMenu } from "@/types/userTypes";

const fetchAPI = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const ConfirmationOrder: React.FC<IData> = ({ data }) => {
  const [datos, setDatos] = useState<IDataItem[]>([]);
  const [idMenu, setIdMenu] = useState<number>(0);
  const [menuId, setMenuId] = useState<string>("");
  const [idUsuario, setIdUsuario] = useState<string>("");
  const [clienteId, setClienteId] = useState<number>(0);
  const router = useRouter();
  const { getValue } = useLocalStorage();
  const { data: session } = useSession();

  const existingEmail = session?.user?.email;
  const selectedDay = getValue("DayOrder") as string | undefined;
  const selectedType = getValue("TypeOrder") as string | undefined;
  const selectedOption = getValue("OptionOrder") as string | undefined;

  useEffect(() => {
    setDatos(data);

    const fetchData = async () => {
      try {
        const userData = await fetchAPI("/api/profile");
        const user = userData.users.find(
          (user: IUserConfirmation) => user.email === existingEmail
        );
        if (user) {
          setIdUsuario(user._id);
          setClienteId(user.clienteId);
        }

        const menuData = await fetchAPI("/api/menu");
        const menu = menuData.menus.find(
          (item: IMenu) => item.idMenu === idMenu
        );
        if (menu) {
          setMenuId(menu._id);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (selectedDay && selectedType && selectedOption && data) {
      const selectedData = data.filter(
        (item) =>
          item.fecha === selectedDay &&
          item.tipo === selectedType &&
          item.opcion === selectedOption
      );
      const idMenu = selectedData.map((item) => item.idMenu);
      setIdMenu(idMenu[0]);
    }

    fetchData();
  }, [data, existingEmail, selectedDay, selectedType, selectedOption, idMenu]);

  function clearLocalStorage() {
    localStorage.removeItem("DayOrder");
    localStorage.removeItem("TypeOrder");
    localStorage.removeItem("OptionOrder");
    localStorage.removeItem("etapa");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menu: menuId,
          cliente: idUsuario,
          clienteId: clienteId,
          menuId: idMenu,
        }),
      });
      if (response.ok) {
        console.log("Pedido creado con éxito");
        router.push("/");
        clearLocalStorage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Resumen de tu pedido</h1>
        <p>Día: {selectedDay}</p>
        <p>Tipo: {selectedType}</p>
        <p>Opción: {selectedOption}</p>
      </div>
      <button type="submit">SE PUDRE</button>
    </form>
  );
};
