import { Box, CircularProgress, Typography } from '@mui/material';

const SpinnerDoom = () => {
  return (
    <Box
      component="div"
      className="relative flex flex-nowrap items-center justify-center text-center"
      sx={{ height: '100vh', zIndex: '99999 !important', bgcolor: 'background.paper' }}
    >
      <CircularProgress
        size="150px"
        color="primary"
        className=""
        title="Loading..."
      />
      <Typography
        variant="h5"
        className="absolute animate-fade animate-infinite animate-duration-[1500ms] animate-ease-in-out animate-alternate-reverse animate-fill-both"
        textAlign="center"
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default SpinnerDoom;