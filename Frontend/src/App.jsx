import { useState } from 'react'
import Footer from './Components/footer.jsx'
import Navbar from './Components/navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {
  const [page, setPage] = useState('home')

  const showHome = () => setPage('home')
  const showLogin = () => setPage('login')
  const showRegister = () => setPage('register')
  const showAbout = () => setPage('about')
  const showContact = () => setPage('contact')

  return (
    <main className='min-h-screen bg-orange-50'>
      <Navbar onHome={showHome} onSignIn={showLogin} onAbout={showAbout} onContact={showContact} />
      {page === 'home' && <><Home /><Footer /></>}
      {page === 'about' && <><About onHome={showHome} onContact={showContact} /><Footer /></>}
      {page === 'contact' && <><Contact onHome={showHome} /><Footer /></>}
      {page === 'login' && <Login onHome={showHome} onRegister={showRegister} />}
      {page === 'register' && <Register onHome={showHome} onLogin={showLogin} />}
    </main>
  )
}

export default App
