"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

export default function SelectRole() {
  let roles = [
    { value: "usuario", label: "Usuario" },
    { value: "admin", label: "Admin" },
    { value: "cliente", label: "Cliente" },
  ];

  const [selectedRole, setSelectedRole] = useState(roles[0].value);

  const handleSelectionChange = (e: any) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        size="sm"
        label="Role"
        className="max-w-xs"
        items={roles}
        selectedKeys={[selectedRole]}
        onChange={handleSelectionChange}
        defaultSelectedKeys={[roles[0].value]}
      >
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
