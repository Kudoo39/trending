import React, { ChangeEvent } from 'react'

import AutorenewIcon from '@mui/icons-material/Autorenew'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { SearchProps } from '../misc/type'
import Button from '@mui/material/Button/Button'

const Search = ({ searchValue, setSearchValue, minPrice, setMinPrice, maxPrice, setMaxPrice, handleSearch }: SearchProps) => {
  const handleClick = () => {
    handleSearch({ searchValue, minPrice, maxPrice })
  }

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (newValue >= 0) {
      setMinPrice(newValue)
    }
  }

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (newValue >= 0) {
      setMaxPrice(newValue)
    }
  }

  return (
    <Box sx={{ margin: '11.5px 10.5px 0 10px' }}>
      <TextField
        label="Min Price"
        type="number"
        size="small"
        value={minPrice}
        onChange={handleMinPriceChange}
        InputProps={{
          startAdornment: (<InputAdornment position="start">$</InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <AutorenewIcon
                onClick={() => {
                  setMinPrice(0)
                }}
                fontSize="small"
                sx={{ color: 'text.primary', cursor: 'pointer', display: minPrice === 0 ? 'none' : 'block' }}
              />
            </InputAdornment>
          )
        }}
        sx={{
          marginRight: '2px',
          marginBottom: { xxs: '12px', lg: '0px' },
          '& label': { color: 'text.primary' },
          '& input': { color: 'text.primary' },
          '& label.Mui-focused': { color: 'text.primary' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'text.primary'
            },
            '&:hover fieldset': {
              borderColor: 'text.primary'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'text.primary'
            }
          }
        }}
      />

      <TextField
        label="Max Price"
        type="number"
        size="small"
        value={maxPrice}
        onChange={handleMaxPriceChange}
        InputProps={{
          startAdornment: (<InputAdornment position="start">$</InputAdornment>),
          endAdornment: (
            <InputAdornment position="end">
              <AutorenewIcon
                onClick={() => {
                  setMaxPrice(10000)
                }}
                fontSize="small"
                sx={{ color: 'text.primary', cursor: 'pointer', display: maxPrice === 10000 ? 'none' : 'block' }}
              />
            </InputAdornment>
          )
        }}
        sx={{
          marginRight: { xxs: '2px', lg: '12px' },
          marginBottom: { xxs: '12px', lg: '0px' },
          '& label': { color: 'text.primary' },
          '& input': { color: 'text.primary' },
          '& label.Mui-focused': { color: 'text.primary' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'text.primary'
            },
            '&:hover fieldset': {
              borderColor: 'text.primary'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'text.primary'
            }
          }
        }}
      />

      <TextField
        label="Search..."
        type="text"
        size="small"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.primary' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <CloseIcon
                onClick={() => {
                  setSearchValue('')
                }}
                fontSize="small"
                sx={{ color: 'text.primary', cursor: 'pointer', display: searchValue.length <= 0 ? 'none' : 'block' }}
              />
            </InputAdornment>
          )
        }}
        sx={{
          '& label': { color: 'text.primary' },
          '& input': { color: 'text.primary' },
          '& label.Mui-focused': { color: 'text.primary' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'text.primary'
            },
            '&:hover fieldset': {
              borderColor: 'text.primary'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'text.primary'
            }
          }
        }}
      />

      <Button
        variant="text"
        onClick={handleClick}
        sx={{ color: 'text.primary', fontWeight: '900' }}
      >
        Search
      </Button>
    </Box>
  )
}

export default React.memo(Search)