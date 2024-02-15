export type IUser = {
  fullname: string;
  email: string;
  celular: number;
  direccion: string;
  departamento?: string;
  image?: string;
  role: UserRole;
};

export type User = {
  _id: string;
  direccion: string;
  fullname: string;
  email: string;
  image: string;
  role: string;
};

export type UserRole = "Usuario" | "Admin" | "Cliente";

export type Profile = {
  fullname: string;
  email: string;
  celular: number;
  direccion: string;
  departamento?: string;
  image?: string;
};

export type FormData = {
  fullname: string;
  email: string;
  direccion: string;
  departamento?: string;
  celular: number | "";
  image?: string;
};

export type UserMap = {
  id: string;
  fullname: string;
  email: string;
  celular: number;
  direccion: string;
  departamento?: string;
  image?: string;
  role: UserRole;
};

export interface IDataItem {
  idMenu: number;
  fecha: string;
  tipo: string;
  opcion: string;
}

export interface IData {
  data: IDataItem[];
}

export interface IUserConfirmation {
  _id: string;
  clienteId: number;
  email: string;
}

export interface IMenu {
  idMenu: string | number;
}
