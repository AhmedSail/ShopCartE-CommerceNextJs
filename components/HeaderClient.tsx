// HeaderClient.tsx (Client Component)
"use client";

import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";
import CartIcon from "./CartIcon";
import Favorite from "./Favorite";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Search from "./Search";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";

const HeaderClient = ({
  userId,
  orders,
}: {
  userId: string | null;
  orders: any[] | null;
}) => {
  return (
    <div>
      <header className="fixed w-full top-0 z-50 bg-white/30 backdrop-blur-md py-5">
        <Container className="flex justify-between items-center">
          <div className="w-auto md:w-1/3 flex justify-start items-center">
            <MobileMenu />
            <Logo />
          </div>
          <HeaderMenu />
          <div className="flex justify-center items-center gap-3">
            <Search />
            <CartIcon />
            <Favorite />
            <ClerkLoaded>
              <SignedIn>
                <Link href="/orders" className="relative">
                  <Logs className="relative" />
                  {orders && orders.length > 0 && (
                    <span className="bg-shop_btn_dark_green text-white absolute -top-1 -right-1 w-4 h-3.5 rounded-full text-sm font-semibold flex items-center justify-center">
                      {orders.length}
                    </span>
                  )}
                </Link>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignIn />
              </SignedOut>
            </ClerkLoaded>
          </div>
        </Container>
      </header>
    </div>
  );
};

export default HeaderClient;
