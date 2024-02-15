import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface IDataItem {
  fecha: string; // Assuming fecha is a string, adjust type if it's different
  tipo: string; // Assuming tipo is a string, adjust type if it's different
  opcion: string; // Assuming opcion is a string, adjust type if it's different
  // Add more properties if there are any
}

interface IData {
  data: IDataItem[];
}

export const OptionOrder: React.FC<IData> = ({ data }) => {
  const [datos, setDatos] = useState<IDataItem[]>([]);
  const [arrayOpcionesUnicas, setArrayOpcionesUnicas] = useState<string[]>([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(
    null
  );
  const { setValue, getValue } = useLocalStorage();

  useEffect(() => {
    setDatos(data);

    const selectedDay = getValue("DayOrder");
    const selectedType = getValue("TypeOrder");

    if (selectedDay && selectedType && data) {
      const selectedData = data.filter(
        (item) => item.fecha === selectedDay && item.tipo === selectedType
      );
      const opciones = selectedData.map((item) => item.opcion);
      const opcionesUnicas = Array.from(new Set(opciones));
      setArrayOpcionesUnicas(opcionesUnicas);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const seleccionarOpcion = (opcion: string) => {
    setOpcionSeleccionada(opcion);
    setValue("OptionOrder", opcion);
  };

  return (
    <>
      {arrayOpcionesUnicas.map((opcion, index) => (
        <button
          key={index}
          className={`cursor-pointer ${
            opcion === opcionSeleccionada ? "bg-blue-200" : "bg-transparent"
          }`}
          onClick={() => seleccionarOpcion(opcion)}
        >
          {opcion}
        </button>
      ))}
    </>
  );
};
