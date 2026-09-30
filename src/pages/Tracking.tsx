import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLogisticsStore } from '../store/useLogisticsStore';
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle, 
  Search,
  Info,
  Calendar,
  User,
  Weight,
  CreditCard
} from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const Tracking = () => {
  const { trackingNumber: urlTrackingNumber } = useParams();
  const [searchInput, setSearchInput] = useState(urlTrackingNumber || '');
  const { getShipmentByTracking } = useLogisticsStore();
  const shipment = urlTrackingNumber ? getShipmentByTracking(urlTrackingNumber) : undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (urlTrackingNumber) {
      setSearchInput(urlTrackingNumber);
    }
  }, [urlTrackingNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/track/${searchInput.trim()}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'Out for Delivery': return <Truck className="h-6 w-6 text-blue-500" />;
      case 'Delayed': return <AlertCircle className="h-6 w-6 text-amber-500" />;
      case 'Cancelled': return <AlertCircle className="h-6 w-6 text-red-500" />;
      default: return <Clock className="h-6 w-6 text-amber-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Out for Delivery': return 'bg-blue-100 text-blue-800';
      case 'Delayed': return 'bg-amber-100 text-amber-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const maskInfo = (text: string) => {
    if (!text) return '';
    if (text.length <= 4) return '****';
    return text.substring(0, 3) + '****' + text.substring(text.length - 2);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Track Your Shipment</h1>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Enter tracking number (e.g. COR-2026-84921)"
                className="w-full bg-white border border-slate-200 px-6 py-4 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            </div>
            <button
              type="submit"
              className="bg-slate-900 text-white px-8 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
            >
              Track
            </button>
          </form>
        </div>

        {urlTrackingNumber && !shipment && (
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center">
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Tracking Number Not Found</h2>
            <p className="text-slate-600 mb-8">
              Please check your tracking number and try again. Ensure there are no typos.
            </p>
            <button 
              onClick={() => navigate('/track')}
              className="text-amber-600 font-semibold hover:underline"
            >
              Try another search
            </button>
          </div>
        )}

        {shipment && (
          <div className="space-y-8">
            {/* Shipment Summary Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Tracking Number</p>
                  <h2 className="text-2xl font-bold">{shipment.trackingNumber}</h2>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 ${getStatusColor(shipment.status)}`}>
                  {getStatusIcon(shipment.status)}
                  {shipment.status}
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Estimated Delivery</p>
                  <p className="text-xl font-bold">{format(new Date(shipment.estimatedDeliveryDate), 'MMMM d, yyyy')}</p>
                </div>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex gap-4">
                  <div className="bg-amber-50 p-3 rounded-xl h-fit">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Current Location</p>
                    <p className="font-bold text-slate-900 text-lg">{shipment.currentLocation}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl h-fit">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Delivery Agent</p>
                    <p className="font-bold text-slate-900 text-lg">{shipment.deliveryAgent}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-green-50 p-3 rounded-xl h-fit">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium">Package Type</p>
                    <p className="font-bold text-slate-900 text-lg">{shipment.packageType}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Timeline Section */}
              <div className="lg:col-span-2">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-full"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    Shipment Progress Timeline
                  </h3>
                  
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                    
                    <div className="space-y-8">
                      {shipment.events.slice().reverse().map((event, index) => (
                        <div key={event.id} className="relative flex gap-6 pl-10">
                          {/* Circle indicator */}
                          <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 shadow-sm ${index === 0 ? 'bg-amber-500 ring-4 ring-amber-500/20' : 'bg-slate-200'}`}>
                            {index === 0 ? (
                              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            )}
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1">
                              <h4 className={`font-bold ${index === 0 ? 'text-slate-900' : 'text-slate-500'}`}>
                                {event.status}
                              </h4>
                              <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                {format(new Date(event.timestamp), 'MMM d, yyyy — h:mm a')}
                              </span>
                            </div>
                            <p className="text-slate-600 text-sm mb-1">{event.description}</p>
                            <p className="text-slate-400 text-xs flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Map & Details Sidebar */}
              <div className="space-y-8">
                {/* Simulated Map */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
                >
                  <div className="bg-slate-100 h-48 relative flex items-center justify-center">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i10!2i512!3i512!2m3!1e0!2sm!3i420120488!3m8!2sen!3snigeria!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0!23i4111425')] bg-cover"></div>
                    <div className="relative z-10 w-full px-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-amber-500 w-4 h-4 rounded-full ring-4 ring-amber-500/20 shadow-lg"></div>
                        <div className="h-0.5 bg-slate-300 flex-grow mx-2 border-t-2 border-dashed"></div>
                        <Truck className="h-6 w-6 text-slate-400 mx-2 animate-bounce" />
                        <div className="h-0.5 bg-slate-300 flex-grow mx-2 border-t-2 border-dashed"></div>
                        <MapPin className="h-6 w-6 text-slate-900" />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                        <span>{shipment.pickupLocation.split(',')[0]}</span>
                        <span>{shipment.destination.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-slate-900 mb-1">Current Shipment Location</h4>
                    <p className="text-slate-600 text-sm mb-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-amber-500" />
                      {shipment.currentLocation}
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1 uppercase font-bold tracking-wider">Estimated Delivery</p>
                      <p className="text-slate-900 font-bold">{format(new Date(shipment.estimatedDeliveryDate), 'MMMM d, yyyy')}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Details Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200"
                >
                  <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Info className="h-5 w-5 text-amber-500" />
                    Shipment Details
                  </h3>
                  
                  <div className="space-y-4">
                    <DetailItem icon={<User className="h-4 w-4" />} label="Sender" value={maskInfo(shipment.senderName)} />
                    <DetailItem icon={<User className="h-4 w-4" />} label="Recipient" value={maskInfo(shipment.recipientName)} />
                    <DetailItem icon={<Weight className="h-4 w-4" />} label="Weight" value={shipment.packageWeight} />
                    <DetailItem icon={<CreditCard className="h-4 w-4" />} label="Shipping Fee" value={`₦${shipment.shippingFee.toLocaleString()}`} />
                    <DetailItem icon={<Calendar className="h-4 w-4" />} label="Shipping Date" value={format(new Date(shipment.shippingDate), 'MMM d, yyyy')} />
                    <DetailItem icon={<MapPin className="h-4 w-4" />} label="Destination" value={shipment.destination} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
    <div className="text-slate-400 shrink-0">{icon}</div>
    <div className="flex-grow">
      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

export default Tracking;
