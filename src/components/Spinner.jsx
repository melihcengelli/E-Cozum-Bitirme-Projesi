import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function Spinner() {
  return (
    <div className="loadingSpinnerContainer">
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
    </div>
        
  )
}

export default Spinner