import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategory from "@/components/HomeCategory";
import LatestBlogs from "@/components/LatestBlogs";
import ProductsGrid from "@/components/productsGrid";
import ShopByBrand from "@/components/ShopByBrand";
import { getCategories } from "@/sanity/queries";
const Home = async () => {
  const categories = await getCategories(6);
  console.log(categories);

  return (
    <div>
      <Container>
        <HomeBanner />
        <div className="py-10">
          <ProductsGrid />
        </div>
        <HomeCategory categories={categories} />
        <ShopByBrand />
        <LatestBlogs />
      </Container>
    </div>
  );
};
export default Home;
