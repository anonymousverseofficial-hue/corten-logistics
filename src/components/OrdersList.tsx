import { useEffect, useState } from 'react'
// @ts-expect-error The JavaScript Supabase client currently has no declaration file.
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
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-750">
                <td className="p-2 font-mono text-blue-400">{order.tracking_number}</td>
                <td className="p-2">{order.customer_name}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    order.status === 'delivered' ? 'bg-green-600' :
                    order.status === 'in-transit' ? 'bg-yellow-600' :
                    'bg-slate-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-2">{order.destination}</td>
                <td className="p-2 text-sm text-slate-400">
                  {new Date(order.created_at).toLocaleDateString()}
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