"use client";

import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  const filtered = data.filter((p) => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <main className="p-5 max-w-6xl mx-auto">
      <input 
        type="text"
        placeholder="Search products..."
        className="w-full p-3 mb-8 border rounded-lg focus:outline-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {/* Responsive Grid - IV.3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}