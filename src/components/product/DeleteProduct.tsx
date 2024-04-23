import { useFormik } from 'formik'
import { useState, memo } from 'react'
import { useSelector } from 'react-redux'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { deleteProductAsync, fetchProductsAsync } from '../../redux/slices/productSlice'
import { AppState, useAppDispatch } from '../../redux/store'

const DeleteProduct = ({ productId }: {productId: string}) => {
  const loading = useSelector((state: AppState) => state.products.loading)
  const error = useSelector((state: AppState) => state.products.error)
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      try {
        await dispatch(deleteProductAsync(String(productId)))
        await dispatch(fetchProductsAsync())
      } catch (error) {
        return error
      }
    }
  })

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
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
        color="error"
        variant="outlined"
        startIcon={<DeleteOutlineIcon />}
        sx={{ padding: 1 }}
        onClick={handleOpenModal}
      >
        Delete
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
            Remove this product?
          </Typography>
          <FormControl
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Button color="error" type="submit" variant="contained" sx={{ marginTop: 2 }}>
              Confirmed Delete
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  )
}

export default memo(DeleteProduct)
