"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname() || "/";

    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/register", label: "Register" },
        { href: "/login", label: "Login" },
    ];

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const baseClass = "text-gray-700 hover:text-teal-600";
    const activeClass = "text-teal-600 font-semibold";

    return (
        <header className="bg-[#171717] border-b border-[#333]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="text-white font-semibold text-teal-600">
                            Welcome to my website!
                        </Link>
                    </div>

                    <nav className="hidden md:flex md:space-x-8" aria-label="Main navigation">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={`${baseClass} ${isActive(l.href) ? activeClass : ""}`}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="md:hidden">
                        <button
                            onClick={() => setOpen((v) => !v)}
                            aria-controls="mobile-menu"
                            aria-expanded={open}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div id="mobile-menu" className="md:hidden border-t">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={`block px-3 py-2 text-base font-medium ${isActive(l.href) ? activeClass : "text-gray-700"} hover:bg-gray-50`}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
