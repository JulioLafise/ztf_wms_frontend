import React from 'react';
import {
  Box,
  Divider,
  Theme,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useLocation } from 'react-router-dom';

const TitleRouter = () => {
  const location = useLocation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const path = location.pathname.split('/');
  const indexLast = location.pathname.split('/').length - 1;
  return (
    <React.Fragment>
      <Box
        component="div"
        className={`flex flex-col ${isMobile ? 'pb-2 pt-10' : 'py-2'}`}
      >
        <Typography variant="h4" fontWeight="bold" fontSize={28}>{path[indexLast].toUpperCase()}</Typography>
        <Box sx={{ width: 70 - (path[indexLast].length + 10), paddingTop: 0.5 }}>
          <Divider color="#668DC0" sx={{ borderWidth: 2 }} />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default TitleRouter;