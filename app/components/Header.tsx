"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

const navItems = [
  { name: "Home", path: "/" },
  { name: "Favorites ❤️", path: "/favorites" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Admin", path: "/admin" },
];


  return (
    <header className="border-b border-gray-300 p-4 flex justify-center">
      <nav className="flex gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-full text-sm transition 
                ${isActive 
                  ? "bg-black text-white" 
                  : "text-gray-700 hover:bg-black hover:text-white"
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
