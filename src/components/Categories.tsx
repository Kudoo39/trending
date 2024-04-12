import { memo, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckIcon from '@mui/icons-material/Check'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { fetchCategoriesAsync, setSelectedCategory } from '../redux/slices/categorySlice'
import { AppState, useAppDispatch } from '../redux/store'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const Categories = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  const categories = useSelector((state: AppState) => state.categories.categories)
  const selectedCategory = useSelector((state: AppState) => state.categories.selectedCategory)
  const loading = useSelector((state: AppState) => state.categories.loading)
  const error = useSelector((state: AppState) => state.categories.error)
  const dispatch = useAppDispatch()
  const categoryDispatch = useDispatch()

  const handleCategory = useCallback(
    (category: string) => {
      categoryDispatch(setSelectedCategory(category))
    },
    [categoryDispatch]
  )

  useEffect(() => {
    dispatch(fetchCategoriesAsync())
  }, [dispatch])

  if (loading) {
    return (
      <Box sx={{ marginTop: '10px', marginLeft: '2px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Box>Error: {error}</Box>
  }

  if (matches) {
    return (
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
          label="Category"
          onChange={(event: SelectChangeEvent<string>) => handleCategory(event.target.value as string)}
        >
          {categories.map(category => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  return (
    <Box
      sx={{
        'maxHeight': { xs: '3850px', sm: '2060px', md: '1480px', lg: '1040px' },
        'width': '220px',
        'overflowY': 'auto',
        'overflowX': 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
    >
      <List
        sx={{
          width: { xxs: '100%', xs: '200px' },
          marginLeft: '10px'
        }}
      >
        {categories.map(category => (
          <ListItem key={category._id} disablePadding onClick={() => handleCategory(category._id)}>
            <ListItemButton>
              <ListItemText primary={category.name} />
              {selectedCategory === category._id ? <CheckIcon /> : null}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default memo(Categories)
