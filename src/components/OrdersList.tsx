import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

interface Order {
  id: number
  tracking_number: string
  customer_name: string
  status: string
  destination: string
  created_at: string
}

interface OrdersListProps {
  refreshTrigger: number
}

function OrdersList({ refreshTrigger }: OrdersListProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setOrders(data)
    }
    if (error) {
      console.error('Error fetching orders:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [refreshTrigger])

  // Update order status AND create tracking history
  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setUpdatingId(orderId)

    // 1. Update the order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)

    if (updateError) {
      console.error('Error updating status:', updateError)
      alert('Failed to update status')
      setUpdatingId(null)
      return
    }

    // 2. Create a tracking update record (History)
    const { error: trackingError } = await supabase
      .from('tracking_updates')
      .insert([{
        order_id: orderId,
        status: newStatus,
        location: 'Distribution Center',
        timestamp: new Date().toISOString()
      }])

    if (trackingError) {
      console.error('Error creating tracking update:', trackingError)
    }

    // 3. Update local state
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))

    setUpdatingId(null)
  }

  // Delete an order
  const handleDelete = async (orderId: number, trackingNumber: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete order ${trackingNumber}? This cannot be undone.`
    )
    if (!confirmed) return

    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId)

    if (error) {
      console.error('Error deleting order:', error)
      alert('Failed to delete order')
    } else {
      setOrders(orders.filter(order => order.id !== orderId))
    }
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

  if (loading) return <p className="text-slate-400">Loading orders...</p>

  return (
    <div className="bg-slate-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="p-2">Tracking #</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Status</th>
              <th className="p-2">Destination</th>
              <th className="p-2">Created</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-700">
                <td className="p-2 font-mono text-blue-400">{order.tracking_number}</td>
                <td className="p-2">{order.customer_name}</td>
                <td className="p-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={updatingId === order.id}
                    className={`px-2 py-1 rounded text-sm text-white border-none outline-none cursor-pointer disabled:opacity-50 ${getStatusColor(order.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td className="p-2">{order.destination}</td>
                <td className="p-2 text-sm text-slate-400">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(order.id, order.tracking_number)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm text-white transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {orders.length === 0 && (
          <p className="text-slate-400 text-center py-4">No orders found</p>
        )}
      </div>
    </div>
  )
}

export default OrdersList