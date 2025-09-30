import React from "react";

export function Button({ children, variant, className = "", ...props }) {
  let baseClass = "px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  if (variant === "outline") {
    baseClass += " border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500";
  } else if (variant === "destructive") {
    baseClass += " bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
  } else {
    baseClass += " bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
  }

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
}