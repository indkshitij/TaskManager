import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({
  text = "Button",
  loadingText = "Processing...",
  type = "button",
  onClick,
  to,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  icon: Icon,
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled || loading) return;

    if (onClick) {
      onClick(e);
    }

    if (to) {
      navigate(to);
    }
  };

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-400",
    outline:
      "border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-400",
    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400",
  };

  const disabledStyles = "opacity-60 cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={`cursor-pointer w-full py-2 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 h-min ${
        variants[variant]
      } ${disabled || loading ? disabledStyles : ""} ${className}`}
    >
      {Icon && <Icon size={16} />}
      {loading ? loadingText : text}
    </button>
  );
};

export default Button;
