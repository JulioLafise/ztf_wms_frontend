import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLoaderData, useLocation } from 'react-router-dom';

const NotFoundMain = () => {
  const theme = useTheme();
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: `${theme.palette.primary.dark}`,
        backgroundImage: 'url(/img/svg/world_map.svg)',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Box sx={{ background: 'white', padding: 2, borderRadius: 5, boxShadow: 5 }}>
        <img src="/img/logo_fzt2.png" alt="logoZTF" style={{ height: 'auto', width: '400px' }} />
      </Box>
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }} className="text-center">
        {/* La página que buscas no existe. */}
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" sx={{ margin: 5 }} onClick={() => navigate('/', { replace: true })}>Back</Button>
    </Box>
  );
};


const NotFoundNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rootPath = localStorage.getItem('nav-path') === location.pathname ? '/app/dashboard' : localStorage.getItem('nav-path');
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          // backgroundImage: 'url(/img/svg/hexagon_blue.svg)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          padding: 5
        }}
      >
        <Box sx={{ background: 'white', padding: 2, borderRadius: 5, boxShadow: 5 }}>
          <img src="/img/logo_fzt2.png" alt="logoZTF" style={{ height: 'auto', width: '400px', }} />
        </Box>
        <Typography variant="h1">
          404
        </Typography>
        <Typography variant="h6" className="text-center">
          The page you’re looking for doesn’t exist.
          {/* La página que buscas no existe. */}
        </Typography>
        <Button variant="contained" sx={{ margin: 5 }} onClick={() => navigate(rootPath || '/app/dashboard', { replace: true })}>Back</Button>
      </Box>
    </React.Fragment>
  );
};

interface Props {
  page?: boolean
}

const NotFoundPage = (props: Props) => {
  const { page } = props;
  return (
    <Box component="div">
      {
        page
          ? (<NotFoundNav />)
          : (<NotFoundMain />)
      }
    </Box>
  );
};

export default NotFoundPage;