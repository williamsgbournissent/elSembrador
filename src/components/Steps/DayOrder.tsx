import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface IDataItem {
  fecha: string;
}

interface IData {
  data: IDataItem[];
}

export const DayOrder: React.FC<IData> = ({ data }) => {
  const [datos, setDatos] = useState<IDataItem[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(
    null
  );
  const [arrayFechasUnicas, setArrayFechasUnicas] = useState<string[]>([]);
  const { setValue } = useLocalStorage();

  useEffect(() => {
    setDatos(data);

    const fechas = data.map((item) => item.fecha);

    const fechasUnicas = Array.from(new Set(fechas));

    setArrayFechasUnicas(fechasUnicas);
  }, [data]);

  const seleccionarFecha = (fecha: string) => {
    setFechaSeleccionada(fecha);
    setValue("DayOrder", fecha);
  };

  return (
    <>
      {arrayFechasUnicas.length === 0 ? (
        <p>No hay fechas disponibles</p>
      ) : (
        arrayFechasUnicas.map((fecha, index) => (
          <button
            key={index}
            className={`cursor-pointer ${
              fecha === fechaSeleccionada ? "bg-blue-200" : "bg-transparent"
            }`}
            onClick={() => seleccionarFecha(fecha)}
          >
            {fecha}
          </button>
        ))
      )}
    </>
  );
};
