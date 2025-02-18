import Link from "next/link";
import React, { Suspense } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import UserTable from "./UserTable";

interface Props {
  searchParams: { sortOrder: string };
}
const UserPage = async ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <h1>User page</h1>

      <Suspense
        fallback={<span className="loading loading-spinner loading-lg"></span>}
      >
        <Link href={"/users/new"} className="btn">
          New User
        </Link>
        <UserTable sortOrder={sortOrder} />
        <Link href="/" className="text-blue-500 underline ml-4">
          go back
        </Link>
      </Suspense>
    </>
  );
};

export default UserPage;
