import { useColorScheme } from '@mui/material/styles'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import IconButton from '@mui/material/IconButton/IconButton'

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme()
  return (
    <IconButton
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
      sx={{ marginRight: { xxs: '0', xsm: '6px', xs: '12px' }, color: 'text.primary' }}
    >
      {mode === 'light' ? <LightModeIcon sx={{ fontSize: '30px' }} /> : <DarkModeIcon sx={{ fontSize: '30px' }} />}
    </IconButton>
  )
}

export default ModeToggle
