// SideMenu.tsx
"use client";
import { FC } from "react";
import Logo from "./Logo";
import { headerData, SocialMedia } from "@/constants/data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useOutsideClick } from "@/hooks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const path = usePathname();
  const sidebarref = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-full h-screen bg-black text-lightcolor shadow-xl transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4" ref={sidebarref}>
        <div className="mt-4">
          <div className=" flex justify-between items-center">
            <Logo />
            <button onClick={onClose} className="text-white">
              {/* Hamburger icon for closing */}
              <div className="md:hidden w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
                <div
                  className={`w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] rotate-[-45deg]`}
                ></div>
                <div
                  className={`w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] rotate-[45deg]`}
                ></div>
              </div>
            </button>
          </div>
          <div>
            <div>
              <ul className="md:hidden flex flex-col text-lg mt-5 items-start gap-7 font-bold  capitalize text-lightcolor">
                {headerData.map((m) => (
                  <li key={m.id}>
                    <Link
                      href={m.href}
                      onClick={onClose}
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
              <ul className="flex justify-start items-center gap-10 mt-10">
                {SocialMedia.map((s) => (
                  <div
                    className="relative group inline-block text-lightcolor border border-text-lightcolor p-3 rounded-full cursor-pointer hover:border-shop_dark_green hover:text-white hoverEffect "
                    key={s.id}
                  >
                    <Link
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      <s.icon />
                    </Link>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-sm text-black font-bold bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {s.title}
                    </span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
