import { FlipText } from "@/components/ui/flip-text";
import React from "react";

export const AdminDashboard = () => {
  return (
    <div>
      <FlipText
        className="text-2xl font-bold -tracking-widest text-black dark:text-white md:text-7xl md:leading-[5rem]"
        word="Welcome to Vyaparly"
      />
    </div>
  );
};
