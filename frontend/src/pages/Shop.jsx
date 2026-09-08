import { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import ShopTabs from "../components/ShopTabs";
import SearchBar from "../components/SearchBar";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import Marketplace from "../components/Marketplace";
import BlankPlaceholder from "../components/BlankPlaceholder";

const Shop = () => {
  const [activeTab, setActiveTab] = useState("marketplace");

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <TopBar />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col bg-white md:my-6 md:max-w-5xl md:overflow-hidden md:rounded-3xl md:border md:border-gray-100 md:shadow-sm">
        <HeroBanner />
        <ShopTabs activeTab={activeTab} onChange={setActiveTab} />
        <SearchBar />

        <div className="flex-1 bg-gray-50 mt-4 md:pb-10">
          {activeTab === "top-brands" && <BlankPlaceholder title="Top Brands" />}
          {activeTab === "nearby-stores" && <BlankPlaceholder title="Nearby Stores" />}
          {activeTab === "marketplace" && <Marketplace />}
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default Shop;