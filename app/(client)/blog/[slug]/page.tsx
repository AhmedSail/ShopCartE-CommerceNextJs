import { getSingleBlog } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import React from "react";
import Image from "next/image";
import { Blog, Blogcategory } from "@/sanity.types";
import { PageProps } from "next";
const Page = async ({ params, searchParams }: PageProps<{ slug: string }>) => {
  const blog = await getSingleBlog(params.slug);

  if (!blog) return <div className="text-center py-20">Blog not found</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 mt-20 px-4">
      {/* 🖼️ الصورة الرئيسية */}
      {blog.mainImage && (
        <Image
          src={urlFor(blog.mainImage).url()}
          alt={blog.title}
          className="w-full h-full object-cover rounded-lg mb-6"
        />
      )}

      {/* 📝 العنوان والوصف */}
      <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
      <p className="text-gray-600 mb-4">{blog.description}</p>

      {/* 📅 تاريخ النشر */}
      <p className="text-sm text-gray-500 mb-2">
        Published on: {new Date(blog.publishedAt).toLocaleDateString()}
      </p>

      {/* 🏷️ التصنيفات */}
      {blog.blogcategories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.blogcategories.map((cat) => (
            <span
              key={cat._id}
              className="bg-shop_light_green text-white px-3 py-1 rounded-full text-sm"
            >
              {cat.title}
            </span>
          ))}
        </div>
      )}

      {/* 📚 المحتوى */}
      <div className="prose prose-lg max-w-none">
        <PortableText value={blog.body} />
      </div>
    </div>
  );
};

export default Page;
