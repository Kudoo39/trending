import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { registerUserAsync } from '../redux/slices/userSlice'
import { useAppDispatch } from '../redux/store'
import { SubmittedButton } from '../styled-components/Button'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmedPassword: '',
      avatar:
        'https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8fDA%3D'
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Required').min(3, 'Must be 3 or more characters'),
      lastname: Yup.string().required('Required').min(1, 'Must be 1 or more characters'),
      email: Yup.string()
        .required('Required')
        .matches(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, 'Please enter a valid email address'),
      password: Yup.string()
        .required('Required')
        .matches(/^.{3,}$/, 'Password must be at least 3 characters'),
      confirmedPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Password must match'),
      avatar: Yup.string().required('Required')
    }),
    onSubmit: async (values, { resetForm }) => {
      // eslint-disable-next-line no-unused-vars
      const { confirmedPassword, ...data } = values
      try {
        await dispatch(registerUserAsync(data))
        navigate('/login')
      } catch (error) {
        return error
      }
      resetForm()
    }
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: '600' }}>
        Register
      </Typography>
      <FormControl
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <TextField
          id="firstname"
          name="firstname"
          label="Your first name"
          type="text"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          placeholder="Enter your first name"
          variant="outlined"
          margin="normal"
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
          sx={{ marginBottom: 1, width: '300px' }}
        />

        <TextField
          id="lastname"
          name="lastname"
          label="Your last name"
          type="text"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          placeholder="Enter your last name"
          variant="outlined"
          margin="normal"
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
          sx={{ marginBottom: 1, width: '300px' }}
        />

        <TextField
          id="email"
          name="email"
          label="Email address"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email"
          variant="outlined"
          margin="normal"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ marginBottom: 1, width: '300px' }}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
          variant="outlined"
          margin="normal"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ marginBottom: 1, width: '300px' }}
        />

        <TextField
          id="confirmedPassword"
          name="confirmedPassword"
          label="Confirmed password"
          type="password"
          value={formik.values.confirmedPassword}
          onChange={formik.handleChange}
          placeholder="Confirm your password"
          variant="outlined"
          margin="normal"
          error={formik.touched.confirmedPassword && Boolean(formik.errors.confirmedPassword)}
          helperText={formik.touched.confirmedPassword && formik.errors.confirmedPassword}
          sx={{ marginBottom: 1, width: '300px' }}
        />

        <TextField
          id="avatar"
          name="avatar"
          label="Your Photo URL"
          type="string"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          placeholder="Enter your photo url"
          variant="outlined"
          margin="normal"
          error={formik.touched.avatar && Boolean(formik.errors.avatar)}
          helperText={formik.touched.avatar && formik.errors.avatar}
          sx={{ marginBottom: 1, width: '300px' }}
        />

        <SubmittedButton type="submit" variant="contained" sx={{ width: '300px', marginTop: 2 }}>
          Register
        </SubmittedButton>
      </FormControl>
      <Link component={RouterLink} to="/login" sx={{ marginTop: 2, paddingBottom: 4 }}>
        Log in to your account!
      </Link>
    </Box>
  )
}

export default Register
