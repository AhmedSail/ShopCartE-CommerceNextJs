import Image from "next/image";
import banner from "@/images/banner_1.png";
import Link from "next/link";
export default function HomeBanner() {
  return (
    <div>
      <h1 className="bg-shop-light-pink py-16 md:py-0 rounded-lg px-10 lg:px-24 flex items-center justify-between mt-[80px]">
        <div>
          <h1 className="text-shop_dark_green text-3xl font-bold w-80">
            Grab Upto 50% Off on Selected headphone
          </h1>
          <Link
            href={"/shop"}
            className="inline-block bg-shop_btn_dark_green/90  text-white px-4 py-2 rounded-md font-bold mt-4 hover:bg-shop_btn_dark_green hoverEffect font-sans"
          >
            Buy Now
          </Link>
        </div>
        <div>
          <Image
            src={banner}
            width={400}
            height={100}
            alt="Shop Banner"
            className="hidden md:inline-block w-96"
          />
        </div>
      </h1>
    </div>
  );
}
