"use client";
import { useState } from "react";
import productsData from "./productsData";

export default function Page() {
  const [products] = useState(productsData);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredData =
    activeCategory === "all"
      ? products
      : products.filter((item) => item?.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fff] text-black font-sans">
      <div className="flex gap-2 mb-4">
        {categories.map((item) => (
          <button
            key={item}
            className={`border py-2 rounded-xl px-2 ${
              activeCategory === item ? "bg-amber-300" : ""
            }`}
            onClick={() => setActiveCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="w-full">
              <div className="text-sm text-gray-500">{product.category}</div>
              <div className="font-semibold mt-1">{product.title}</div>
              <div className="text-xl font-black text-amber-400 mt-2">
                ${product.price}
              </div>
              <button className="cursor-pointer mt-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold px-3 py-2 rounded-xl transition-all duration-200 active:scale-95 hover:shadow-lg hover:shadow-amber-400/30">
                + ADD
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}