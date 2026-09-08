const SearchBar = ({ placeholder = "Search online stores..." }) => {
  return (
    <div className="mx-4 mt-4 flex items-center gap-2 rounded-full bg-gray-100 px-4 py-3 md:mx-10 md:mt-5 md:max-w-lg">
      <span className="text-gray-400">🔍</span>
      <input
        type="text"
        disabled
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-gray-500 placeholder:text-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;