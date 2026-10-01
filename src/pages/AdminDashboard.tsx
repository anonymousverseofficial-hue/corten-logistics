import { useState } from 'react'
import OrderForm from '../components/OrderForm'
import OrdersList from '../components/OrdersList'

function AdminDashboard() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleOrderAdded = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <OrderForm onOrderAdded={handleOrderAdded} />
        
        <OrdersList refreshTrigger={refreshKey} />
      </div>
    </div>
  )
}

export default AdminDashboard