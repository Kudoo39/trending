import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SettingsIcon from '@mui/icons-material/Settings';
import { authenticateUserAsync, logout } from '../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { OrderProductsType } from '../misc/type'
import Card from '@mui/material/Card/Card'
import UpdateUser from '../components/user/UpdateUser'
import UpdateEmail from '../components/user/UpdateEmail'

const Profile = () => {
  const user = useSelector((state: AppState) => state.users.user)
  const loading = useSelector((state: AppState) => state.users.loading)
  const error = useSelector((state: AppState) => state.users.error)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userDispatch = useDispatch()

  const handleLogout = () => {
    userDispatch(logout())
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    if (accessToken && !user) {
      dispatch(authenticateUserAsync(accessToken))
    } else if (!accessToken) {
      navigate('/login')
    }
  }, [dispatch, navigate, user])

  const [tab, setTab] = useState('profile')

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ margin: '20px 0 20px 0' }}>
        <Button variant={tab === 'profile' ? 'contained' : 'outlined'} onClick={() => setTab('profile')}>Profile</Button>
        <Button variant={tab === 'orders' ? 'contained' : 'outlined'} onClick={() => setTab('orders')}>Orders</Button>
      </Box>
      {tab === 'profile' && user && (
        <Card sx={{ maxWidth: 500, width: '100%', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: 2 }}>
          <Box sx={{ margin: '8px 0 8px 0' }}>
            <img src={user.avatar} alt="Avatar" style={{ width: 120, height: 120, borderRadius: '50%' }} />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h5" component="h1">
                {user.firstname} {user.lastname}
              </Typography>
              <UpdateUser />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                {user.email}
              </Typography>
              <UpdateEmail />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button variant="contained" onClick={handleLogout}>
              Log Out
            </Button>
            <SettingsIcon />
          </Box>
        </Card>
      )}
      {tab === 'orders' && user && (
        <Card sx={{ maxWidth: 500, width: '100%', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: 2 }}>
          <Box>
            <Typography variant="h4">Your Orders:</Typography>
            {user.orders.map((order: OrderProductsType, index: number) => (
              <Box key={order._id} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1">Order {index + 1}:</Typography>
                <ul>
                  {order.products.map(product => (
                    <li key={product._id}>
                      {product.quantity} x {product.productId}
                    </li>
                  ))}
                </ul>
              </Box>
            ))}
          </Box>
        </Card>
      )}
    </Box>
  )
}

export default Profile
