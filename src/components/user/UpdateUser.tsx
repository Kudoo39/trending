import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl/FormControl'
import Typography from '@mui/material/Typography/Typography'
import Modal from '@mui/material/Modal/Modal'
import { authenticateUserAsync, updateUserProfileAsync } from '../../redux/slices/userSlice'
import { AppState, useAppDispatch } from '../../redux/store'
import { UpdateUserType } from '../../misc/type'
import { CenteredBox } from '../../styled-components/Box'
import { ConfirmedButton } from '../../styled-components/Button'

const UpdateUser = () => {
  const dispatch = useAppDispatch()
  const loading = useSelector((state: AppState) => state.users.loading)
  const error = useSelector((state: AppState) => state.users.error)
  const user = useSelector((state: AppState) => state.users.user)
  const [openModal, setOpenModal] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstname: user?.firstname,
      lastname: user?.lastname
    },
    validationSchema: Yup.object({
      firstname: Yup.string().min(3, 'First name must be at least 3 characters').required('First name is required'),
      lastname: Yup.string().min(1, 'Last name must be at least 1 character').required('Last name is required')
    }),
    onSubmit: async (data: UpdateUserType, { resetForm }) => {
      const modifiedUser = {
        updateUser: data,
        userId: String(user?._id)
      }
      try {
        await dispatch(updateUserProfileAsync(modifiedUser))
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
            Update User
          </Typography>
          <FormControl
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <TextField
              id="firstname"
              name="firstname"
              label="First Name"
              type="text"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
              fullWidth
              sx={{ marginBottom: 1, width: '240px' }}
            />
            <TextField
              id="lastname"
              name="lastname"
              label="Last Name"
              type="text"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
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

export default UpdateUser
