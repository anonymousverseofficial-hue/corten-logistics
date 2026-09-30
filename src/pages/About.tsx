import React from 'react';
import { Shield, Target, Users, Award, CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Moving What Matters, <br />
              <span className="text-amber-500">Wherever It Needs to Go.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Corten Logistic is a professional logistics and delivery company that provides reliable package delivery and shipment tracking services.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/10 skew-x-12 translate-x-32"></div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                At Corten Logistic, our mission is to simplify the complex world of logistics through innovation, transparency, and unwavering commitment to customer satisfaction. We believe that every shipment represents a promise kept, and we take that responsibility seriously.
              </p>
              <div className="space-y-4">
                {[
                  'Customer-Centric Solutions',
                  'Reliable and On-Time Delivery',
                  'Advanced Real-time Tracking',
                  'Safe and Secure Handling'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-500" />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1570672629899-f865c56bfdc4?auto=format&fit=crop&q=80&w=800" 
                alt="Logistics Operation" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500 rounded-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="10,000+" label="Packages Delivered" />
            <StatCard value="36+" label="Cities Served" />
            <StatCard value="98%" label="Satisfaction Rate" />
            <StatCard value="24/7" label="Support Available" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <div className="h-1.5 w-20 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Shield className="h-8 w-8 text-amber-500" />}
              title="Integrity"
              description="We believe in transparency and honesty in every interaction with our customers and partners."
            />
            <ValueCard 
              icon={<Target className="h-8 w-8 text-amber-500" />}
              title="Reliability"
              description="Our customers count on us to deliver their promises, and we ensure we never let them down."
            />
            <ValueCard 
              icon={<Users className="h-8 w-8 text-amber-500" />}
              title="Teamwork"
              description="Success is a collaborative effort. We work together across departments to provide seamless service."
            />
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Award className="h-16 w-16 text-amber-500 mb-8" />
              <h2 className="text-3xl font-bold mb-6">A Legacy of Excellence</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Founded in 2020, Corten Logistic started with a single delivery van and a clear vision: to redefine logistics in West Africa. 
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                Today, we operate a large fleet across the nation, utilizing cutting-edge technology to keep our customers connected to their shipments every step of the way.
              </p>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=400" className="rounded-2xl" alt="Van" />
              <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=400" className="rounded-2xl mt-8" alt="Warehouse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center">
    <p className="text-4xl font-extrabold text-slate-900 mb-2">{value}</p>
    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
  </div>
);

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-lg transition-shadow">
    <div className="bg-slate-50 p-4 rounded-2xl w-fit mb-6">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export default About;
