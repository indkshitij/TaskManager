const StatCard = ({
  title,
  value,
  icon,
  color = "indigo",
  subtitle = "Overview",
}) => {
  const colorStyles = {
    indigo: {
      accent: "border-l-indigo-500",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },
    green: {
      accent: "border-l-green-500",
      bg: "bg-green-50",
      text: "text-green-600",
    },
    yellow: {
      accent: "border-l-yellow-500",
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    red: {
      accent: "border-l-red-500",
      bg: "bg-red-50",
      text: "text-red-600",
    },
  };

  const styles = colorStyles[color] || colorStyles.indigo;

  return (
    <div
      className={`group bg-white border border-slate-200/80 border-l-6  ${styles.accent} rounded-2xl px-6 py-5 shadow-sm transition-all duration-200 ease-in-out flex items-center justify-between hover:shadow-md hover:-translate-y-1 cursor-default`}
    >
      {/* Left */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>

        <h2 className="text-5xl font-extrabold text-slate-800 leading-none">
          {value}
        </h2>

        <div
          className={`inline-flex items-center gap-2 px-3 py-1
            rounded-full text-xs font-semibold
            ${styles.bg} ${styles.text}`}
        >
          <span className="w-2 h-2 rounded-full bg-current"></span>
          {subtitle}
        </div>
      </div>

      {/* Icon */}
      {icon && (
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${styles.bg} ${styles.text} shadow-inner transition-transform duration-200 group-hover:scale-[1.04]`}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatCard;
