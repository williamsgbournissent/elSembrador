"use client";

import { DayOrder } from "@/components/Steps/DayOrder";
import { TypeOrder } from "@/components/Steps/TypeOrder";
import { OptionOrder } from "@/components/Steps/OptionOrder";
import { ConfirmationOrder } from "@/components/Steps/ConfirmationOrder";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const OrderForm = () => {
  const [datos, setDatos] = useState<any[]>([]);
  const [etapa, setEtapa] = useState<number>(1);

  const { setValue } = useLocalStorage();

  const fetchMenu = async () => {
    const response = await fetch("/api/menu", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const result = data.menus;

    setDatos(result);
  };

  const onAdelanteClick = () => {
    if (etapa >= 4) return;
    setEtapa((prev) => prev + 1);
    setValue("etapa", (etapa + 1).toString());
  };
  const onAtrasClick = () => {
    if (etapa === 1) return;
    setEtapa((prev) => prev - 1);
    setValue("etapa", (etapa - 1).toString());
  };

  useEffect(() => {
    setEtapa(parseInt(localStorage.getItem("etapa") ?? "1"));
    fetchMenu();
  }, []);

  return (
    <>
      {etapa === 1 ? (
        <DayOrder data={datos} />
      ) : etapa === 2 ? (
        <TypeOrder data={datos} />
      ) : etapa === 3 ? (
        <OptionOrder data={datos} />
      ) : (
        <ConfirmationOrder data={datos} />
      )}
      <div onClick={onAdelanteClick}>Adelante</div>
      <div onClick={onAtrasClick}>Atras</div>
    </>
  );
};

export default OrderForm;
