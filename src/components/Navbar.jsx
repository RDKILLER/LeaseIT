import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
            Lease<span className="text-primary-600">IT</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/assets" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition">
              Marketplace
            </Link>
            <Link to="/list" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition">
              List Assets
            </Link>
            
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              {user ? (
                <>
                  <Link to="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition flex items-center gap-2">
                    <UserIcon size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold text-slate-600 hover:text-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition">
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 text-white px-5 py-2.5 text-sm rounded-lg hover:bg-primary-700 transition font-bold shadow-sm"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-600 hover:text-primary-600 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-slate-100 absolute bg-white w-full left-0 px-4 shadow-xl">
            <div className="flex flex-col space-y-5">
              <Link
                to="/assets"
                className="text-lg font-semibold text-slate-600"
                onClick={() => setIsOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                to="/list"
                className="text-lg font-semibold text-slate-600"
                onClick={() => setIsOpen(false)}
              >
                List Assets
              </Link>
              <hr className="border-slate-100" />
              {user ? (
                <>
                   <Link
                    to="/dashboard"
                    className="text-lg font-semibold text-slate-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="text-lg font-semibold text-left text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-lg font-semibold text-slate-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 text-white px-4 py-3 rounded-lg font-bold text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
