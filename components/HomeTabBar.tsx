import { TabBarData } from "@/constants/data";
import Link from "next/link";
interface Props {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}
export default function HomeTabBar({ selectedTab, setSelectedTab }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center flex-wrap gap-5">
        <div className="flex justify-start items-center max-sm:overflow-x-scroll gap-5 text-sm font-semibold">
          {TabBarData.map((t) => (
            <div key={t.id}>
              <button
                value={t.value}
                className={`px-4 py-2 md:px-6 md:py-2 rounded-full transition-colors duration-200
  ${
    selectedTab === t.title
      ? "bg-shop_light_green text-white border border-shop_light_green"
      : "bg-shop_light_green/10 text-shop_dark_green border border-shop_light_green/30 hover:bg-shop_light_green hover:text-white"
  }`}
                onClick={() => setSelectedTab(t?.title)}
              >
                {t.title}
              </button>
            </div>
          ))}
        </div>
        <div>
          <Link
            href={"/shop"}
            className="border px-4 py-2 rounded-full font-semibold hover:bg-black hover:text-white hoverEffect hover:border-none"
          >
            See all
          </Link>
        </div>
      </div>
    </div>
  );
}
