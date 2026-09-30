import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Share2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-amber-500" />,
      title: 'Call Us',
      content: '+234 800 CORTEN (267836)',
      subContent: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: <Mail className="h-6 w-6 text-amber-500" />,
      title: 'Email Us',
      content: 'info@cortenlogistic.com',
      subContent: 'support@cortenlogistic.com'
    },
    {
      icon: <MapPin className="h-6 w-6 text-amber-500" />,
      title: 'Visit Us',
      content: '123 Logistics Avenue',
      subContent: 'Industrial Estate, Lagos, Nigeria'
    }
  ];

  return (
    <div className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Contact Us</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions about your shipment or want to learn more about our services? Our team is here to help.
          </p>
          <div className="h-1.5 w-24 bg-amber-500 mx-auto rounded-full mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Get in Touch</h2>
              <div className="space-y-10">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="bg-slate-50 p-4 rounded-2xl h-fit">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{info.title}</h3>
                      <p className="text-slate-800 font-medium">{info.content}</p>
                      <p className="text-sm text-slate-500">{info.subContent}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Connect with us</h3>
                <div className="flex gap-4">
                  {[Globe, Share2, MessageSquare].map((Icon, i) => (
                    <a key={i} href="#" className="bg-slate-50 p-3 rounded-xl hover:bg-amber-500 hover:text-white transition-all text-slate-500">
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-amber-100 p-3 rounded-2xl">
                  <MessageSquare className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Send us a Message</h2>
                  <p className="text-slate-500">We typically respond within 2 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-slate-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-slate-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-slate-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="Shipping Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                  <textarea 
                    required
                    className="w-full bg-slate-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-amber-500 h-40 resize-none transition-all"
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10">
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section Preview */}
        <div className="mt-24 text-center">
          <div className="bg-amber-500/10 inline-flex items-center gap-2 px-4 py-2 rounded-full text-amber-700 font-bold text-sm mb-6">
            <Clock className="h-4 w-4" />
            Available 24/7 for Tracking
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Need help with your shipment?</h2>
          <p className="text-slate-600 mb-10 max-w-xl mx-auto text-lg">
            Check our help center for common questions about tracking, delivery times, and shipping rates.
          </p>
          <button className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
            Visit Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
