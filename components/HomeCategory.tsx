import { Category } from "@/sanity.types";
import { Title } from "./text";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export default function HomeCategory({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div>
      <div className="border border-shop_light_green/20 my-10 md:my-20 rounded-lg p-5 lg:p-7">
        <Title className="text-black text-2xl mb-5">Popular Categories</Title>
        <hr />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
          {categories.map((c) => (
            <div
              key={c._id}
              className="bg-shop_lighter_bg p-5 flex items-center gap-3 group"
            >
              {c?.image && (
                <div className="overflow-hidden border border-shop_orange/30 hover:border-shop_orange hoverEffect w-20 h-20 p-1">
                  {c?.slug?.current ? (
                    <Link
                      href={{
                        pathname: "/shop",
                        query: { category: c?.slug?.current },
                      }}
                    >
                      <Image
                        src={urlFor(c.image).url()}
                        alt={c.title || "Category Image"}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={urlFor(c.image).url()}
                      alt={c.title || "Category Image"}
                      width={500}
                      height={500}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-base font-semibold">{c?.title}</h3>
                <p className="text-sm">
                  <span className="font-bold text-shop_dark_green">{`(${c?.productCount})`}</span>{" "}
                  items Availbale
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
