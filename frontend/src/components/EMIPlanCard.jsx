import { formatINR } from "../utils/format";

const EMIPlanCard = ({ plan, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
        isSelected
          ? "border-violet-700 bg-violet-50 ring-1 ring-violet-700"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div>
        <p className="font-semibold text-gray-900">
          {formatINR(plan.monthlyAmount)} <span className="font-normal text-gray-500">x {plan.tenureMonths} months</span>
        </p>
        {plan.cashback > 0 && (
          <p className="mt-0.5 text-sm text-green-600">
            Additional cashback of {formatINR(plan.cashback)}
          </p>
        )}
      </div>
      <span className="shrink-0 text-sm font-medium text-gray-600">
        {plan.interestRate === 0 ? "0% interest" : `${plan.interestRate}% interest`}
      </span>
    </button>
  );
};

export default EMIPlanCard;
