import { User, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "@/components/UI/icons";
import ModalEdit from "@/components/UI/ModalEdit";

export type User = {
  _id: string;
  direccion: string;
  fullname: string;
  email: string;
  image: string;
  role: string;
  celular: number;
};

export const columns = [
  {
    key: "direccion",
    label: "Direccion",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "celular",
    label: "Celular",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const renderCell = (user: User, columnKey: React.Key) => {
  const cellValue = user[columnKey as keyof User];

  switch (columnKey) {
    case "direccion":
      return (
        <User
          avatarProps={{ radius: "lg", src: user.image }}
          description={user.fullname}
          name={cellValue}
        >
          {user.direccion}
        </User>
      );
    case "email":
      return <span>{user.email}</span>;
    case "role":
      return <span>{user.role}</span>;
    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <Tooltip content="Edit user">
            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
              <ModalEdit />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="cursor-pointer text-lg text-danger active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
