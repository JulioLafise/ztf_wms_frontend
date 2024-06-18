import { Box, Typography, LinearProgress } from '@mui/material';

const SpinnerDoom = () => {
  return (
    <Box
      component="div"
      className="flex flex-nowrap items-center justify-center text-center"
      sx={{ height: '100vh', zIndex: '99999 !important', bgcolor: 'background.paper' }}
    >
      <Box
        component="div"
        className="flex flex-col flex-nowrap gap-4 items-center justify-center text-center"
        sx={{
          backgroundImage: 'url(/img/svg/animated_shape_corner_blue.svg)',
          height: '100vh',
          width: '100vw',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
        <img src="/img/olpc_color_logotype.png" alt="olpc" className="w-[50%] md:w-[30%]" />
        <Typography
          variant="h5"
          className="animate-fade animate-infinite animate-duration-[1500ms] animate-ease-in-out animate-alternate-reverse animate-fill-both"
          textAlign="center"
        >
          Loading...
        </Typography>
        <LinearProgress title="Loading..." variant="indeterminate" color="info" sx={{ width: '30%' }} />
      </Box>
    </Box>
  );
};

export default SpinnerDoom;