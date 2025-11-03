import { CategoryData, FooterData, SocialMedia } from "@/constants/data";
import Container from "./Container";
import FooterTop from "./footerTop";
import Logo from "./Logo";
import Link from "next/link";
import { SubText, SubTitle, Title } from "./text";
import { Input } from "./ui/input";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-10">
      <Container>
        <FooterTop />
        <div className="mt-10 px-4 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-10 border-b">
            {/* Logo + Description + Social */}
            <div className="flex flex-col gap-5">
              <Logo />
              <SubText className="text-lightcolor max-w-xs">
                Discover curated furniture collections at Shopcart, blending
                style and comfort to elevate your living spaces.
              </SubText>
              <ul className="flex gap-4 text-lightcolor">
                {SocialMedia.map((s) => (
                  <li
                    key={s.id}
                    className="relative group p-2 border rounded-full border-lightcolor hover:text-darkcolor hoverEffect"
                  >
                    <Link href={s.href} target="_blank">
                      <s.icon className="w-5 h-5" />
                    </Link>
                    <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 px-2 py-1 text-sm text-white font-bold bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {s.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-5 text-lightcolor">
              <SubTitle className="text-darkcolor font-bold">
                Quick Links
              </SubTitle>
              <ul className="flex flex-col gap-3">
                {FooterData.map((f) => (
                  <li key={f.id}>
                    <Link
                      href={f.href}
                      className="hover:text-darkcolor hoverEffect"
                    >
                      {f.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-5 text-lightcolor">
              <SubTitle className="text-darkcolor font-bold">
                Categories
              </SubTitle>
              <ul className="flex flex-col gap-3">
                {CategoryData.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={c.href}
                      className="hover:text-darkcolor hoverEffect"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-5 text-lightcolor">
              <SubTitle className="text-darkcolor font-bold">
                Newsletter
              </SubTitle>
              <p className="max-w-xs">
                Subscribe to our newsletter to receive updates and exclusive
                offers.
              </p>
              <form className="space-y-3 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-lightcolor text-center mt-5">
            &copy; 2025{" "}
            <span className="text-darkcolor font-bold ">ShopCart</span> All
            rights reserved.
          </h1>
        </div>
      </Container>
    </footer>
  );
}
