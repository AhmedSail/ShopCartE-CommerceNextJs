"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderMenu() {
  const path = usePathname();
  return (
    <div>
      <ul className="hidden md:flex justify-center items-center gap-7 font-bold text-sm capitalize text-lightcolor">
        {headerData.map((m) => (
          <li key={m.id}>
            <Link
              href={m.href}
              className={`hover:text-shop_light_green hoverEffect relative group ${
                path === m.href ? "text-shop_light_green" : ""
              }`}
            >
              {m.title}
              <span
                className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-shop_light_green group-hover:w-1/2 group-hover:left-0 hoverEffect 
                   ${path === m.href ? "w-1/2" : ""} `}
              ></span>
              <span
                className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-shop_light_green group-hover:w-1/2 group-hover:right-0 hoverEffect 
                   ${path === m.href ? "w-1/2" : ""} `}
              ></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
