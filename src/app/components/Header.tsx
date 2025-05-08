import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-[#001e2e] text-white h-20 flex items-center justify-between px-6 sticky top-0 w-full z-[1000] shadow-md">
      <div className="flex items-center">
        <p className="text-2xl font-bold">Gregory Souza</p>
      </div>
    </header>
  );
};

export default Header;
