"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonParams {
  children: React.ReactNode;
  pendingLabel: string;
}

export default function SubmitButton({
  children,
  pendingLabel,
}: SubmitButtonParams) {
  const { pending } = useFormStatus();

  return (
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 cursor-pointer">
      {pending ? pendingLabel : children}
    </button>
  );
}
