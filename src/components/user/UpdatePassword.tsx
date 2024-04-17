import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SettingsIcon from '@mui/icons-material/Settings'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl/FormControl'
import Typography from '@mui/material/Typography/Typography'
import Modal from '@mui/material/Modal/Modal'
import { authenticateUserAsync, updateUserPasswordAsync } from '../../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../../redux/store'
import { UpdatePasswordType } from '../../misc/type'

const UpdatePassword = () => {
  const dispatch = useAppDispatch()
  const loading = useSelector((state: AppState) => state.users.loading)
  const error = useSelector((state: AppState) => state.users.error)
  const user = useSelector((state: AppState) => state.users.user)
  const [openModal, setOpenModal] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      password: '',
      newPassword: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().min(3, 'First name must be at least 3 characters').required('First name is required'),
      password: Yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),
      newPassword: Yup.string().min(3, 'New password must be at least 3 characters').required('New password is required')
    }),
    onSubmit: async (data: UpdatePasswordType, { resetForm }) => {
      const modifiedData = {
        updatePassword: data
      }
      try {
        await dispatch(updateUserPasswordAsync(modifiedData))
        await dispatch(authenticateUserAsync(localStorage.getItem('token') || ''))
      } catch (error) {
        return error
      }
      resetForm()
    }
  })

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    formik.resetForm()
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  return (
    <Box>
      <SettingsIcon sx={{ fontSize: '24px', marginLeft: '15px', 'cursor': 'pointer' }} onClick={handleOpenModal} />
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'background.default',
            boxShadow: 24,
            p: 6,
            maxWidth: 400
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: '600', marginBottom: 4 }}>
            Change Password
          </Typography>
          <FormControl
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <TextField
              id="email"
              name="email"
              label="Email"
              disabled
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              sx={{ marginBottom: 1, width: '240px' }}
            />
            <TextField
              id="password"
              name="password"
              label="Your Old Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              sx={{ marginBottom: 1, width: '240px' }}
            />
            <TextField
              id="newPassword"
              name="newPassword"
              label="New Password"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              fullWidth
              sx={{ marginBottom: 1, width: '240px' }}
            />

            <Button color="success" type="submit" variant="contained" sx={{ marginTop: 2 }}>
            OK
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  )
}

export default UpdatePassword
