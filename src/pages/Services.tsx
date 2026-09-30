import React from 'react';
import { Zap, Globe, Truck, Shield, Clock, TrendingUp, Search, Headphones } from 'lucide-react';

const Services = () => {
  const allServices = [
    {
      title: 'Express Delivery',
      description: 'Fast delivery for urgent packages. We guarantee delivery within 24-48 hours across major cities.',
      icon: <Zap className="h-8 w-8 text-amber-500" />,
      features: ['Priority Handling', 'Real-time Tracking', 'Insurance Coverage']
    },
    {
      title: 'Nationwide Delivery',
      description: 'Reliable shipment delivery across all 36 states in Nigeria, from urban centers to remote areas.',
      icon: <Globe className="h-8 w-8 text-amber-500" />,
      features: ['Door-to-Door Delivery', 'Competitive Rates', 'Large Network']
    },
    {
      title: 'International Shipping',
      description: 'Connect with the world. We offer international shipping solutions to over 200 countries.',
      icon: <Truck className="h-8 w-8 text-amber-500" />,
      features: ['Customs Clearance', 'Air & Sea Freight', 'Global Tracking']
    },
    {
      title: 'Business Logistics',
      description: 'Dedicated logistics solutions for e-commerce, retailers, and corporate entities.',
      icon: <TrendingUp className="h-8 w-8 text-amber-500" />,
      features: ['Warehousing', 'Bulk Shipping', 'Inventory Management']
    },
    {
      title: 'Same-Day Delivery',
      description: 'Need it there today? Our same-day delivery service is available in selected metro areas.',
      icon: <Clock className="h-8 w-8 text-amber-500" />,
      features: ['Instant Pickup', 'Direct Route', 'Proof of Delivery']
    },
    {
      title: 'Package Tracking',
      description: 'Transparency is key. Track your packages in real-time with our advanced tracking system.',
      icon: <Search className="h-8 w-8 text-amber-500" />,
      features: ['SMS Updates', 'Mobile App', '24/7 Access']
    }
  ];

  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Services</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored to meet your needs, whether you're shipping across the street or across the globe.
          </p>
          <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="bg-slate-50 p-4 rounded-2xl w-fit mb-6 group-hover:bg-amber-50 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Shield className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Ship With Us?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Get a quote today and experience the professional service of Corten Logistic.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-amber-500 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-amber-400 transition-colors">
                Get a Quote
              </button>
              <button className="bg-transparent border-2 border-slate-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                <Headphones className="h-5 w-5" />
                Contact Sales
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Services;
