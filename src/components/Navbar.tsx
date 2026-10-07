import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-white">CORTEN LOGISTIC</h1>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                Home
              </Link>
              <Link to="/track" className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                Track Order
              </Link>
              <Link to="/services" className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                Services
              </Link>
              <Link to="/about" className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                About
              </Link>
              <Link to="/contact" className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Customer Login Link */}
            <Link
              to="/customer-login"
              className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Customer Login
            </Link>

            {/* Admin Login Link */}
            <Link
              to="/login"
              className="text-slate-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar