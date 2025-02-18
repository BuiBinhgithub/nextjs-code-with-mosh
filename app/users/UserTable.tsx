import Link from "next/link";
import React from "react";
import { sort } from "fast-sort";
interface Users {
  id: number;
  name: string;
  email: string;
}
interface Props {
  sortOrder: string;
}
const UserTable = async ({ sortOrder }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: Users[] = await res.json();

  const sortUser = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );
  return (
    <table className="table table-border">
      <thead>
        <tr>
          <th>
            <Link href="/users?sortOrder=name">name</Link>
          </th>
          <th>
            <Link href="/users?sortOrder=email">email</Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortUser?.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
