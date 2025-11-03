"use client";
import React from "react";
import { PuffLoader } from "react-spinners";

const loading = () => {
  const text = "Shopcart".split("");

  return (
    <div className="flex flex-col place-content-center gap-10 items-center justify-center min-h-[60vh]">
      <h2 className="text-4xl font-black tracking-wider uppercase font-sans flex">
        {text.map((char, index) => (
          <span
            key={index}
            className={`text-shop_dark_green ${
              char === "t" ? "text-shop_light_green" : ""
            } animate-fade-in-out`}
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: "1.5s",
              animationIterationCount: "infinite",
            }}
          >
            {char}
          </span>
        ))}
      </h2>

      <PuffLoader color="#063d29" />
    </div>
  );
};

export default loading;
