import React, { ReactNode } from "react";

import Navigation from "./Navigation";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <div className="relative mx-auto mt-20 mb-20 flex justify-center w-full">
        <div className="flex w-full lg:w-1/3 mx-2 lg:mx-0 justify-between">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
