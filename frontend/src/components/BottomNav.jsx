const NAV_ITEMS = [
  { icon: "🏠", label: "Home" },
  { icon: "🛍️", label: "Shop", active: true },
  { icon: "🧾", label: "EMI Dues" },
  { icon: "📈", label: "Limit" },
  { icon: "👤", label: "Profile" },
];

const BottomNav = () => {
  return (
    <nav className="sticky bottom-0 flex justify-around border-t border-gray-100 bg-white py-2.5 md:hidden">
      {NAV_ITEMS.map((item) => (
        <div
          key={item.label}
          className={`flex flex-col items-center gap-1 text-xs ${
            item.active ? "text-violet-700 font-semibold" : "text-gray-400"
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;
