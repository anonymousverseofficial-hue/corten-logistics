import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogisticsStore } from '../store/useLogisticsStore';
import { Lock, Mail, ArrowRight, Package } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useLogisticsStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified login for demo
    if (email.includes('admin')) {
      login(email, 'admin');
      navigate('/admin');
    } else {
      login(email, 'customer');
      navigate('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="bg-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
            <Package className="h-8 w-8 text-slate-900" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Access your Corten Logistic account</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 pl-11 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 pl-11 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-amber-600 font-semibold hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg"
            >
              Sign In
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-600 text-sm">
              Don't have an account?{' '}
              <a href="#" className="text-amber-600 font-semibold hover:underline">Create an account</a>
            </p>
          </div>
        </div>

        <div className="mt-8 bg-amber-50 p-4 rounded-xl border border-amber-100">
          <p className="text-xs text-amber-800 text-center font-medium">
            Demo Tip: Use <span className="font-bold">admin@corten.com</span> to access the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
