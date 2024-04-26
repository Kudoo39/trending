import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { authenticateUserAsync, logout } from '../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { OrderProductsType } from '../misc/type'
import UpdateUser from '../components/user/UpdateUser'
import UpdateEmail from '../components/user/UpdateEmail'
import UpdatePassword from '../components/user/UpdatePassword'
import UpdateAvatar from '../components/user/UpdateAvatar'
import { fetchProductsAsync } from '../redux/slices/productSlice'
import { ProfileCard } from '../styled-components/Card'
import { Avatar, ListItemAvatar, ListItemText } from '@mui/material'

const Profile = () => {
  const allProducts = useSelector((state: AppState) => state.products.products)
  const user = useSelector((state: AppState) => state.users.user)
  const loading = useSelector((state: AppState) => state.users.loading)
  const error = useSelector((state: AppState) => state.users.error)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userDispatch = useDispatch()
  const [tab, setTab] = useState('profile')

  const handleLogout = () => {
    userDispatch(logout())
  }

  useEffect(() => {
    dispatch(fetchProductsAsync())
  }, [dispatch])

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    if (accessToken && !user) {
      dispatch(authenticateUserAsync(accessToken))
    } else if (!accessToken) {
      navigate('/login')
    }
  }, [dispatch, navigate, user])

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
        <ProfileCard>
          <Box sx={{ display: 'flex', margin: '8px 0 8px 0' }}>
            <Avatar src={user.avatar} alt="Avatar" sx={{ width: 120, height: 120, borderRadius: '50%' }}/>
            <UpdateAvatar />
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
            <UpdatePassword />
          </Box>
        </ProfileCard>
      )}
      {tab === 'orders' && user && (
        <ProfileCard>
          <Box>
            <Typography variant="h4" sx={{ marginBottom: 1 }} >Your Orders</Typography>
            {user.orders.map((order: OrderProductsType, index: number) => (
              <Box key={order._id} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }} >Order {index + 1}:</Typography>
                <List sx={{ listStyleType: 'none' }}>
                  {order.products.map(product => {
                    const matchedProduct = allProducts.find(p => p._id === product.productId)
                    return (
                      <ListItem key={product._id}
                        sx={{
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          padding: '8px',
                          marginBottom: '4px'
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar alt={matchedProduct?.title} src={matchedProduct?.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${matchedProduct?.title}`}
                          secondary={
                            <Box>
                              <Typography variant="body2">Price: €{matchedProduct?.price}</Typography>
                              <Typography variant="body2">Category: {matchedProduct?.categoryId.name}</Typography>
                              <Typography variant="body2">Quantity: {product.quantity}</Typography>
                            </Box>}
                        />
                      </ListItem>
                    )
                  }
                  )}
                </List>
              </Box>
            ))}
          </Box>
        </ProfileCard>
      )}
    </Box>
  )
}

export default Profile
