import { useState } from 'react'
import { supabase } from '../supabaseClient'

interface Order {
  id: number
  tracking_number: string
  customer_name: string
  status: string
  destination: string
  created_at: string
}

function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setOrder(null)

    const { data, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('tracking_number', trackingNumber.trim())
      .single()

    if (fetchError || !data) {
      setError('Order not found. Please check your tracking number.')
    } else {
      setOrder(data)
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

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-slate-800 p-6 rounded-lg mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Tracking Number (e.g., TRK001)"
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="bg-slate-800 p-6 rounded-lg">
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
                <span className="text-slate-400">Status:</span>
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

            {/* Status Timeline */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h3 className="font-bold mb-4">Status History</h3>
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(order.status)}`}></div>
                <div>
                  <p className="font-semibold">{order.status}</p>
                  <p className="text-sm text-slate-400">{new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tracking