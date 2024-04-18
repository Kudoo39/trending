import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { SearchProps } from '../misc/type'
import Button from '@mui/material/Button/Button'

const Search = ({ searchValue, setSearchValue, handleSearch }: SearchProps) => {
  return (
    <Box sx={{ margin: '11.5px 10.5px 0 10px' }}>
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
        onClick={() => handleSearch(searchValue)}
        disabled={!searchValue.trim()}
        sx={{ color: 'text.primary' }}
      >
        Search
      </Button>
    </Box>
  )
}

export default React.memo(Search)