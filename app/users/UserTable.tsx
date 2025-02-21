import Link from "next/link";
import React, { useCallback } from "react";
import { sort } from "fast-sort";
import { PrismaClient } from "@prisma/client";
import { FaTrash } from "react-icons/fa";
import { assert } from "console";
interface Users {
  id: number;
  name: string;
  email: string;
}
interface Props {
  sortOrder: string;
}
const UserTable = async ({ sortOrder }: Props) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();

  const sortUser = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );
  return (
    <table className="table table-border">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=id">stt</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=name">name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">email</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=action">action</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortUser?.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="align-middle">
              <FaTrash />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
