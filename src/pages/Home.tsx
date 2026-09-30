import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Shield, Clock, Globe, Zap, ArrowRight, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber.trim()}`);
    }
  };

  const services = [
    {
      title: 'Express Delivery',
      description: 'Fast delivery for urgent packages with priority handling.',
      icon: <Zap className="h-6 w-6 text-amber-500" />
    },
    {
      title: 'Nationwide Delivery',
      description: 'Reliable shipment delivery across all states in Nigeria.',
      icon: <Globe className="h-6 w-6 text-amber-500" />
    },
    {
      title: 'Business Logistics',
      description: 'Logistics solutions for businesses and online sellers.',
      icon: <TrendingUp className="h-6 w-6 text-amber-500" />
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500 blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-600 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
            >
              Track Your Package. <br />
              <span className="text-amber-500">Every Step of the Way.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-300 mb-10"
            >
              With Corten Logistic, you can easily track your shipment and stay updated from pickup to final delivery.
            </motion.p>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleTrack}
              className="relative max-w-2xl mx-auto mb-6"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your tracking number (e.g. COR-2026-84921)"
                  className="w-full bg-white text-slate-900 px-6 py-5 rounded-2xl text-lg shadow-2xl focus:ring-4 focus:ring-amber-500/20 focus:outline-none pr-36"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white px-8 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  Track
                </button>
              </div>
            </motion.form>
            <p className="text-sm text-slate-400">
              Enter your Corten Logistic tracking number to view your shipment status.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Services</h2>
            <div className="h-1.5 w-20 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-xl transition-shadow group"
              >
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6 w-fit group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                <Link to="/services" className="text-amber-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-extrabold text-amber-500">10,000+</p>
              <p className="text-slate-400 font-medium uppercase tracking-wider text-sm">Shipments Delivered</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-extrabold text-amber-500">36+</p>
              <p className="text-slate-400 font-medium uppercase tracking-wider text-sm">Cities Served</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-extrabold text-amber-500">98%</p>
              <p className="text-slate-400 font-medium uppercase tracking-wider text-sm">On-Time Delivery</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-extrabold text-amber-500">24/7</p>
              <p className="text-slate-400 font-medium uppercase tracking-wider text-sm">Tracking Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Moving What Matters, <br />
                <span className="text-amber-600">Wherever It Needs to Go.</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Corten Logistic is a professional logistics and delivery company that provides reliable package delivery and shipment tracking services. We focus on reliable, transparent, and customer-focused delivery services.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <Shield className="h-5 w-5 text-green-500" />, text: 'Secure and insured shipping options' },
                  { icon: <Clock className="h-5 w-5 text-blue-500" />, text: 'Real-time tracking for every shipment' },
                  { icon: <Users className="h-5 w-5 text-purple-500" />, text: 'Dedicated support team for all inquiries' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      {item.icon}
                    </div>
                    <span className="font-medium text-slate-800">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-amber-500/10 absolute inset-0 rounded-3xl transform rotate-3 scale-105"></div>
              <div className="bg-white p-8 rounded-3xl shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" 
                  alt="Logistics Warehouse" 
                  className="rounded-2xl w-full h-[400px] object-cover mb-6"
                />
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500 text-slate-900 p-3 rounded-full">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xl">Lightning Fast Delivery</p>
                    <p className="text-slate-500">Across all major cities nationwide.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
