import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow">

      {/* LEFT SECTION (LOGO + NAME) */}
      <div className="flex items-center gap-3">
        
        {/* Custom Logo (simple square) */}
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
          PM
        </div>

        <span className="text-lg font-semibold text-gray-800">
          ProjectManagement
        </span>

        {/* MENU */}
        <div className="hidden md:flex gap-6 ml-8 text-gray-600">
          <Link to="/dashboard" className="hover:text-black">Dashboard</Link>
          <Link to="/project" className="hover:text-black">Projects</Link>
          <Link to="/task" className="hover:text-black">Tasks</Link>
          <Link to="/team" className="hover:text-black">Team</Link>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-5">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-3 py-1 border rounded-md text-sm"
        />

        {/* SIGN IN */}
        <Link to="/login" className="text-gray-700 hover:text-black">
          Sign in
        </Link>

        {/* CTA BUTTON */}
        <Link
          to="/create-project"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + New Project
        </Link>
      </div>

    </div>
  );
};

export default Navbar;