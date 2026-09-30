import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useLogisticsStore } from '../store/useLogisticsStore';
import { 
  LayoutDashboard, 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ChevronRight,
  TrendingUp,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  User,
  ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';
import { ShipmentStatus } from '../types';

const AdminDashboard = () => {
  const { currentUser } = useLogisticsStore();
  const navigate = useNavigate();

  // Redirect if not admin
  React.useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-amber-500 p-1.5 rounded-lg">
              <Package className="h-5 w-5 text-slate-900" />
            </div>
            <span className="font-bold text-lg">CORTEN ADMIN</span>
          </Link>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <SidebarLink to="/admin" icon={<LayoutDashboard className="h-5 w-5" />} label="Overview" />
          <SidebarLink to="/admin/shipments" icon={<Package className="h-5 w-5" />} label="Shipments" />
          <SidebarLink to="/admin/create" icon={<Plus className="h-5 w-5" />} label="New Shipment" />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-xs">
              AD
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-bold truncate">Admin User</p>
              <p className="text-[10px] text-slate-400 truncate">admin@corten.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="shipments" element={<ShipmentList />} />
            <Route path="create" element={<CreateShipment />} />
            <Route path="edit/:id" element={<EditShipment />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/admin' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-amber-500 text-slate-900 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

// --- SUB-COMPONENTS ---

const Overview = () => {
  const { shipments } = useLogisticsStore();
  
  const stats = [
    { label: 'Total Shipments', value: shipments.length, icon: Package, iconColor: 'text-blue-500', color: 'bg-blue-50' },
    { label: 'In Transit', value: shipments.filter(s => s.status === 'In Transit').length, icon: Truck, iconColor: 'text-amber-500', color: 'bg-amber-50' },
    { label: 'Out for Delivery', value: shipments.filter(s => s.status === 'Out for Delivery').length, icon: Clock, iconColor: 'text-purple-500', color: 'bg-purple-50' },
    { label: 'Delivered', value: shipments.filter(s => s.status === 'Delivered').length, icon: CheckCircle, iconColor: 'text-green-500', color: 'bg-green-50' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening with your shipments today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
              <div className={`p-4 rounded-2xl ${stat.color}`}>
                <Icon className={`h-8 w-8 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">Recent Shipments</h3>
            <Link to="/admin/shipments" className="text-amber-600 font-semibold text-sm hover:underline">View all</Link>
          </div>
          <div className="space-y-4">
            {shipments.slice(-5).reverse().map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-100 p-2 rounded-lg">
                    <Package className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{s.trackingNumber}</p>
                    <p className="text-xs text-slate-500">{s.recipientName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {s.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{format(new Date(s.shippingDate), 'MMM d, yyyy')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Grow Your Business</h3>
              <p className="text-slate-400">Manage your logistics network more efficiently with our advanced tools.</p>
            </div>
            <div className="mt-8 flex gap-4">
              <Link to="/admin/create" className="bg-amber-500 text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-amber-400 transition-colors">
                Create Shipment
              </Link>
            </div>
          </div>
          <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-amber-500 opacity-10 rounded-full blur-3xl"></div>
          <TrendingUp className="absolute bottom-[-20px] right-[-20px] w-64 h-64 text-white opacity-5" />
        </div>
      </div>
    </div>
  );
};

const ShipmentList = () => {
  const { shipments, deleteShipment } = useLogisticsStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = shipments.filter(s => 
    s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.senderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Shipments</h1>
          <p className="text-slate-500">Manage all your active and past shipments.</p>
        </div>
        <Link to="/admin/create" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 w-fit">
          <Plus className="h-5 w-5" />
          New Shipment
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search by tracking number, sender, or recipient..."
              className="w-full bg-slate-50 border-0 px-12 py-3 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-semibold text-sm hover:bg-slate-100 transition-all border border-slate-100">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Tracking ID</th>
                <th className="px-6 py-4">Sender & Recipient</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredShipments.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 text-sm">{s.trackingNumber}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase">{s.packageType}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-700">{s.senderName}</span>
                      <ChevronRight className="h-3 w-3 text-slate-300" />
                      <span className="text-sm font-medium text-slate-700">{s.recipientName}</span>
                    </div>
                    <p className="text-xs text-slate-400">{s.destination}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      s.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      s.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {format(new Date(s.shippingDate), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/admin/edit/${s.id}`} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => { if(window.confirm('Are you sure?')) deleteShipment(s.id) }}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredShipments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    No shipments found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CreateShipment = () => {
  const { addShipment } = useLogisticsStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    senderName: '', senderPhone: '', senderEmail: '', senderAddress: '', senderCity: '', senderState: '', senderCountry: 'Nigeria',
    recipientName: '', recipientPhone: '', recipientEmail: '', recipientAddress: '', recipientCity: '', recipientState: '', recipientCountry: 'Nigeria',
    packageDescription: '', packageWeight: '', packageType: 'Standard', shippingFee: 0,
    pickupLocation: '', currentLocation: '', destination: '', estimatedDeliveryDate: format(new Date(Date.now() + 3*24*60*60*1000), "yyyy-MM-dd'T'HH:mm"),
    deliveryAgent: '', shippingDate: new Date().toISOString()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newShipment = addShipment({
      ...formData,
      status: 'Order Received',
      shippingFee: Number(formData.shippingFee)
    });
    alert(`Shipment created! Tracking Number: ${newShipment.trackingNumber}`);
    navigate('/admin/shipments');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/shipments" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Create New Shipment</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sender Info */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-amber-500" />
            Sender Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Full Name" name="senderName" value={formData.senderName} onChange={handleChange} required />
            <FormInput label="Phone Number" name="senderPhone" value={formData.senderPhone} onChange={handleChange} required />
            <FormInput label="Email Address" name="senderEmail" type="email" value={formData.senderEmail} onChange={handleChange} required />
            <FormInput label="Address" name="senderAddress" value={formData.senderAddress} onChange={handleChange} required />
            <FormInput label="City" name="senderCity" value={formData.senderCity} onChange={handleChange} required />
            <FormInput label="State" name="senderState" value={formData.senderState} onChange={handleChange} required />
          </div>
        </div>

        {/* Recipient Info */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Recipient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Full Name" name="recipientName" value={formData.recipientName} onChange={handleChange} required />
            <FormInput label="Phone Number" name="recipientPhone" value={formData.recipientPhone} onChange={handleChange} required />
            <FormInput label="Email Address" name="recipientEmail" type="email" value={formData.recipientEmail} onChange={handleChange} required />
            <FormInput label="Address" name="recipientAddress" value={formData.recipientAddress} onChange={handleChange} required />
            <FormInput label="City" name="recipientCity" value={formData.recipientCity} onChange={handleChange} required />
            <FormInput label="State" name="recipientState" value={formData.recipientState} onChange={handleChange} required />
          </div>
        </div>

        {/* Package & Delivery Info */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Package className="h-5 w-5 text-purple-500" />
            Package & Delivery Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormInput label="Package Description" name="packageDescription" value={formData.packageDescription} onChange={handleChange} required />
            </div>
            <FormInput label="Weight (e.g. 5kg)" name="packageWeight" value={formData.packageWeight} onChange={handleChange} required />
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Package Type</label>
              <select name="packageType" className="bg-slate-50 border-0 p-3 rounded-xl focus:ring-2 focus:ring-amber-500" value={formData.packageType} onChange={handleChange}>
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
                <option value="International">International</option>
                <option value="Fragile">Fragile</option>
              </select>
            </div>
            <FormInput label="Shipping Fee (₦)" name="shippingFee" type="number" value={formData.shippingFee.toString()} onChange={handleChange} required />
            <FormInput label="Pickup Location" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required />
            <FormInput label="Destination" name="destination" value={formData.destination} onChange={handleChange} required />
            <FormInput label="Estimated Delivery Date" name="estimatedDeliveryDate" type="datetime-local" value={formData.estimatedDeliveryDate} onChange={handleChange} required />
            <FormInput label="Delivery Agent Name" name="deliveryAgent" value={formData.deliveryAgent} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]">
          Create Shipment & Generate Tracking ID
        </button>
      </form>
    </div>
  );
};

const EditShipment = () => {
  const { id } = useParams();
  const { shipments, addTrackingEvent, deleteShipment } = useLogisticsStore();
  const navigate = useNavigate();
  const shipment = shipments.find(s => s.id === id);

  const [eventData, setEventData] = useState({
    status: 'In Transit' as ShipmentStatus,
    location: '',
    description: '',
    timestamp: new Date().toISOString().slice(0, 16)
  });

  if (!shipment) return <div>Shipment not found</div>;

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    addTrackingEvent(shipment.id, {
      status: eventData.status,
      location: eventData.location,
      description: eventData.description,
      timestamp: new Date(eventData.timestamp).toISOString()
    });
    setEventData({
      status: 'In Transit',
      location: '',
      description: '',
      timestamp: new Date().toISOString().slice(0, 16)
    });
    alert('Tracking event added and shipment status updated!');
  };

  const statusOptions: ShipmentStatus[] = [
    'Order Received', 'Processing', 'Package Picked Up', 'At Sorting Facility', 
    'In Transit', 'Arrived at Destination', 'Out for Delivery', 'Delivered', 
    'Delivery Attempted', 'Delayed', 'Cancelled'
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/shipments" className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Shipment</h1>
          <p className="text-slate-500 font-medium">Tracking Number: <span className="text-amber-600">{shipment.trackingNumber}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Add Event Form */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Plus className="h-5 w-5 text-amber-500" />
              Add Tracking Event
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Update Status</label>
                  <select 
                    className="bg-slate-50 border-0 p-3 rounded-xl focus:ring-2 focus:ring-amber-500" 
                    value={eventData.status}
                    onChange={(e) => setEventData({...eventData, status: e.target.value as ShipmentStatus})}
                  >
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <FormInput 
                  label="Current Location" 
                  value={eventData.location} 
                  onChange={(e: any) => setEventData({...eventData, location: e.target.value})} 
                  placeholder="e.g. Kaduna, Nigeria"
                  required 
                />
              </div>
              <FormInput 
                label="Date & Time" 
                type="datetime-local" 
                value={eventData.timestamp} 
                onChange={(e: any) => setEventData({...eventData, timestamp: e.target.value})} 
                required 
              />
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                <textarea 
                  className="bg-slate-50 border-0 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 h-24 resize-none" 
                  value={eventData.description}
                  onChange={(e: any) => setEventData({...eventData, description: e.target.value})}
                  placeholder="e.g. Package is currently in transit to the destination facility."
                  required
                />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
                Update Status & Add Event
              </button>
            </form>
          </div>

          {/* Timeline Preview */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Current Timeline</h3>
            <div className="space-y-6">
              {shipment.events.slice().reverse().map((event) => (
                <div key={event.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg h-fit shadow-sm">
                    <Clock className="h-4 w-4 text-slate-400" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <p className="font-bold text-slate-900 text-sm">{event.status}</p>
                      <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">{format(new Date(event.timestamp), 'MMM d, h:mm a')}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{event.description}</p>
                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold text-lg mb-4">Shipment Info</h3>
            <div className="space-y-3">
              <SidebarInfoItem label="Sender" value={shipment.senderName} />
              <SidebarInfoItem label="Recipient" value={shipment.recipientName} />
              <SidebarInfoItem label="Destination" value={shipment.destination} />
              <SidebarInfoItem label="Shipping Date" value={format(new Date(shipment.shippingDate), 'MMM d, yyyy')} />
              <SidebarInfoItem label="Est. Delivery" value={format(new Date(shipment.estimatedDeliveryDate), 'MMM d, yyyy')} />
            </div>
            <button 
              onClick={() => { if(window.confirm('Delete this shipment?')) { deleteShipment(shipment.id); navigate('/admin/shipments'); } }}
              className="w-full mt-6 bg-red-500/10 text-red-400 hover:bg-red-500/20 py-3 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Shipment
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Customer Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Contact Phone</p>
                <p className="text-sm font-semibold text-slate-800">{shipment.recipientPhone}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Contact Email</p>
                <p className="text-sm font-semibold text-slate-800">{shipment.recipientEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, required = false }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
    <input 
      type={type} 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      required={required}
      className="bg-slate-50 border-0 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all text-sm"
    />
  </div>
);

const SidebarInfoItem = ({ label, value }: { label: string, value: string }) => (
  <div>
    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

export default AdminDashboard;
