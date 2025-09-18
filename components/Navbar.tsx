"use client";
import Link from "next/link";
import {
  Home,
  Folder,
  ShoppingBag,
  Wrench,
  Edit3,
  IdCard
} from "lucide-react";

export default function IconNavbar() {
  const items = [
    { href: "/", icon: <Home size={22} /> },
    { href: "/aboutme", icon: <IdCard size={22} /> },
    { href: "/projects", icon: <ShoppingBag size={22} /> },
    { href: "/tools", icon: <Wrench size={22} /> },
    { href: "/contact", icon: <Edit3 size={22} /> },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className="
          flex justify-around items-center gap-6
          px-6 py-3
          backdrop-blur-xl bg-white/10 border border-white/20
          rounded-full shadow-lg shadow-black/20
        "
      >
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="text-gray-200 hover:text-orange-400 transition-colors duration-200"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </nav>
  );
}
