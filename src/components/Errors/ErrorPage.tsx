import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

const ErrorPage = () => {
  const error = useRouteError();

  const getErrorRoute = (error: unknown) => {
    if (isRouteErrorResponse(error)) {
      return (
        <>
          <Box component="div" className="grid grid-cols-12">
            <Typography variant="h1" className="text-center col-span-12" fontWeight="bold">{error.status}</Typography>
            <Typography variant="h2" component="h1" className="text-center col-span-12">
              {' '}
              ERROR CODE
            </Typography>
          </Box>
          <Box component="div" className="grid grid-cols-12 text-center mt-2">
            <span className="col-span-12 font-semibold">{error.data}</span>
          </Box>
        </>
      );
    } 
    return (
      <>
        <Box component="div" className="grid grid-cols-12">
          <Typography variant="h1" className="text-center col-span-12" fontWeight="bold">400</Typography>
          <Typography variant="h2" component="h1" className="text-center col-span-12">
            ERROR CODE
          </Typography>
        </Box>
        <Box component="div" className="grid grid-cols-12 text-center mt-2">
          <span className="col-span-12 font-semibold">Error Unknown</span>
        </Box>
      </>
    );
    
  };

  const onReload = () => {
    window.location.reload();
  };

  return (
    <Paper elevation={1} className="rounded-lg" sx={{ boxShadow: 'none' }}>
      <Box component="div" className="container grid content-center justify-center mx-3 rounded-lg"
        sx={{
          backgroundImage: 'url(/img/svg/meteor.svg)',
          backgroundSize: 'cover'
        }}
      >
        <Box component="div"
          className="grid row-auto p-1.5 lg:p-7 md:p-5 sm:p-3 xs:p-2 rounded-2xl"
        >
          <Box component="div" className="grid row-auto p-5 lg:p-36 md:p-28 sm:p-20 xs:p-14 rounded-3xl">
            {getErrorRoute(error)}
            <Box component="div" className="flex justify-center my-5">
              <Button type="button" variant="contained" onClick={onReload}>
                Reload
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ErrorPage;