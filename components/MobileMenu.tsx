// MobileMenu.tsx
"use client";
import { useState } from "react";
import SideMenu from "./SideMenu";

export default function MobileMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="z-50 "
      >
        <div className="md:hidden w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
          <div
            className={`w-[50%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] ${
              isSidebarOpen ? "rotate-[-45deg]" : ""
            }`}
          ></div>
          <div
            className={`w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center ${
              isSidebarOpen ? "hidden" : ""
            }`}
          ></div>
          <div
            className={`w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] ${
              isSidebarOpen ? "rotate-[45deg]" : ""
            }`}
          ></div>
        </div>
      </button>

      <SideMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
