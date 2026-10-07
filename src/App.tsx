import CustomerSignup from './pages/CustomerSignup'
import CustomerLogin from './pages/CustomerLogin'
import CustomerDashboard from './pages/CustomerDashboard'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Tracking from './pages/Tracking'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<Tracking />} />
          <Route path="/track/:trackingNumber" element={<Tracking />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/customer-signup" element={<CustomerSignup />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App