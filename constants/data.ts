import { Linkedin, Github, Facebook } from "lucide-react";

export const headerData = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Shop", href: "/shop" },
  { id: 3, title: "Blog", href: "/blog" },
  { id: 5, title: "Hot Deal", href: "/deal" },
];
export const FooterData = [
  { id: 1, title: "About us", href: "/about" },
  { id: 3, title: "Terms & Conditions", href: "/terms&conditions" },
  { id: 4, title: "Privacy Policy", href: "/policy" },
  { id: 5, title: "FAQs", href: "/faqs" },
  { id: 6, title: "Help", href: "/help" },
];
export const CategoryData = [
  { id: 1, title: "Mobiles", href: "/category/mobiles" },
  { id: 2, title: "Appliances", href: "/category/appliances" },
  { id: 3, title: "Smartphones", href: "/category/smartphones" },
  { id: 4, title: "Air Conditioners", href: "/category/air-conditioners" },
  { id: 5, title: "Washing Machine", href: "/category/washing-machine" },
  { id: 6, title: "Kitchen Appliances", href: "/category/kitchen-appliances" },
  { id: 7, title: "Gadget Accessories", href: "/category/gadget-accessories" },
];
export const TabBarData = [
  { id: 1, title: "Gadget", value: "gadget" },
  { id: 2, title: "Appliances", value: "appliances" },
  { id: 3, title: "Refrigerators", value: "refrigerators" },
  { id: 4, title: "Others", value: "others" },
];

export const SocialMedia = [
  {
    id: 1,
    title: "GitHub",
    href: "https://github.com/AhmedSail",
    icon: Github, // لاحظ بدون <>
  },
  {
    id: 2,
    title: "LinkedIn",
    href: "https://linkedin.com/in/your-profile",
    icon: Linkedin,
  },
  {
    id: 3,
    title: "Facebook",
    href: "https://www.facebook.com/ahmed.qompoz/",
    icon: Facebook,
  },
];
