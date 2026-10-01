import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../cont/AuthContext'
import { supabase } from '../supabaseClient'
import OrderForm from '../components/OrderForm'
import OrdersList from '../components/OrdersList'

function AdminDashboard() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)

  // Protect the route
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  const handleOrderAdded = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) {
    return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white transition"
          >
            Logout
          </button>
        </div>
        
        <OrderForm onOrderAdded={handleOrderAdded} />
        
        <OrdersList refreshTrigger={refreshKey} />
      </div>
    </div>
  )
}

export default AdminDashboard