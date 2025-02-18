import React from "react";
interface Users {
  id: number;
  name: string;
  email: string;
}
const UserTable = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: Users[] = await res.json();
  return (
    <table className="table table-border">
      <thead>
        <tr>
          <th>name</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
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
