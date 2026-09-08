const BlankPlaceholder = ({ title }) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-violet-50">
        <span className="text-2xl">🛠️</span>
      </div>
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      <p className="mt-1 text-sm text-gray-400">Coming soon</p>
    </div>
  );
};

export default BlankPlaceholder;
