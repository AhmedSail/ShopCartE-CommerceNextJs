import Container from "@/components/Container";
import NoAccessToCart from "@/components/NoAccessToCart";
import WishListProduct from "@/components/WishListProduct";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishList = async () => {
  const user = await currentUser();
  return (
    <div className="mt-24">
      <Container>
        {user ? (
          <div>
            <WishListProduct />
          </div>
        ) : (
          <NoAccessToCart />
        )}
      </Container>
    </div>
  );
};

export default WishList;
