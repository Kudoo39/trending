import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { memo } from 'react'

import Nav from './components/nav/Nav'
import Home from './pages/Home'
import Product from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Footer from './components/footer/Footer'
import Box from '@mui/material/Box'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Admin from './pages/Admin'
import { AppState } from './redux/store'

const App = () => {
  const isAuthenticated = useSelector((state: AppState) => state.users.isAuthenticated)
  const user = useSelector((state: AppState) => state.users.user)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Nav />
      <Box sx={{ flex: '1' }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Product />}></Route>
          <Route path="/products/:_id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}></Route>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/profile" />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />}></Route>
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default memo(App)
