import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Ware<span className="text-indigo-400">House</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">
            Smart WareHouse management system built for IOCL.
          </p>
          <p className="text-xs text-slate-500 mt-6">
            © {new Date().getFullYear()} WareHouse Managment. All rights reserved.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
            Navigation
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Reports
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
            Support
          </h3>
          <div className="text-sm space-y-2 text-slate-400">
            <p>Email: support@wareHouse.com</p>
            <p>Phone: +91 7700892076</p>
            <p>WareHouse IOCL, Varanasi</p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6">
            <a className="p-2 rounded-md bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a className="p-2 rounded-md bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-white transition">
              <FaTwitter />
            </a>
            <a className="p-2 rounded-md bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition">
              <FaLinkedinIn />
            </a>
            <a className="p-2 rounded-md bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white transition">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;