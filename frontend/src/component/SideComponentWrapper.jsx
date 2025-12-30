import React from "react";

const SideComponentWrapper = ({ children }) => {
  return (
    <div className="flex flex-col w-full md:w-[65%] lg:w-[82.5%] bg-white rounded-lg border border-slate-200 shadow-sm p-4 sm:p-5 md:p-8 mx-0 sm:mx-3 md:mx-4 my-3 md:my-4 h-min">
      {children}
    </div>
  );
};

export default SideComponentWrapper;
