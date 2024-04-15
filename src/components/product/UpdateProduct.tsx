import { useFormik } from 'formik'
import { useState, memo } from 'react'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

import AddTaskIcon from '@mui/icons-material/AddTask'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { fetchSingleProductAsync, updateProductAsync } from '../../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../../redux/store'
import { UpdateProductType } from '../../misc/type'
import { useParams } from 'react-router-dom'

const UpdateProduct = () => {
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)
  const product = useSelector((state: AppState) => state.products.product)
  const { _id } = useParams()

  const formik = useFormik({
    initialValues: {
      title: product?.title,
      price: product?.price,
      description: product?.description
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      price: Yup.number().positive('Price must be a positive number').required('Required'),
      description: Yup.string().required('Required')
    }),
    onSubmit: async (data: UpdateProductType, { resetForm }) => {
      const modifiedData = {
        updateProduct: data,
        productId: String(_id)
      }
      try {
        await dispatch(updateProductAsync(modifiedData))
        await dispatch(fetchSingleProductAsync(String(_id)))
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
    <Box sx={{ margin: '10px 0 0 10px' }}>
      <Button
        color="secondary"
        variant="outlined"
        startIcon={<AddTaskIcon />}
        sx={{ padding: 1 }}
        onClick={handleOpenModal}
      >
        Update
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'background.default',
            boxShadow: 24,
            p: 4,
            maxWidth: 400
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: '600' }}>
            New Product
          </Typography>
          <FormControl
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <TextField
              id="id"
              name="id"
              label="Product ID"
              type="text"
              value={_id}
              disabled
              variant="outlined"
              margin="normal"
              sx={{ marginBottom: 1, width: '300px' }}
            />

            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Enter the product name"
              variant="outlined"
              margin="normal"
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              sx={{ marginBottom: 1, width: '300px' }}
            />

            <TextField
              id="price"
              name="price"
              label="Price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              placeholder="Enter the product price"
              variant="outlined"
              margin="normal"
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              sx={{ marginBottom: 1, width: '300px' }}
            />

            <TextField
              id="description"
              name="description"
              label="Description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Enter the product description"
              variant="outlined"
              margin="normal"
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              sx={{ marginBottom: 1, width: '300px' }}
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

export default memo(UpdateProduct)
