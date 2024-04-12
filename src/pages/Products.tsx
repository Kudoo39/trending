import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import defaultImage from '../assets/images/default_image.jpg'
import Categories from '../components/Categories'
import ScrollUpButton from '../components/ScrollUpButton'
import SortPrice from '../components/SortPrice'
import CreateProduct from '../components/product/CreateProduct'
import { Sort, ProductType, ProductRealType } from '../misc/type'
import { addToCart } from '../redux/slices/cartSlice'
import {
  fetchProductsAsync,
  fetchProductsCategoryAsync,
  fetchProductsCategoryPageAsync,
  fetchProductsPageAsync
} from '../redux/slices/productSlice'
import { authenticateUserAsync } from '../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { checkImage } from '../utils/checkImage'
import { cleanImage } from '../utils/cleanImage'
import { sortByHighest, sortByLowest } from '../utils/sort'

const Products = () => {
  const [selectedSort, setSelectedSort] = useState<Sort>('Default')
  const [page, setPage] = useState(1)
  const productsPerPage = 8

  const user = useSelector((state: AppState) => state.users.user)
  const products = useSelector((state: AppState) => state.products.products)
  const selectedCategory = useSelector((state: AppState) => state.categories.selectedCategory)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)
  const dispatch = useAppDispatch()
  const cartDispatch = useDispatch()

  const offset = (page - 1) * productsPerPage
  const limit = productsPerPage
  let numberOfPages = Math.ceil(products.length >= 0 ? products.length / productsPerPage : 0)
  numberOfPages = numberOfPages === 0 ? 1 : numberOfPages

  const handleAddToCart = debounce((product: ProductRealType) => {
    cartDispatch(addToCart(product))
  }, 300)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => {
    if (selectedCategory === '661554901973ad63139c85fc') {
      dispatch(fetchProductsAsync())
    } else {
      console.log(selectedCategory, 'THISSISIS SELECTED CATE')
      dispatch(fetchProductsCategoryAsync(selectedCategory))
      setPage(1)
    }
  }, [dispatch, selectedCategory])

  useEffect(() => {
    if (selectedCategory === '661554901973ad63139c85fc') {
      dispatch(fetchProductsPageAsync({ offset, limit }))
    } else {
      dispatch(fetchProductsCategoryPageAsync({ categoryId: selectedCategory, offset, limit }))
    }
  }, [dispatch, selectedCategory, offset, limit, products.length])

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken && !user) {
      dispatch(authenticateUserAsync(accessToken))
    }
  }, [dispatch, user])

  let sortProducts =
    selectedSort === 'Default'
      ? products
      : selectedSort === 'Highest Price'
        ? sortByHighest(products, 'price') // prettier-ignore
        : sortByLowest(products, 'price') // prettier-ignore

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
    <Box sx={{ display: 'flex', flexDirection: { xxs: 'column', xs: 'row' } }}>
      <Categories />
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex' }}>
            <SortPrice selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            {user && user.role === 'admin' && <CreateProduct />}
          </Box>
        </Box>

        {products.length === 0 ? (
          <Box sx={{ fontSize: '18px', margin: '10px 0 0 10px' }}>There is no item in this category :/</Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
              gap: 2,
              margin: '10px',
              justifyContent: 'center'
            }}
          >
            {sortProducts.map(product => (
              <Card
                key={product._id}
                sx={{
                  'border': '1px solid #ddd',
                  'borderRadius': '8px',
                  'boxShadow': '0 2px 4px rgba(0,0,0,0.1)',
                  'transition': 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' },
                  'display': 'flex',
                  'flexDirection': 'column',
                  'justifyContent': 'space-between'
                }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    alt={product.title}
                    image={checkImage(cleanImage(product.image)) ? cleanImage(product.image) : defaultImage}
                    sx={{ height: 300, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      Price:{' '}
                      <Typography component="span" sx={{ fontWeight: 'normal' }}>
                        €{product.price}
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>

                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    borderTop: '1px solid #ddd',
                    padding: '10px'
                  }}
                >
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    component={RouterLink}
                    to={`/products/${product._id}`}
                    sx={{ fontWeight: 'bold', padding: 1 }}
                  >
                    More detail
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => handleAddToCart(product)}
                    sx={{ fontWeight: 'bold', padding: 1 }}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}

        {numberOfPages === 1 ? null : (
          <Pagination
            count={numberOfPages}
            page={page}
            defaultPage={1}
            color="primary"
            sx={{ padding: 4 }}
            onChange={handlePageChange}
          />
        )}
      </Box>
      <ScrollUpButton />
    </Box>
  )
}

export default Products
