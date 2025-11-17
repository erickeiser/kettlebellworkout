
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const linkClasses = "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
  const activeLinkClasses = "bg-brand-gray text-white";

  return (
    <nav className="bg-brand-gray shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-white">
              Kettle<span className="text-brand-emerald">Cut</span>
            </span>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/dashboard" className={({isActive}) => isActive ? `${linkClasses} ${activeLinkClasses}`: linkClasses}>Dashboard</NavLink>
                <NavLink to="/progress" className={({isActive}) => isActive ? `${linkClasses} ${activeLinkClasses}`: linkClasses}>Progress</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="bg-brand-emerald text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700"
            >
              Log Out
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-brand-gray inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? `${linkClasses} ${activeLinkClasses} block`: `${linkClasses} block`}>Dashboard</NavLink>
          <NavLink to="/progress" className={({isActive}) => isActive ? `${linkClasses} ${activeLinkClasses} block`: `${linkClasses} block`}>Progress</NavLink>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="px-2">
            <button
              onClick={handleLogout}
              className="w-full text-left bg-brand-emerald text-white px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
