const HeroBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-violet-800 to-violet-600 px-5 pb-8 pt-6 text-white md:px-10 md:pb-12 md:pt-10">
      <div className="pointer-events-none absolute -right-10 -top-10 hidden h-56 w-56 rounded-full bg-white/10 md:block" />
      <div className="pointer-events-none absolute -bottom-16 right-16 hidden h-40 w-40 rounded-full bg-white/10 md:block" />

      <div className="relative z-10 md:max-w-lg">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
          ✦ NO-COST EMIs
        </span>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
          Shop today,
          <br />
          <span className="italic font-semibold">Pay later using</span>
          <br />
          Mutual funds.
        </h1>
        <p className="mt-2 text-sm text-violet-100 md:text-base">
          No credit score required. No interest.
          <br />
          Backed by your investments.
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;