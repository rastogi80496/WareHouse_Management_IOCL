import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import MobileMenu from '../Components/MobileMenu';
import { Outlet } from 'react-router-dom';

function StaffDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-white min-h-screen">
      <MobileMenu onClick={() => setSidebarOpen(true)} />
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 w-full pt-16 lg:pt-0 bg-white"> 
        <Outlet />
      </div>
    </div>
  );
}

export default StaffDashboard;

