import { defineQuery } from "next-sanity";

const BRAND_QUERY = defineQuery(`*[_type=='brand']|order(name asc)`);
const BLOG_QUERY = defineQuery(`*[_type=='blog']|order(name asc)`);
const SINGLE_BLOG_QUERY = defineQuery(`
  *[_type == "blog" && slug.current == $slug][0]{
    ...,
    blogcategories[]->{
      _id,
      title,
      slug
    }
  }
`);
const BRAND_SINGLE_QUERY = defineQuery(
  `*[_type=='product' && slug.current == $slug] | order(name asc) {
    "brandName": brand->title
  }`
);
const LATEST_BLOG_QUERY = defineQuery(
  `*[_type=='blog'&&isLatest==true]|order(name asc){
    ...,
    blogcategories[]->{
        title
    }
  }`
);
const DEAL_PRODUCTS = defineQuery(
  `*[_type=='product'&&status=='hot']|order(name asc){
    ...,
    categories[]->{
        title
    }
  }`
);

const GET_PRODUCT_BY_SLUG = defineQuery(
  `*[_type == "product" && slug.current == $slug][0]{
    ...,
    categories[]->{ title },
    images,
    price,
    discount,
    stock,
    status,
    name,
    description
  }`
);
const MY_ORDER_QUERY = defineQuery(
  `*[_type=='order' && clerkUserId==$userId]|order(orderData desc){
  ...,products[]{
    ...,product->
  }}`
);
export {
  BRAND_QUERY,
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  GET_PRODUCT_BY_SLUG,
  BRAND_SINGLE_QUERY,
  BLOG_QUERY,
  MY_ORDER_QUERY,
  SINGLE_BLOG_QUERY,
};
