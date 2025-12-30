const Heading = ({
  icon: Icon,
  title,
  subtitle,
  iconBg = "bg-indigo-100",
  iconColor = "text-indigo-600",
}) => {
  return (
    <div className="flex items-center gap-3 mb-6 cursor-default">
      <div
        className={`w-10 h-10 md:w-14 md:h-14  rounded-xl shadow-inner ${iconBg} flex items-center justify-center`}
      >
        {Icon && <Icon className={iconColor} />}
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs md:text-sm text-slate-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default Heading;
