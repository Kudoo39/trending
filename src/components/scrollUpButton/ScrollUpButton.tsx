import { memo } from 'react'

import Button from '@mui/material/Button'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const ScrollUpButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<KeyboardArrowUpIcon />}
      sx={{
        position: 'fixed',
        left: '-2.3rem',
        bottom: '3rem',
        transform: 'rotate(-90deg)',
        fontWeight: 600,
        fontSize: '0.8rem',
        zIndex: 1000,
        display: 'block'
      }}
      onClick={handleScrollToTop}
    >
      Scroll Up
    </Button>
  )
}

export default memo(ScrollUpButton)
