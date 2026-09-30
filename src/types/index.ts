export type ShipmentStatus =
  | 'Order Received'
  | 'Processing'
  | 'Package Picked Up'
  | 'At Sorting Facility'
  | 'In Transit'
  | 'Arrived at Destination'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Delivery Attempted'
  | 'Delayed'
  | 'Cancelled';

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  description: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  
  // Sender info
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  senderCountry: string;

  // Recipient info
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientCountry: string;

  // Package info
  packageDescription: string;
  packageWeight: string;
  packageType: string;
  shippingFee: number;

  // Delivery info
  pickupLocation: string;
  currentLocation: string;
  destination: string;
  shippingDate: string;
  estimatedDeliveryDate: string;
  deliveryAgent: string;
  
  events: TrackingEvent[];
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  name: string;
}
