






import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout(); 
    navigate('/login'); 
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">
          <Link to="/">Logo</Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <ul
          className={`lg:flex items-center lg:static absolute bg-gray-800 lg:bg-transparent w-full lg:w-auto left-0 lg:left-auto lg:top-auto top-16 transition-transform duration-300 ease-in-out ${
            isOpen ? 'transform translate-x-0' : 'transform -translate-x-full lg:translate-x-0'
          }`}
        >
          <li className="nav-item">
            <Link to="/" className="nav-link px-3 py-2 text-white block">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chatbots" className="nav-link px-3 py-2 text-white block">
              Explore Chatbots
            </Link>
          </li>
          <li className="nav-item">
            <a
              href="https://buy.stripe.com/test_7sI7u3dFLb64a2s6oo"
              className="nav-link px-3 py-2 text-white block"
              target="_blank"
              rel="noopener noreferrer"
            >
              To buy Subscription
            </a>
          </li>
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link px-3 py-2 text-white block">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link px-3 py-2 text-white block">
                  Register
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li className="nav-item">
              <button
                className="nav-link px-3 py-2 text-white block bg-black"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



