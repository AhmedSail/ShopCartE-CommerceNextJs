import Link from "next/link";
import { Title } from "./text";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

const extraData = [
  {
    id: 1,
    title: "Free Delivery",
    description: "Free Shipping Over 100$",
    icon: <Truck size={45} />,
  },
  {
    id: 2,
    title: "Free Return",
    description: "Free Shipping Over 100$",
    icon: <GitCompareArrows size={45} />,
  },
  {
    id: 3,
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    id: 4,
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];
const ShopByBrand = async () => {
  const brands = await getAllBrands();
  console.log("Brands:", brands);
  return (
    <div className="bg-[#F8F8FB] mb-10 lg:pb-20 p-5 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title className="text-black text-2xl mb-5">Shop By Brands</Title>
        <Link
          href={"/shop"}
          className="text-md font-semibold tracking-wide hover:text-shop_btn_dark_green hoverEffect"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {brands?.map((b) => (
          <Link
            href={{ pathname: "/shop", query: { brand: b?.slug?.current } }}
            key={b._id}
            className="bg-white w-36 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop_btn_dark_green/10 hoverEffect"
          >
            {b?.image && (
              <Image
                src={urlFor(b.image).url()}
                alt={b.title || "Brand Image"}
                width={250}
                height={250}
                className="w-32 h-20 object-contain "
              />
            )}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 mt-10">
        {extraData.map((eD) => (
          <div
            key={eD.id}
            className="flex justify-center items-center gap-2 text-shop_light_text"
          >
            <i>{eD.icon}</i>
            <div>
              <span className="block font-bold">{eD.title}</span>
              <span className="text-sm">{eD.description}</span>
            </div>
          </div>
        ))}
      </div>
      <hr className="mt-5" />
    </div>
  );
};

export default ShopByBrand;
