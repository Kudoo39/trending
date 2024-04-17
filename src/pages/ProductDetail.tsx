import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'

import ReplyIcon from '@mui/icons-material/Reply'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import defaultImage from '../assets/images/default_image.jpg'
import DeleteProduct from '../components/product/DeleteProduct'
import UpdateProduct from '../components/product/UpdateProduct'
import ScrollUpButton from '../components/ScrollUpButton'
import { ProductRealType } from '../misc/type'
import { addToCart } from '../redux/slices/cartSlice'
import { fetchSingleProductAsync } from '../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { checkImage } from '../utils/checkImage'
import { cleanImage } from '../utils/cleanImage'
import { authenticateUserAsync } from '../redux/slices/userSlice'

const ProductDetail = () => {
  const user = useSelector((state: AppState) => state.users.user)
  const product = useSelector((state: AppState) => state.products.product)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)

  const { _id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cartDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSingleProductAsync(String(_id)))
  }, [dispatch, _id])

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    if (accessToken && !user) {
      dispatch(authenticateUserAsync(accessToken))
    }
  }, [dispatch, navigate, user])

  const handleAddToCart = debounce((product: ProductRealType) => {
    cartDispatch(addToCart(product))
  }, 300)

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={80} />
      </Box>
    )
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {product ? (
        <Card
          key={product._id}
          sx={{
            maxWidth: 500,
            width: '100%',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: 2
          }}
        >
          <CardMedia
            component="img"
            alt="Product Images"
            image={checkImage(cleanImage(product.image)) ? cleanImage(product.image) : defaultImage}
            sx={{ maxHeight: 400, objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
          />

          <Box sx={{ padding: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Product ID: {product._id}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Product:{' '}
              <Typography component="span" sx={{ fontWeight: 'normal' }}>
                {product.title}
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Price:{' '}
              <Typography component="span" sx={{ fontWeight: 'normal' }}>
                €{product.price}
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Category:{' '}
              <Typography component="span" sx={{ fontWeight: 'normal' }}>
                {product.categoryId.name}
              </Typography>
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', marginTop: 1 }}>
              Description:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'normal' }}>
              {product.description}
            </Typography>

            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <IconButton
                component={RouterLink}
                to="/products"
                sx={{ minWidth: 'unset', padding: 0, color: 'inherit' }}
              >
                <ReplyIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
            </CardActions>
            {user && user.role === 'admin' && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <UpdateProduct />
                <DeleteProduct />
              </Box>
            )}
          </Box>
          <ScrollUpButton />
        </Card>
      ) : (
        <Box>Product not found</Box>
      )}
    </Box>
  )
}

export default ProductDetail
