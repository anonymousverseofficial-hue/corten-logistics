import { useState, FormEvent } from 'react'
// @ts-expect-error Supabase client is JavaScript and has no declaration file.
import { supabase } from '../supabaseClient'

interface OrderFormProps {
  onOrderAdded: () => void
}

interface FormData {
  tracking_number: string
  customer_name: string
  status: string
  destination: string
}

function OrderForm({ onOrderAdded }: OrderFormProps) {
  const [formData, setFormData] = useState<FormData>({
    tracking_number: '',
    customer_name: '',
    status: 'pending',
    destination: ''
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase
      .from('orders')
      .insert([formData])

    if (error) {
      setMessage('❌ Error: ' + error.message)
    } else {
      setMessage('✅ Order added successfully!')
      setFormData({ tracking_number: '', customer_name: '', status: 'pending', destination: '' })
      onOrderAdded()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Add New Order</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Tracking Number"
          value={formData.tracking_number}
          onChange={(e) => setFormData({ ...formData, tracking_number: e.target.value })}
          className="p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
          required
        />
        
        <input
          type="text"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
          className="p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
          required
        />
        
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
        >
          <option value="pending">Pending</option>
          <option value="in-transit">In Transit</option>
          <option value="delivered">Delivered</option>
        </select>
        
        <input
          type="text"
          placeholder="Destination"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          className="p-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50 transition"
      >
        {loading ? 'Adding...' : 'Add Order'}
      </button>

      {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
    </form>
  )
}

export default OrderForm