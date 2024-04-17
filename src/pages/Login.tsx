import { useSelector } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import FormControl from '@mui/material/FormControl'
import DemoUserAccount from '../components/auth/DemoUserAccount'
import DemoAdminAccount from '../components/auth/DemoAdminAccount'
import { loginUserAsync } from '../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../redux/store'
import { UserCredential } from '../misc/type'
import { useEffect } from 'react'

const Login = () => {
  const loading = useSelector((state: AppState) => state.users.loading)
  const error = useSelector((state: AppState) => state.users.error)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state: AppState) => state.users.isAuthenticated)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Required')
        .matches(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, 'Please enter a valid email address'),
      password: Yup.string()
        .required('Required')
        .matches(/^.{3,}$/, 'Password must be at least 3 characters')
    }),
    onSubmit: (userCredential: UserCredential) => {
      dispatch(loginUserAsync(userCredential))
      navigate('/profile')
    }
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: '600' }}>
        Log In
      </Typography>
      <FormControl
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ marginBottom: 2, width: '300px' }}
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ marginBottom: 2, width: '300px' }}
        />

        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 1 }} disabled={loading}>
          {loading ? 'Loading...' : 'Log In'}
        </Button>
        {error && <Typography sx={{ color: 'red', marginTop: 1 }}>{error}</Typography>}
      </FormControl>

      <Box sx={{ marginTop: 2 }}>
        <DemoUserAccount />
        <DemoAdminAccount />
      </Box>

      <Link component={RouterLink} to="/register" sx={{ marginTop: 2 }}>
        Create a new account!
      </Link>
    </Box>
  )
}

export default Login
