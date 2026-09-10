import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/footer.jsx'
import Navbar from './Components/navbar.jsx'
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Menu from './pages/Menu.jsx'
import Offers from './pages/Offers.jsx'
import Register from './pages/Register.jsx'

function RoutedPage() {
  const navigate = useNavigate()
  const goHome = () => navigate('/')

  return (
    <main className='min-h-screen bg-orange-50'>
      <Navbar />
      <div className='route-view'>
        <Routes>
          <Route path='/' element={<><Home /><Footer /></>} />
          <Route path='/menu' element={<><Menu /><Footer /></>} />
          <Route path='/offers' element={<><Offers /><Footer /></>} />
          <Route path='/about' element={<><About onHome={goHome} onContact={() => navigate('/contact')} /><Footer /></>} />
          <Route path='/contact' element={<><Contact onHome={goHome} /><Footer /></>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login onHome={goHome} onRegister={() => navigate('/register')} />} />
          <Route path='/register' element={<Register onHome={goHome} onLogin={() => navigate('/login')} />} />
        </Routes>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 4000,
          style: { borderRadius: '14px', fontFamily: 'DM Sans, sans-serif' },
          success: { iconTheme: { primary: '#ea580c', secondary: '#fff7ed' } },
        }}
      />
      <RoutedPage />
    </BrowserRouter>
  )
}

export default App
