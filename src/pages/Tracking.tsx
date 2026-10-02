import { useState } from 'react'
import { supabase } from '../supabaseClient'

interface Order {
  id: number
  tracking_number: string
  customer_name: string
  customer_email: string
  description: string
  status: string
  destination: string
  created_at: string
}

interface TrackingUpdate {
  id: number
  order_id: number
  status: string
  location: string
  timestamp: string
}

function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [updates, setUpdates] = useState<TrackingUpdate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setOrder(null)
    setUpdates([])

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('tracking_number', trackingNumber.trim())
      .single()

    if (orderError || !orderData) {
      setError('Order not found. Please check your tracking number.')
      setLoading(false)
      return
    }

    setOrder(orderData)

    const { data: updatesData, error: updatesError } = await supabase
      .from('tracking_updates')
      .select('*')
      .eq('order_id', orderData.id)
      .order('timestamp', { ascending: false })

    console.log('Order ID:', orderData.id)
    console.log('Updates data:', updatesData)
    console.log('Updates error:', updatesError)

    if (updatesData) {
      setUpdates(updatesData)
    }

    setLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-600'
      case 'in-transit':
        return 'bg-yellow-600'
      default:
        return 'bg-slate-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return '✓'
      case 'in-transit':
        return '🚚'
      default:
        return '📦'
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>

        <form onSubmit={handleSearch} className="bg-slate-800 p-6 rounded-lg mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Tracking Number (e.g., COR-2XXX-XXXXX)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50 transition"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {order && (
          <>
            <div className="bg-slate-800 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Tracking Number:</span>
                  <span className="font-mono text-blue-400">{order.tracking_number}</span>
                </div>
                
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Customer:</span>
                  <span>{order.customer_name}</span>
                </div>
                
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Package:</span>
                  <span>{order.description}</span>
                </div>
                
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Current Status:</span>
                  <span className={`px-3 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Destination:</span>
                  <span>{order.destination}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-slate-400">Order Date:</span>
                  <span>{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-6">Tracking History</h2>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-600"></div>
                
                <div className="space-y-6">
                  <div className="relative flex gap-6">
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center z-10">
                      <span className="text-white text-sm"></span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Order Placed</p>
                      <p className="text-sm text-slate-400">{new Date(order.created_at).toLocaleString()}</p>
                      <p className="text-sm text-slate-400">Order received and processing</p>
                    </div>
                  </div>

                  {updates.map((update) => (
                    <div key={update.id} className="relative flex gap-6">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${getStatusColor(update.status)}`}>
                        <span className="text-white text-sm">{getStatusIcon(update.status)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold capitalize">{update.status}</p>
                        <p className="text-sm text-slate-400">{new Date(update.timestamp).toLocaleString()}</p>
                        {update.location && (
                          <p className="text-sm text-slate-400"> {update.location}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {updates.length === 0 && (
                    <p className="text-slate-400 text-sm ml-14">No tracking updates yet. Order is being processed.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Tracking