import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin, Globe, Share2, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-amber-500 p-2 rounded-lg">
                <Package className="h-6 w-6 text-slate-900" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                CORTEN <span className="text-amber-500">LOGISTIC</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Reliable delivery. Transparent tracking. Moving what matters, wherever it needs to go. We are committed to providing the fastest and most secure logistics solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-500 transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><Share2 className="h-5 w-5" /></a>
              <a href="#" className="hover:text-amber-500 transition-colors"><MessageSquare className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/track" className="hover:text-amber-500 transition-colors">Track Shipment</Link></li>
              <li><Link to="/services" className="hover:text-amber-500 transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-500 shrink-0" />
                <span>123 Logistics Avenue, Industrial Estate, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                <span>+234 800 CORTEN (267836)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                <span>info@cortenlogistic.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for latest updates and shipping tips.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-slate-800 border-slate-700 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
              />
              <button className="bg-amber-500 text-slate-900 font-semibold px-4 py-2 rounded-md hover:bg-amber-400 transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Corten Logistic. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/terms" className="hover:text-amber-500 transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
