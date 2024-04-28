import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchProductsAsync } from '../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button/Button'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { fetchUsersAsync } from '../redux/slices/userSlice'
import UpdateProduct from '../components/product/UpdateProduct'
import DeleteProduct from '../components/product/DeleteProduct'
import { CenteredBox } from '../styled-components/Box'

const Admin = () => {
  const dispatch = useAppDispatch()
  const products = useSelector((state: AppState) => state.products.products)
  const users = useSelector((state: AppState) => state.users.users)
  const productLoading = useSelector((state: AppState) => state.products.loading)
  const productError = useSelector((state: AppState) => state.products.error)
  const userLoading = useSelector((state: AppState) => state.users.loading)
  const userError = useSelector((state: AppState) => state.users.error)
  const [tab, setTab] = useState('products')

  useEffect(() => {
    dispatch(fetchProductsAsync())
    dispatch(fetchUsersAsync())
  }, [dispatch])

  if (productLoading || userLoading) {
    return (
      <CenteredBox sx={{ height: '100vh' }}>
        <CircularProgress />
      </CenteredBox>
    )
  }

  if (productError) {
    return <Box>Error: {productError}</Box>
  }

  if (userError) {
    return <Box>Error: {userError}</Box>
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },

    '&:last-child td, &:last-child th': {
      border: 0
    }
  }))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ margin: '20px 0 20px 0' }}>
        <Button variant={tab === 'products' ? 'contained' : 'outlined'} onClick={() => setTab('products')}>Products</Button>
        <Button variant={tab === 'users' ? 'contained' : 'outlined'} onClick={() => setTab('users')}>Users</Button>
      </Box>
      {tab === 'products' && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell align="right">Product ID</StyledTableCell>
                <StyledTableCell align="right">Product Name</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right"><BorderColorIcon /></StyledTableCell>
                <StyledTableCell align="right"><DeleteForeverIcon /></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <StyledTableRow key={product.title}>
                  <StyledTableCell component="th" scope="row">
                    <Avatar alt="User Avatar" src={product.image} />
                  </StyledTableCell>
                  <StyledTableCell align="right">{product._id}</StyledTableCell>
                  <StyledTableCell align="right">{product.title}</StyledTableCell>
                  <StyledTableCell align="right">€{product.price}</StyledTableCell>
                  <StyledTableCell align="right">{product.categoryId.name}</StyledTableCell>
                  <StyledTableCell align="right">{product.description}</StyledTableCell>
                  <StyledTableCell align="right"><UpdateProduct productId={product._id}/></StyledTableCell>
                  <StyledTableCell align="right"><DeleteProduct productId={product._id} /></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tab === 'users' && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell align="right">User ID</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Role</StyledTableCell>
                <StyledTableCell align="right">Active</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell component="th" scope="row">
                    <Avatar alt="User Avatar" src={user.avatar} />
                  </StyledTableCell>
                  <StyledTableCell align="right">{user._id}</StyledTableCell>
                  <StyledTableCell align="right">{user.firstname} {user.lastname}</StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">{user.role}</StyledTableCell>
                  <StyledTableCell align="right">{user.banStatus ? <CancelIcon/> : <CheckCircleIcon /> }</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default Admin
