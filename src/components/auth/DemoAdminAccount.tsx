import { useFormik } from 'formik'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import { UserCredential } from '../../misc/type'
import { loginUserAsync } from '../../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../../redux/store'

const DemoAdminAccount = () => {
  const loading = useSelector((state: AppState) => state.users.loading)
  const error = useSelector((state: AppState) => state.users.error)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: process.env.REACT_APP_ADMIN_EMAIL ?? '',
      password: process.env.REACT_APP_ADMIN_PASSWORD ?? ''
    },

    onSubmit: (userCredential: UserCredential) => {
      dispatch(loginUserAsync(userCredential))
      navigate('/profile')
    }
  })

  return (
    <Box>
      <FormControl
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{ marginTop: 1, width: '300px' }}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Explore Admin Features'}
        </Button>
        {error && <Typography sx={{ color: 'red', marginTop: 1 }}>{error}</Typography>}
      </FormControl>
    </Box>
  )
}

export default memo(DemoAdminAccount)
