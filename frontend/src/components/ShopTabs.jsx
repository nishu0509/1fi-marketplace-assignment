const TABS = [
  { key: "top-brands", label: "Top Brands" },
  { key: "nearby-stores", label: "Nearby Stores" },
  { key: "marketplace", label: "1Fi Marketplace" },
];

const ShopTabs = ({ activeTab, onChange }) => {
  return (
    <div className="mx-4 -mt-5 flex gap-1 rounded-full bg-violet-100 p-1.5 shadow-sm md:mx-10 md:mt-6 md:w-fit md:gap-1.5 md:p-2">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-semibold transition md:flex-none md:px-6 md:py-2.5 ${
            activeTab === tab.key
              ? "bg-white text-violet-700 shadow"
              : "text-violet-400 hover:text-violet-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ShopTabs;