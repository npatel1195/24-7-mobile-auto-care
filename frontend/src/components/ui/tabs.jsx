import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

export const Tabs = RadixTabs.Root;

export function TabsList({ className = "", ...props }) {
  return (
    <RadixTabs.List
      className={`inline-flex rounded bg-zinc-800 p-1 ${className}`}
      {...props}
    />
  );
}

export function TabsTrigger({ className = "", children, ...props }) {
  return (
    <RadixTabs.Trigger
      className={`inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 data-[state=active]:bg-red-600 data-[state=active]:text-white ${className}`}
      {...props}
    >
      {children}
    </RadixTabs.Trigger>
  );
}

export function TabsContent({ className = "", ...props }) {
  return (
    <RadixTabs.Content
      className={`mt-2 focus:outline-none ${className}`}
      {...props}
    />
  );
}