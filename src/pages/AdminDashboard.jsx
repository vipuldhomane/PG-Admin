import React from "react";

export const AdminDashboard = () => {
  return (
    <div className="w-full h-full border-4 border-red-600 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border border-gray-300 p-4">
          <h2 className="text-xl font-semibold">Card 1</h2>
          <p>Some content for card 1</p>
          <footer className="mt-2">Footer 1</footer>
        </div>
        <div className="border border-gray-300 p-4">
          <h2 className="text-xl font-semibold">Card 2</h2>
          <p>Some content for card 2</p>
          <footer className="mt-2">Footer 2</footer>
        </div>
        <div className="border border-gray-300 p-4">
          <h2 className="text-xl font-semibold">Card 3</h2>
          <p>Some content for card 3</p>
          <footer className="mt-2">Footer 3</footer>
        </div>
      </div>
    </div>
  );
};
