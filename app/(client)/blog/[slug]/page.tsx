import { getSingleBlog } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import NotFoundPage from "@/app/not-found";

// تعريف الدالة الصحيح
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) {
    return NotFoundPage();
  }

  return (
    <div className="max-w-3xl mx-auto py-10 mt-20 px-4">
      {/* 🖼️ الصورة الرئيسية */}
      {blog.mainImage ? (
        <Image
          src={urlFor(blog.mainImage).url()}
          alt={`${blog.title}`}
          width={820}
          height={580}
          className="w-full h-full object-cover rounded-lg mb-6"
        />
      ) : (
        <div className="w-full h-[300px] bg-gray-100 rounded-lg mb-6 flex items-center justify-center text-gray-400">
          No image available
        </div>
      )}

      {/* 📝 العنوان والوصف */}
      <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>

      {/* 📅 تاريخ النشر */}
      <p className="text-sm mb-2 bg-shop_light_green px-3 py-1 rounded-full text-white font-semibold">
        Published on: {new Date(blog?.publishedAt || "").toLocaleDateString()}
      </p>

      {/* 📚 المحتوى */}
      <div className="prose prose-lg max-w-none">
        {blog.body && <PortableText value={blog.body} />}
      </div>
    </div>
  );
};

export default Page;
