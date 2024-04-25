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
import { fetchProductsAsync, fetchSingleProductAsync, updateProductAsync } from '../../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../../redux/store'
import { ManageProductType } from '../../misc/type'
import { ALL_CATEGORY_ID } from '../../misc/constants'
import Select from '@mui/material/Select/Select'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import FormHelperText from '@mui/material/FormHelperText/FormHelperText'
import { CenteredBox } from '../../styled-components/Box'
import { ConfirmedButton } from '../../styled-components/Button'

const UpdateProduct = ({ productId }: {productId: string}) => {
  const categories = useSelector((state: AppState) => state.categories.categories)
  const categoryId = categories.length > 0 ? categories[1]._id : ALL_CATEGORY_ID
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      price: 0,
      description: '',
      categoryId: categoryId
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      price: Yup.number().positive('Price must be a positive number').required('Required'),
      description: Yup.string().required('Required'),
      categoryId: Yup.string().required('Required')
    }),
    onSubmit: async (data: ManageProductType, { resetForm }) => {
      const modifiedData = {
        updateProduct: data,
        productId: String(productId)
      }
      try {
        await dispatch(updateProductAsync(modifiedData))
        await dispatch(fetchSingleProductAsync(String(productId)))
        await dispatch(fetchProductsAsync())
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
            Update Product
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
              value={productId}
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

            <Select
              id="category"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              variant="outlined"
              error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
              sx={{ marginTop: 2, width: '300px' }}
            >
              {categories.slice(1).map(category => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <FormHelperText error>{formik.errors.categoryId}</FormHelperText>
            )}

            <ConfirmedButton color="success" type="submit" variant="contained">
              OK
            </ConfirmedButton>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  )
}

export default memo(UpdateProduct)
