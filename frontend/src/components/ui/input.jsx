import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded border border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent ${className}`}
      {...props}
    />
  );
}