const NAV_ITEMS = [
  { icon: "🏠", label: "Home" },
  { icon: "🛍️", label: "Shop", active: true },
  { icon: "🧾", label: "EMI Dues" },
  { icon: "📈", label: "Limit" },
  { icon: "👤", label: "Profile" },
];

const TopBar = () => {
  return (
    <header className="sticky top-0 z-20 hidden border-b border-gray-100 bg-white/90 backdrop-blur md:block">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-700 text-sm font-bold text-white">
            1Fi
          </div>
          <span className="text-lg font-semibold text-gray-900">Shop</span>
        </div>
        <nav className="flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 text-sm transition ${
                item.active
                  ? "font-semibold text-violet-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default TopBar;
