import { Product } from "@/sanity.types";
import { client } from "../lib/client";
import { sanityFetch } from "../lib/live";
import {
  BLOG_QUERY,
  BRAND_QUERY,
  BRAND_SINGLE_QUERY,
  DEAL_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  LATEST_BLOG_QUERY,
  MY_ORDER_QUERY,
} from "./query";
import { defaultConfig } from "next/dist/server/config-shared";
import { SINGLE_BLOG_QUERY } from "./query";
const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(title asc) [0...${quantity}] {
      _id,
      title,
      slug,
      image,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
      : `*[_type == 'category'] | order(title asc) {
      _id,
      title,
      slug,
      image,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`;

    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data;
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};
const getAllCategories = async () => {
  try {
    const query = `*[_type == 'category'] | order(title asc) {
  _id,
  title,
  slug,
  image,
  "productCount": count(*[_type == "product" && references(^._id)])
}`;

    const { data } = await sanityFetch({ query });
    return data;
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};
const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({
      query: BRAND_QUERY,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};
const getBrand = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: BRAND_SINGLE_QUERY,
      params: { slug }, // ✅ تمرير الـ slug هنا
    });
    return data?.[0] ?? null; // لأن الاستعلام يرجع array
  } catch (error) {
    console.log("Error fetching Brand", error);
    return null;
  }
};
const getMyOrders = async (userId: string) => {
  try {
    const orders = await sanityFetch({
      query: MY_ORDER_QUERY,
      params: { userId }, // ✅ تمرير الـ slug هنا
    });
    return orders?.data ?? null; // لأن الاستعلام يرجع array
  } catch (error) {
    console.log("Error fetching order", error);
    return null;
  }
};
const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({
      query: LATEST_BLOG_QUERY,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching latest blogs", error);
    return [];
  }
};
const getAllBlog = async () => {
  try {
    const { data } = await sanityFetch({
      query: BLOG_QUERY,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching blogs", error);
    return [];
  }
};

const getSingleBlog = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: SINGLE_BLOG_QUERY,
      params: { slug },
    });
    return data?.[0] ?? null; // لأن الاستعلام يرجع array
  } catch (error) {
    console.log("Error fetching single blog", error);
    return null;
  }
};
const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({
      query: DEAL_PRODUCTS,
    });
    return data ?? [];
  } catch (error) {
    console.log("Error fetching deal product", error);
    return [];
  }
};
const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: GET_PRODUCT_BY_SLUG,
      params: { slug }, // ✅ لازم تمرر الـ slug هنا
    });
    return data ?? null;
  } catch (error) {
    console.log("Error fetching product", error);
    return null;
  }
};

export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getDealProducts,
  getProductBySlug,
  getBrand,
  getAllCategories,
  getAllBlog,
  getMyOrders,
  getSingleBlog,
};
