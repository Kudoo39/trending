import React, { useState, memo } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { SortProps } from '../../misc/type'

const SortPrice = ({ selectedSort, setSelectedSort }: SortProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{ margin: '10px 0 0 10px' }}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          minWidth: 'unset',
          padding: 1,
          color: 'text.primary',
          fontWeight: '500',
          border: '1px solid',
          borderColor: 'text.primary'
        }}
      >
        Sort by: {selectedSort}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={() => {setSelectedSort('Default')}}>Default</MenuItem>
        <MenuItem onClick={() => {setSelectedSort('Highest Price')}}>Highest Price</MenuItem>
        <MenuItem onClick={() => {setSelectedSort('Lowest Price')}}>Lowest Price</MenuItem>
      </Menu>
    </Box>
  )
}

export default memo(SortPrice)
