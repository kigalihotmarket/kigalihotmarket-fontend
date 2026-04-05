import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BanknotesIcon,
  HomeIcon,
  ChartBarIcon,
  NewspaperIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  CubeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { assets } from "../assets/Assets";
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";

const AdminSidebar = ({ onToggle }: { onToggle: (collapsed: boolean) => void }) => {
  const location = useLocation();
  const [collapse, setCollapse] = useState(window.innerWidth <= 750);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 750) {
        setCollapse(true);
        onToggle(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onToggle]);

  const toggleCollapse = () => {
    setCollapse(!collapse);
    onToggle(!collapse);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all ${
        collapse ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center justify-center py-4">
        {!collapse && (
          <Link to="/dashboard" className="mr-4">
            <img
              src={assets.images.logo}
              alt="Brand Logo"
              className="transition-all w-20"
            />
          </Link>
        )}
        <button
          className="text-xl text-gray-600 hover:text-gray-800"
          onClick={toggleCollapse}
        >
          {collapse ? (
            <TbLayoutSidebarRightCollapse />
          ) : (
            <TbLayoutSidebarLeftCollapse />
          )}
        </button>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/" ? "bg-gray-100" : ""
            }`}
          >
            <Link to="/" className="flex items-center w-full">
            <HomeIcon className="text-xl text-gray-600 w-5 stroke-2" />
              {!collapse && (
                <span className="ml-2 text-gray-800 font-medium">Home</span>
              )}
            </Link>
          </li>
          <li
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/dashboard" ? "bg-gray-100" : ""
            }`}
          >
            <Link to="/dashboard" className="flex items-center w-full">
            <ChartBarIcon className="text-xl text-gray-600 w-5 stroke-2" />
              {!collapse && (
                <span className="ml-2 text-gray-800 font-medium">Overview</span>
              )}
            </Link>
          </li>
          <li
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/dashboard/users" ? "bg-gray-100" : ""
            }`}
          >
            <Link to="/dashboard/users" className="flex items-center w-full">
              <UserGroupIcon className="text-xl text-gray-600 w-5 stroke-2" />
              {!collapse && (
                <span className="ml-2 text-gray-800 font-medium">Users</span>
              )}
            </Link>
          </li>
          <li
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/dashboard/products" ? "bg-gray-100" : ""
            }`}
          >
            <Link to="/dashboard/products" className="flex items-center w-full">
            <CubeIcon className="text-xl text-gray-600 w-5 stroke-2" />
              {!collapse && (
                <span className="ml-2 text-gray-800 font-medium">Products</span>
              )}
            </Link>
          </li>
          <li
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/dashboard/orders" ? "bg-gray-100" : ""
            }`}
          >
            <Link to="/dashboard/orders" className="flex items-center w-full">
            <ShoppingCartIcon className="text-xl text-gray-600 w-5 stroke-2" />
              {!collapse && (
                <span className="ml-2 text-gray-800 font-medium">Orders</span>
              )}
            </Link>
          </li>
          <li
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/dashboard/delivery" ? "bg-gray-100" : ""
            }`}
          >
            <Link to="/dashboard/delivery" className="flex items-center w-full">
            <TruckIcon className="text-xl text-gray-600 w-5 stroke-2" />
              {!collapse && (
                <span className="ml-2 text-gray-800 font-medium">Delivery</span>
              )}
            </Link>
          </li>
          <li
            className={`flex items-center px-4 py-2 ${
              location.pathname === "/dashboard/transactions" ? "bg-gray-100" : ""
            }`}
          >
            <Link to="/dashboard/transactions" className="flex items-center w-full">
            <BanknotesIcon className="text-xl text-gray-600 w-5 stroke-2" />
              {!collapse && (
                <span className="ml-2 text-gray-800 font-medium">Transactions</span>
              )}
            </Link>
          </li>
                 </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;