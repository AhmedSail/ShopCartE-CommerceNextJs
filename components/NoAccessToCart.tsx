"use client";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton, useSignIn } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";

export default function NoAccessToCart() {
  const { signIn } = useSignIn();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4  mt-20 ">
      <div className="bg-white p-10 rounded-lg shadow-xl flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-sm text-muted-foreground mb-6 font-semibold w-96">
          You need to be signed in to view your cart and proceed to checkout.
        </p>
        <SignInButton>
          <button className="rounded-sm w-full py-2 cursor-pointer text-white bg-[#436959] font-semibold -mt-5 mb-3">
            Sign In to Continue
          </button>
        </SignInButton>
        <h1 className="text-shop_light_text font-semibold text-sm">
          Don't have an account?
        </h1>
        <SignUpButton>
          <button className="rounded-sm w-full py-2 cursor-pointer  font-semibold shadow border  text-black">
            Sign In to Continue
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}
