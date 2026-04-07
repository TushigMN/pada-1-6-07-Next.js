"use client";

export default function ProductCard({ item }) {
  // fakestoreapi product shape: { title, image, description, price }
  return (
    <div className="product-card">
      <img src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <span>${item.price}</span>
    </div>
  );
}
