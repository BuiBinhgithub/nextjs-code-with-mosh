import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";

export default function Home() {
  return (
    <main>
      <h1>HomePage</h1>
      <ProductCard />
      <Link href="/users" className="text-blue-500 underline">
        go to Users
      </Link>
    </main>
  );
}
