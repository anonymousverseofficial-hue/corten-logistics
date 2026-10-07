import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

interface Order {
  id: number
  tracking_number: string
  description: string
  status: string
  destination: string
  created_at: string
}

function CustomerDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/customer-login')
        return
      }
      setUser(session.user)
      fetchOrders()
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/customer-login')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })

    if (data) {
      setOrders(data)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
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

  if (loading) {
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <div className="flex gap-4">
            <span className="text-slate-400">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition"
            >
              Logout
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-slate-800 p-8 rounded-lg text-center">
            <p className="text-slate-400 mb-4">No orders found</p>
            <p className="text-sm text-slate-500">Your orders will appear here once you make a purchase.</p>
          </div>
        ) : (
          <div className="bg-slate-800 p-6 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="p-2">Tracking #</th>
                    <th className="p-2">Package</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Destination</th>
                    <th className="p-2">Order Date</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-700">
                      <td className="p-2 font-mono text-blue-400">{order.tracking_number}</td>
                      <td className="p-2">{order.description}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-2">{order.destination}</td>
                      <td className="p-2 text-sm text-slate-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => navigate(`/track?number=${order.tracking_number}`)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white transition"
                        >
                          Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerDashboard