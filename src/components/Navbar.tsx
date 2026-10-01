import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Menu, X, User, LogOut } from 'lucide-react';
import { useLogisticsStore } from '../store/useLogisticsStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useLogisticsStore();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Track Shipment', path: '/track' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-amber-500 p-2 rounded-lg group-hover:bg-amber-400 transition-colors">
                <Package className="h-6 w-6 text-slate-900" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                CORTEN <span className="text-amber-500">LOGISTIC</span>
              </span>
            </Link>
          </div>
    <Link to="/track" className="hover:text-blue-400">Track Order</Link>
          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {currentUser ? (
                <div className="flex items-center gap-4">
                  {currentUser.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="bg-amber-500 text-slate-900 px-4 py-2 rounded-md text-sm font-semibold hover:bg-amber-400 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 hover:text-amber-500 transition-colors text-sm font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 border-2 border-amber-500 text-amber-500 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-amber-500 hover:text-slate-900 transition-all"
                >
                  <User className="h-4 w-4" />
                  Customer Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block hover:bg-slate-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {currentUser ? (
              <>
                {currentUser.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block bg-amber-500 text-slate-900 px-3 py-2 rounded-md text-base font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left block hover:bg-slate-700 px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block bg-amber-500 text-slate-900 px-3 py-2 rounded-md text-base font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Customer Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
