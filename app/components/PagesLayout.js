import React from 'react';
import Siderbar from './Sidebar';
import { usePathname } from "next/navigation";

const PagesLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="page">
      <Siderbar />
      
      <div className={pathname === "/agenda" ? 'left-page-calendar' : 'left-page'}>
        {children}
      </div>
    </div>
  );
};

export default PagesLayout;
