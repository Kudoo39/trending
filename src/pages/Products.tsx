import { debounce } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'

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
import Search from '../components/Search'
import { Sort, ProductRealType } from '../misc/type'
import { addToCart } from '../redux/slices/cartSlice'
import {
  fetchProductsAllAsync,
  fetchProductsCategoryAllAsync
} from '../redux/slices/productSlice'
import { authenticateUserAsync } from '../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { checkImage } from '../utils/checkImage'
import { cleanImage } from '../utils/cleanImage'
import { sortByHighest, sortByLowest } from '../utils/sort'
import { ALL_CATEGORY_ID } from '../misc/constants'

const Products = () => {
  const [selectedSort, setSelectedSort] = useState<Sort>('Default')
  const [searchValue, setSearchValue] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [page, setPage] = useState(1)
  const productsPerPage = 8

  const user = useSelector((state: AppState) => state.users.user)
  const products = useSelector((state: AppState) => state.products.products)
  const total = useSelector((state: AppState) => state.products.total)
  const selectedCategory = useSelector((state: AppState) => state.categories.selectedCategory)
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)
  const dispatch = useAppDispatch()
  const cartDispatch = useDispatch()

  const offset = (page - 1) * productsPerPage
  const limit = productsPerPage
  let numberOfPages = Math.ceil(total >= 0 ? total / productsPerPage : 0)
  numberOfPages = numberOfPages === 0 ? 1 : numberOfPages

  const handleSearch = ({ searchValue, minPrice, maxPrice }: { searchValue: string, minPrice: number, maxPrice: number}) => {
    fetchProducts(searchValue, minPrice, maxPrice)
  }

  const handleAddToCart = debounce((product: ProductRealType) => {
    if (!user) {
      toast.error('Please log in to add item to cart!', { position: 'bottom-left' })
      return <Box>User not found!</Box>
    }

    cartDispatch(addToCart(product))
  }, 300)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  useEffect(() => {
    fetchProducts(searchValue, minPrice, maxPrice)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user, offset, selectedCategory])

  const fetchProducts = (searchValue: string, minPrice: number, maxPrice: number) => {
    if (selectedCategory === ALL_CATEGORY_ID) {
      dispatch(fetchProductsAllAsync({ searchQuery: searchValue, minPrice, maxPrice, offset, limit }))
    } else {
      dispatch(fetchProductsCategoryAllAsync({ categoryId: selectedCategory, searchQuery: searchValue, minPrice, maxPrice, offset, limit }))
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    if (accessToken && !user) {
      dispatch(authenticateUserAsync(accessToken))
    }
  }, [dispatch, user])

  let sortProducts =
    selectedSort === 'Default'
      ? products
      : selectedSort === 'Highest Price'
        ? sortByHighest(products, 'price')
        : sortByLowest(products, 'price')

  const memoizedSearchValue = useMemo(() => searchValue, [searchValue])

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
        <Box sx={{ display: 'flex', flexDirection: { xxs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <SortPrice selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            {user && user.role === 'admin' && <CreateProduct />}
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Search
              searchValue={memoizedSearchValue}
              setSearchValue={setSearchValue}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              handleSearch={handleSearch}
            />
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
export default React.memo(Products)
