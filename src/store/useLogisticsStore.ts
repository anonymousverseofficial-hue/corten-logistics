import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Shipment, TrackingEvent, User } from '../types';

// Helper to generate tracking number
const generateTrackingNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `COR-${year}-${random}`;
};

interface LogisticsStore {
  shipments: Shipment[];
  currentUser: User | null;
  
  // Actions
  addShipment: (shipment: Omit<Shipment, 'id' | 'trackingNumber' | 'events'>) => Shipment;
  updateShipment: (id: string, updates: Partial<Shipment>) => void;
  deleteShipment: (id: string) => void;
  addTrackingEvent: (shipmentId: string, event: Omit<TrackingEvent, 'id' | 'shipmentId'>) => void;
  getShipmentByTracking: (trackingNumber: string) => Shipment | undefined;
  login: (email: string, role: 'admin' | 'customer') => void;
  logout: () => void;
}

// Initial demo data
const demoShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'COR-2026-84921',
    status: 'Out for Delivery',
    senderName: 'John Doe',
    senderPhone: '+234 801 234 5678',
    senderEmail: 'john.doe@example.com',
    senderAddress: '123 Lagos Way',
    senderCity: 'Lagos',
    senderState: 'Lagos',
    senderCountry: 'Nigeria',
    recipientName: 'Jane Smith',
    recipientPhone: '+234 902 345 6789',
    recipientEmail: 'jane.smith@example.com',
    recipientAddress: '456 Abuja Crescent',
    recipientCity: 'Abuja',
    recipientState: 'FCT',
    recipientCountry: 'Nigeria',
    packageDescription: 'Electronics - Laptop and Accessories',
    packageWeight: '2.5kg',
    packageType: 'Express',
    shippingFee: 5500,
    pickupLocation: 'Lagos, Nigeria',
    currentLocation: 'Abuja Sorting Center',
    destination: 'Garki, Abuja, Nigeria',
    shippingDate: '2026-09-27T09:15:00Z',
    estimatedDeliveryDate: '2026-09-30T17:00:00Z',
    deliveryAgent: 'Musa Ibrahim',
    events: [
      {
        id: 'e1',
        shipmentId: '1',
        status: 'Order Received',
        location: 'Lagos, Nigeria',
        timestamp: '2026-09-27T09:15:00Z',
        description: 'Order has been received and is being processed.'
      },
      {
        id: 'e2',
        shipmentId: '1',
        status: 'Package Picked Up',
        location: 'Lagos, Nigeria',
        timestamp: '2026-09-27T11:40:00Z',
        description: 'Package has been picked up by our courier.'
      },
      {
        id: 'e3',
        shipmentId: '1',
        status: 'At Sorting Facility',
        location: 'Lagos Sorting Center',
        timestamp: '2026-09-28T08:20:00Z',
        description: 'Package arrived at the Lagos sorting facility.'
      },
      {
        id: 'e4',
        shipmentId: '1',
        status: 'In Transit',
        location: 'Lagos to Abuja',
        timestamp: '2026-09-28T16:35:00Z',
        description: 'Package is in transit to the destination city.'
      },
      {
        id: 'e5',
        shipmentId: '1',
        status: 'Out for Delivery',
        location: 'Abuja, Nigeria',
        timestamp: '2026-09-29T14:45:00Z',
        description: 'Package is out for delivery with agent Musa Ibrahim.'
      }
    ]
  },
  {
    id: '2',
    trackingNumber: 'COR-2026-12345',
    status: 'Delivered',
    senderName: 'Mary Johnson',
    senderPhone: '+234 703 111 2222',
    senderEmail: 'mary.j@example.com',
    senderAddress: '78 Ring Road',
    senderCity: 'Ibadan',
    senderState: 'Oyo',
    senderCountry: 'Nigeria',
    recipientName: 'Robert Wilson',
    recipientPhone: '+234 815 333 4444',
    recipientEmail: 'robert.w@example.com',
    recipientAddress: '99 Port Harcourt Blvd',
    recipientCity: 'Port Harcourt',
    recipientState: 'Rivers',
    recipientCountry: 'Nigeria',
    packageDescription: 'Fashion items - Shoes and Bags',
    packageWeight: '1.2kg',
    packageType: 'Standard',
    shippingFee: 3200,
    pickupLocation: 'Ibadan, Nigeria',
    currentLocation: 'Port Harcourt, Nigeria',
    destination: 'Port Harcourt, Nigeria',
    shippingDate: '2026-09-20T10:00:00Z',
    estimatedDeliveryDate: '2026-09-24T12:00:00Z',
    deliveryAgent: 'Chidi Okoro',
    events: [
      {
        id: 'e6',
        shipmentId: '2',
        status: 'Delivered',
        location: 'Port Harcourt, Nigeria',
        timestamp: '2026-09-24T11:30:00Z',
        description: 'Package successfully delivered to the recipient.'
      }
    ]
  }
];

export const useLogisticsStore = create<LogisticsStore>()(
  persist(
    (set, get) => ({
      shipments: demoShipments,
      currentUser: null,

      addShipment: (data) => {
        const newShipment: Shipment = {
          ...data,
          id: Math.random().toString(36).substr(2, 9),
          trackingNumber: generateTrackingNumber(),
          events: [
            {
              id: Math.random().toString(36).substr(2, 9),
              shipmentId: '', // will be set below
              status: 'Order Received',
              location: data.pickupLocation,
              timestamp: new Date().toISOString(),
              description: 'Shipment record created and order received.'
            }
          ]
        };
        newShipment.events[0].shipmentId = newShipment.id;
        
        set((state) => ({
          shipments: [...state.shipments, newShipment]
        }));
        return newShipment;
      },

      updateShipment: (id, updates) => {
        set((state) => ({
          shipments: state.shipments.map((s) => 
            s.id === id ? { ...s, ...updates } : s
          )
        }));
      },

      deleteShipment: (id) => {
        set((state) => ({
          shipments: state.shipments.filter((s) => s.id !== id)
        }));
      },

      addTrackingEvent: (shipmentId, eventData) => {
        const newEvent: TrackingEvent = {
          ...eventData,
          id: Math.random().toString(36).substr(2, 9),
          shipmentId
        };

        set((state) => ({
          shipments: state.shipments.map((s) => {
            if (s.id === shipmentId) {
              return {
                ...s,
                status: newEvent.status,
                currentLocation: newEvent.location,
                events: [...s.events, newEvent]
              };
            }
            return s;
          })
        }));
      },

      getShipmentByTracking: (trackingNumber) => {
        return get().shipments.find((s) => s.trackingNumber.toUpperCase() === trackingNumber.toUpperCase());
      },

      login: (email, role) => {
        set({
          currentUser: {
            id: 'u1',
            email,
            role,
            name: role === 'admin' ? 'Admin User' : 'Valued Customer'
          }
        });
      },

      logout: () => {
        set({ currentUser: null });
      }
    }),
    {
      name: 'corten-logistics-storage'
    }
  )
);
