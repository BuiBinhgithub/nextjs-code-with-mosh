import Link from "next/link";
import React from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import UserTable from "./UserTable";

const UserPage = async () => {
  return (
    <>
      <p>user page</p>
      <UserTable />
      <Link href="/" className="text-blue-500 underline">
        go back
      </Link>
    </>
  );
};

export default UserPage;
