import { getLatestBlogs } from "@/sanity/queries";
import React from "react";
import { Title } from "./text";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { Blog } from "@/sanity.types";

const LatestBlogs = async () => {
  const blogs: Blog[] = await getLatestBlogs();
  return (
    <div>
      <Title className="text-2xl">Latest Blog</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-5 ">
        {blogs.map((b: Blog) => (
          <div key={b._id} className="rounded-lg">
            {b?.mainImage && (
              <Link href={`/blog/${b?.slug?.current}`}>
                <Image
                  src={urlFor(b?.mainImage).url()}
                  alt="blog image"
                  width={500}
                  height={500}
                  className="w-full max-h-80 object-cover"
                />
              </Link>
            )}
            <div className="bg-shop_light_bg p-5 mb-10 rounded-lg">
              <div className="text-xs flex items-center gap-5">
                <div className="flex items-center relative group cursor-pointer">
                  {b?.blogcategories?.map((item, index) => (
                    <p
                      key={index}
                      className="font-semibold text-shop_dark_green tracking-wider"
                    >
                      {item?.title}
                    </p>
                  ))}
                  <span className="absolute left-0 -bottom-1 bg-lightcolor/30 inline-block w-full  group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect"></span>
                </div>
                <p className="flex items-center gap-1 text-lightcolor relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                  <Calendar size={15} />{" "}
                  {dayjs(b?.publishedAt).format("MMMM D, YYYY")}
                  <span className="absolute left-0 -bottom-1 bg-lightcolor/30 inline-block w-full  group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect"></span>
                </p>
                <p></p>
              </div>
              <Link
                href={`/blog/${b?.slug?.current}`}
                className="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-shop_dark_green hoverEffect"
              >
                {b?.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
