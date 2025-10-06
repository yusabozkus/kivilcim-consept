"use client";

import React from "react";
import { DataTable } from "./data-table";
import { columns, User } from "./columns";

interface UsersClientProps {
  data: User[];
}

export default function UsersClient({ data }: UsersClientProps) {

  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
