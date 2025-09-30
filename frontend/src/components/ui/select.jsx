import React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export const Select = RadixSelect.Root;

export function SelectTrigger({ className = "", children, ...props }) {
  return (
    <RadixSelect.Trigger
      className={`inline-flex items-center justify-between rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
    </RadixSelect.Trigger>
  );
}

export const SelectValue = RadixSelect.Value;

export function SelectContent({ className = "", children, ...props }) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        className={`overflow-hidden rounded-md border border-zinc-700 bg-zinc-900 text-white shadow-lg ${className}`}
        {...props}
      >
        <RadixSelect.Viewport className="p-2">{children}</RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
}

export function SelectItem({ className = "", children, ...props }) {
  return (
    <RadixSelect.Item
      className={`relative flex cursor-pointer select-none items-center rounded px-8 py-2 text-sm font-medium outline-none focus:bg-red-600 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
      {...props}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute left-2 inline-flex items-center">
        <Check className="h-4 w-4" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
}