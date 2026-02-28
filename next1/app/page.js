import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Welcome to my Home page!</h1>
        <div className="mt-4 lg:mt-0">
          <Link href="/about" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">About Us</Link>
        </div>
        <div className="mt-4 lg:mt-0">
          <Link href="/contact" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Contact Us</Link>
        </div>
        <div className="mt-4 lg:mt-0">
          <Link href="/register" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Register</Link>
        </div>
        <div className="mt-4 lg:mt-0">
          <Link href="/login" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</Link>
        </div>
      </div>
    </main>
  );
}
