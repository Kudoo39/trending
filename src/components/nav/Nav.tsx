import React, { useState, memo, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import { useColorScheme } from '@mui/material/styles'
import { ReactComponent as ShopIcon } from '../../assets/icons/shop.svg'
import { authenticateUserAsync, logout } from '../../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../../redux/store'

const Nav = () => {
  const user = useSelector((state: AppState) => state.users.user)
  const cartItems = useSelector((state: AppState) => state.cart.cart)
  const authenticate = useSelector((state: AppState) => state.users.isAuthenticated)
  const navDispatch = useDispatch()
  const dispatch = useAppDispatch()

  const totalItems = cartItems.reduce((total, currentItem) => total + currentItem.quantity, 0)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleLogout = useCallback(() => {
    navDispatch(logout())
    setAnchorEl(null)
  }, [navDispatch])

  useEffect(() => {
    const accessToken = localStorage.getItem('token')
    if (accessToken && !user) {
      dispatch(authenticateUserAsync(accessToken))
    }
  }, [dispatch, user])

  const ModeToggle = () => {
    const { mode, setMode } = useColorScheme()
    return (
      <IconButton
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light')
        }}
        sx={{ marginRight: { xxs: '0', xsm: '6px', xs: '12px' }, color: 'text.primary' }}
      >
        {mode === 'light' ? <LightModeIcon sx={{ fontSize: '30px' }} /> : <DarkModeIcon sx={{ fontSize: '30px' }} />}
      </IconButton>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        boxShadow: '0px 0.5px 2px',
        boxShadowColor: 'text.primary',
        borderRadius: '4px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '25px',
          flexWrap: 'wrap'
        }}
      >
        <Link component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <SvgIcon
            component={ShopIcon}
            inheritViewBox
            sx={{
              'cursor': 'pointer',
              'fontSize': '32px',
              'margin': '0 10px',
              '&:hover': {
                transform: 'scale(1.1)'
              },
              '&:active': {
                transform: 'scale(1.2)'
              }
            }}
          />
        </Link>
        <Link component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
          <Box
            sx={{
              'cursor': 'pointer',
              'fontWeight': '600',
              'color': 'text.primary',
              '&:hover': { color: 'text.secondary', fontWeight: 650 }
            }}
          >
            Home
          </Box>
        </Link>
        <Link component={RouterLink} to="/products" sx={{ textDecoration: 'none' }}>
          <Box
            sx={{
              'cursor': 'pointer',
              'fontWeight': '600',
              'color': 'text.primary',
              '&:hover': { color: 'text.secondary', fontWeight: 650 }
            }}
          >
            Products
          </Box>
        </Link>
        {user && user.role === 'admin' && <Link component={RouterLink} to="/admin" sx={{ textDecoration: 'none' }}>
          <Box
            sx={{
              'cursor': 'pointer',
              'fontWeight': '600',
              'color': 'text.primary',
              '&:hover': { color: 'text.secondary', fontWeight: 650 }
            }}
          >
            Admin Dashboard
          </Box>
        </Link>
        }
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggle />
        <Tooltip title="Carts">
          <Badge badgeContent={totalItems} color="primary">
            <Link component={RouterLink} to="/cart" sx={{ display: 'flex', verticalAlign: 'middle', color: 'inherit' }}>
              <ShoppingCartIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />
            </Link>
          </Badge>
        </Tooltip>
        <Tooltip title="Profiles">
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              minWidth: 'unset',
              padding: 0,
              color: 'inherit',
              margin: { xxs: '0 4px', xsm: '0 10px', xs: '0 17px' }
            }}
          >
            <PersonOutlineIcon sx={{ fontSize: '30px' }} />
          </IconButton>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
          {authenticate ? (
            <Box>
              <Link component={RouterLink} to="/profile" sx={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Box>
          ) : (
            <Link component={RouterLink} to="/login" sx={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem onClick={handleClose}>Log In / Register</MenuItem>
            </Link>
          )}
        </Menu>
      </Box>
    </Box>
  )
}

export default memo(Nav)
