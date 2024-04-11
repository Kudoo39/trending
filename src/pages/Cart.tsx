import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RemoveIcon from '@mui/icons-material/Remove'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import defaultImage from '../assets/images/default_image.jpg'
import { clearCart, removeFromCart, updateQuantity } from '../redux/slices/cartSlice'
import { AppState } from '../redux/store'
import { checkImage } from '../utils/checkImage'
import { cleanImage } from '../utils/cleanImage'

const Cart = () => {
  const cartItems = useSelector((state: AppState) => state.cart.cart)
  const dispatch = useDispatch()

  const totalPrice = cartItems.reduce((total, currentItem) => total + currentItem.price * currentItem.quantity, 0)

  const handleRemove = (_id: string) => {
    dispatch(removeFromCart(_id))
  }

  const handleIncrease = (_id: string) => {
    dispatch(updateQuantity({ _id, quantity: 1 }))
  }

  const handleDecrease = (_id: string) => {
    dispatch(updateQuantity({ _id, quantity: -1 }))
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('There is no product!', { position: 'bottom-left' })
    } else {
      toast.success('Your order has been processed!', { position: 'bottom-left' })
      dispatch(clearCart())
    }
  }

  return (
    <Box
      sx={{
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: { xxs: 'column', sm: 'row' },
        justifyContent: 'space-between'
      }}
    >
      <Box>
        {cartItems.map(cart => (
          <Box
            key={cart._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 1,
              borderBottom: '1px solid #ccc',
              paddingBottom: '10px'
            }}
          >
            <Box sx={{ marginRight: '10px' }}>
              <CardMedia
                component="img"
                alt="Product Images"
                image={checkImage(cleanImage(cart.image)) ? cleanImage(cart.image) : defaultImage}
                sx={{ width: '75px', height: '75px', borderRadius: '8px' }}
              />
            </Box>
            <Box sx={{ flex: '2', display: 'flex', flexDirection: 'column', marginRight: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Product:{' '}
                <Typography component="span" sx={{ fontWeight: 'normal' }}>
                  {cart.title}
                </Typography>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Price:{' '}
                <Typography component="span" sx={{ fontWeight: 'normal' }}>
                  €{cart.price}
                </Typography>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                ID:{' '}
                <Typography component="span" sx={{ fontWeight: 'normal' }}>
                  {cart._id}
                </Typography>
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginRight: 2,
                fontWeight: 'bold'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
                <IconButton onClick={() => handleDecrease(cart._id)} disabled={cart.quantity === 1}>
                  <RemoveIcon />
                </IconButton>
                {cart.quantity}
                <IconButton onClick={() => handleIncrease(cart._id)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Typography>
            <IconButton onClick={() => handleRemove(cart._id)} sx={{ marginLeft: 'auto' }}>
              <DeleteOutlineIcon sx={{ '&:hover': { color: 'red' } }} />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px',
          height: 'fit-content',
          marginLeft: { xxs: '0', sm: '20px' }
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
          ORDER SUMMARY
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <Typography variant="body1" sx={{ color: '#555' }}>
            Total:
          </Typography>
          <Typography variant="body1" sx={{ color: '#333' }}>
            €{totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <Typography variant="body1" sx={{ color: '#555' }}>
            Estimate Shipping:
          </Typography>
          <Typography variant="body1" sx={{ color: '#333' }}>
            €0.00
          </Typography>
        </Box>
        <Divider sx={{ marginY: '10px', backgroundColor: '#ccc' }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#555' }}>
            Subtotal:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
            €{totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ textTransform: 'none', marginTop: '10px' }}
          onClick={() => handleCheckout()}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  )
}

export default Cart
