// Header.tsx (Server Component)
import { currentUser } from "@clerk/nextjs/server";
import { getMyOrders } from "@/sanity/queries";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const user = await currentUser();
  const userId = user?.id || null;
  const orders = userId ? await getMyOrders(userId) : [];

  return <HeaderClient userId={userId} orders={orders} />;
};

export default Header;
