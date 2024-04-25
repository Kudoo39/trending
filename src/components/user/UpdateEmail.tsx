import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl/FormControl'
import Typography from '@mui/material/Typography/Typography'
import Modal from '@mui/material/Modal/Modal'
import { logout, updateUserProfileAsync } from '../../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../../redux/store'
import { UpdateUserType } from '../../misc/type'
import { toast } from 'react-toastify'
import { CenteredBox } from '../../styled-components/Box'
import { ConfirmedButton } from '../../styled-components/Button'

const UpdateEmail = () => {
  const dispatch = useAppDispatch()
  const userDispatch = useDispatch()
  const loading = useSelector((state: AppState) => state.users.loading)
  const error = useSelector((state: AppState) => state.users.error)
  const user = useSelector((state: AppState) => state.users.user)
  const [openModal, setOpenModal] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: user?.email
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required')
    }),
    onSubmit: async (data: UpdateUserType, { resetForm }) => {
      const modifiedUser = {
        updateUser: data,
        userId: String(user?._id)
      }
      try {
        await dispatch(updateUserProfileAsync(modifiedUser))
        await userDispatch(logout())
        toast.success('Your email is updated successfully! Please log in again', { position: 'bottom-left' })
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
      <CenteredBox sx={{ height: '100vh' }}>
        <CircularProgress />
      </CenteredBox>
    )
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  return (
    <Box>
      <BorderColorIcon sx={{ fontSize: '20px', marginLeft: '15px', 'cursor': 'pointer' }} onClick={handleOpenModal} />
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
            Update Email
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
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              sx={{ marginBottom: 1, width: '240px' }}
            />

            <ConfirmedButton color="success" type="submit" variant="contained">
            OK
            </ConfirmedButton>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  )
}

export default UpdateEmail
