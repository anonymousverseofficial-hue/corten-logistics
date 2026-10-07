import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function CustomerSignup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: 'customer'
        }
      }
    })

    if (signupError) {
      setError(signupError.message)
    } else {
      setSuccess('Account created! Please check your email to confirm.')
      setTimeout(() => navigate('/customer-login'), 2000)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Customer Account</h1>

        <form onSubmit={handleSignup} className="bg-slate-800 p-8 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
              placeholder="customer@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 outline-none"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900/50 border border-green-500 text-green-400 p-3 rounded mb-4 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50 transition"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="mt-4 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <button type="button" onClick={() => navigate('/customer-login')} className="text-blue-400 hover:underline">
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default CustomerSignup