import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between p-4 bg-blue-600 text-white">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
        </header>
    );
}
