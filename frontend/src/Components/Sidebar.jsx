import React, { useState, useEffect } from 'react';
import { AiOutlineProduct } from "react-icons/ai";
import { RiStockLine } from "react-icons/ri";
import { FiLogOut, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { MdOutlineInventory2, MdPointOfSale, MdOutlineCategory } from "react-icons/md";
import { TfiSupport } from "react-icons/tfi";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxActivityLog, RxDashboard } from "react-icons/rx";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import toast from 'react-hot-toast';
import { LuUsers } from "react-icons/lu";
import logo1 from '../images/logo1.gif';

function Sidebar({ isOpen = true, onClose }) {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const location = useLocation();
  const { Authuser } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768 && onClose) {
        onClose(); // Close sidebar on desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onClose]); 

  const handleLogout = async () => {
    dispatch(logout())
      .then(() => {
        toast.success("Logout successfully");
        navigator('/');
      })
      .catch((error) => {
        toast.error("Error in logout");
      });
  };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose?.();
    }
  }, [location.pathname, isMobile, isOpen, onClose]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static flex flex-col w-64 text-black min-h-screen p-4 lg:p-6 shadow-lg bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMobile
            ? isOpen
              ? 'translate-x-0'
              : '-translate-x-full'
            : 'translate-x-0'
        }`}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          >
            <FiX className="text-2xl" />
          </button>
        )}

        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6 lg:mb-10">
          <img src={logo1} className="w-48 lg:w-56 bg-white" alt="sample logo" />
        </h1>

      <nav className="space-y-4">
  
        <div className="text-lg mt-10 flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
          <RxDashboard className="text-xl" />
          <Link to="/ManagerDashboard">Dashboard</Link>
        </div>

   
        {Authuser?.role === "manager" && (
          <ul className="space-y-2">
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <AiOutlineProduct className="text-xl" />
              <Link to="/ManagerDashboard/product">Product</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <RxActivityLog className="text-xl" />
              <Link to="/ManagerDashboard/activity-log">Activity Log</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <TfiSupport className="text-xl" />
              <Link to="/ManagerDashboard/supplier">Supplier</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <MdPointOfSale className="text-xl" />
              <Link to="/ManagerDashboard/sales">Sales</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <FiShoppingCart className="text-xl" />
              <Link to="/ManagerDashboard/order">Order</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <RiStockLine className="text-xl" />
              <Link to="/ManagerDashboard/stock-transaction">Stock Transaction</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <IoNotificationsOutline className="text-xl" />
              <Link to="/ManagerDashboard/NotificationPageRead">Notifications</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <MdOutlineCategory className="text-xl" />
              <Link to="/ManagerDashboard/category">Category</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <LuUsers className="text-xl" />
              <Link to="/ManagerDashboard/Userstatus">Users</Link>
            </li>
          </ul>
        )}


        {Authuser?.role === "admin" && (
          <ul className="space-y-2">
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <AiOutlineProduct className="text-xl" />
              <Link to="/AdminDashboard/product">Product</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <RxActivityLog className="text-xl" />
              <Link to="/AdminDashboard/activity-log">Activity Log</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <TfiSupport className="text-xl" />
              <Link to="/AdminDashboard/supplier">Supplier</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <MdPointOfSale className="text-xl" />
              <Link to="/AdminDashboard/sales">Sales</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <FiShoppingCart className="text-xl" />
              <Link to="/AdminDashboard/order">Order</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <RiStockLine className="text-xl" />
              <Link to="/AdminDashboard/stock-transaction">Stock Transaction</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <IoNotificationsOutline className="text-xl" />
              <Link to="/AdminDashboard/notifications">Create Notifications</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <MdOutlineCategory className="text-xl" />
              <Link to="/AdminDashboard/category">Category</Link>
            </li>
          </ul>
        )}

        
        {Authuser?.role === "staff" && (
          <ul className="space-y-2">
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <AiOutlineProduct className="text-xl" />
              <Link to="/StaffDashboard/product">Product</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <RxActivityLog className="text-xl" />
              <Link to="/StaffDashboard/activity-log">Activity Log</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <TfiSupport className="text-xl" />
              <Link to="/StaffDashboard/supplier">Supplier</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <MdPointOfSale className="text-xl" />
              <Link to="/StaffDashboard/sales">Sales</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <FiShoppingCart className="text-xl" />
              <Link to="/StaffDashboard/order">Order</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <RiStockLine className="text-xl" />
              <Link to="/StaffDashboard/stock-transaction">Stock Transaction</Link>
            </li>
            <li className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer p-2 rounded-md transition">
              <IoNotificationsOutline className="text-xl" />
              <Link to="/StaffDashboard/NotificationPageRead">Notifications</Link>
            </li>
          </ul>
        )}
      </nav>

      <div className="mt-auto border-t pt-4">
        <div className="flex items-center space-x-3 text-lg text-gray-700 hover:text-red-600 cursor-pointer p-2 rounded-md transition">
          <FiLogOut className="text-xl" />
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>
      </div>
    </>
  );
}

export default Sidebar;
