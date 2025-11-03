import { Clock, Mail, MapPin, Phone } from "lucide-react";

interface ContentItemData {
  title?: string;
  subTitle?: string;
  icon: React.ReactNode;
}

const data: ContentItemData[] = [
  {
    title: "Visit Us",
    subTitle: "New Orlean, USA",
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subTitle: "+12 958 648 597",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subTitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subTitle: "Shopcart@gmail.com",
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
];
export default function FooterTop() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-lightcolor border-b pb-5 px-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-4 sm:items-center sm:justify-start"
        >
          <div className="shrink-0">
            <i>{item.icon}</i>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-gray-900 text-base">{item.title}</h1>
            <span className="text-sm text-gray-600">{item.subTitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
