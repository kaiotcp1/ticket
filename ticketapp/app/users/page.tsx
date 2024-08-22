import UserForm from "@/components/UserForm";
import { User } from "lucide-react";
import React from "react";
import DataTableSimple from "./data-table-simple";
import prisma from "@/prisma/db";

const Users = async () => {

  const user = await prisma.user.findMany();

  return <div>
    <UserForm />
    <DataTableSimple users={user} />
  </div>;
};

export default Users;
