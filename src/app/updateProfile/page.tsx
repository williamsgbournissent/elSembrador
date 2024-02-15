"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { FormData } from "@/types/userTypes";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    direccion: "",
    departamento: "",
    celular: "",
    image: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        fullname: session?.user?.name || "",
        email: session?.user?.email || "",
        image: session?.user?.image || "",
      }));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "celular" && isNaN(Number(value))) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <label>
        Dirección:
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Departamento:
        <input
          type="text"
          name="departamento"
          value={formData.departamento}
          onChange={handleChange}
        />
      </label>
      <label>
        Celular:
        <input
          type="text"
          name="celular"
          value={formData.celular}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
}
