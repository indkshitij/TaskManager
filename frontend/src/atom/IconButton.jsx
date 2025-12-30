import React from "react";
import { useNavigate } from "react-router-dom";

const IconButton = ({
  label = "Action",
  type = "button",
  onClick,
  to,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  icon: Icon,
  iconSize = 14,
  iconColor = "",
  bg = "",
  hoverBg = "",
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled || loading) return;
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  const variants = {
    primary: "bg-indigo-100 text-indigo-600 hover:bg-indigo-200",
    secondary: "bg-slate-100 text-slate-600 hover:bg-slate-200",
    danger: "bg-red-100 text-red-600 hover:bg-red-200",
    success: "bg-green-100 text-green-600 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    info: "bg-cyan-100 text-cyan-600 hover:bg-cyan-200",
    dark: "bg-slate-800 text-white hover:bg-slate-900",
    outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  const bgStyles = bg ? `${bg} ${hoverBg || ""}` : variants[variant];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={`group/icon-btn cursor-pointer flex items-center overflow-hidden rounded-lg px-2 py-1.5 transition-all duration-500 hover:scale-[1.15] ${bgStyles} ${
        disabled || loading ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
    >
      {/* Icon */}
      {Icon && (
        <span
          className={`transition-transform duration-500 group-hover/icon-btn:-translate-x-1 ${
            iconColor || ""
          }`}
        >
          <Icon size={iconSize} />
        </span>
      )}

      <span className="  text-xs font-medium whitespace-nowrap opacity-0 scale-95 max-w-0 transition-all duration-500 group-hover/icon-btn:opacity-100 group-hover/icon-btn:scale-100 group-hover/icon-btn:max-w-20">
        {label}
      </span>
    </button>
  );
};

export default IconButton;
