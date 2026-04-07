export default function Button({ text, onClick, color = "blue" }) {
  return (
    <button 
      onClick={onClick}
      className={`bg-${color}-500 text-white px-4 py-2 rounded hover:opacity-80 transition`}
    >
      {text}
    </button>
  );
}