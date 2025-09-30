import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;

export function DialogContent({ className = "", children, ...props }) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/50" />
      <RadixDialog.Content
        className={`fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md border border-zinc-700 bg-zinc-900 p-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${className}`}
        {...props}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

export const DialogHeader = ({ className = "", ...props }) => (
  <div className={`mb-4 ${className}`} {...props} />
);

export const DialogTitle = ({ className = "", ...props }) => (
  <RadixDialog.Title className={`text-xl font-semibold text-white ${className}`} {...props} />
);

export const DialogFooter = ({ className = "", ...props }) => (
  <div className={`mt-6 flex justify-end gap-2 ${className}`} {...props} />
);