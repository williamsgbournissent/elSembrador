import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface IDataItem {
  fecha: string; // Assuming fecha is a string, adjust type if it's different
  tipo: string; // Assuming tipo is a string, adjust type if it's different
  // Add more properties if there are any
}

interface IData {
  data: IDataItem[];
}

export const TypeOrder: React.FC<IData> = ({ data }) => {
  const [datos, setDatos] = useState<IDataItem[]>([]);
  const [arrayTiposUnicos, setArrayTiposUnicos] = useState<string[]>([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string | null>(null);
  const { setValue, getValue } = useLocalStorage();

  useEffect(() => {
    setDatos(data);

    const selectedDay = getValue("DayOrder");

    if (selectedDay && data) {
      const selectedData = data.filter((item) => item.fecha === selectedDay);
      const tipos = selectedData.map((item) => item.tipo);
      const tiposUnicos = Array.from(new Set(tipos));
      setArrayTiposUnicos(tiposUnicos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const seleccionarTipo = (tipo: string) => {
    setTipoSeleccionado(tipo);
    setValue("TypeOrder", tipo);
  };

  return (
    <>
      {arrayTiposUnicos.map((tipo, index) => (
        <button
          key={index}
          className={`cursor-pointer ${
            tipo === tipoSeleccionado ? "bg-blue-200" : "bg-transparent"
          }`}
          onClick={() => seleccionarTipo(tipo)}
        >
          {tipo}
        </button>
      ))}
    </>
  );
};
