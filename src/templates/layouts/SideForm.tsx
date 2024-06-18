import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { enviroment } from '@wms/config';

interface IProps {
  children: React.ReactNode
}

const SideForm = ({ children }: IProps) => {
  return (
    <Box component="div" className="flex">
      <Box component="div" className="hidden md:flex w-2/3 shadow-2xl" sx={{
        height: '100vh',
        backgroundImage: 'url(/img/bg_01.jpg)',
        // backgroundImage: 'url(/img/svg/endless_constellation.svg)',
        backgroundSize: 'containt',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}>
        <Box component="section" className="flex flex-col bg-opacity-60 bg-white justify-center items-start w-full">
          <Box component="section" className="flex flex-col items-center justify-center gap-3 w-full">
            <Box>
              <Box component="article" className="flex items-center rounded-lg p-2" >
                <img src="/img/olpc_color_logotype.png" width="400" alt="olpc" />
              </Box>
            </Box>
            <Typography
              variant="h3"
              className="text-cyan-700 p-2 text-center"
              fontWeight="500"
            >
              {enviroment.appName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        component="div"
        className="flex flex-col w-full md:w-2/5"
        sx={{
          height: '100vh',
          backgroundImage: 'url(/img/svg/scattered-forcefields.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
        bgcolor="ButtonFace">
        <Box component="section" className="flex flex-col md:hidden justify-center items-center text-left h-[30%]">
          <Box component="section" className="flex flex-col items-center justify-center p-1 w-full" >
            <img src="/img/olpc_color_logotype.png" width="256" className="" alt="olpc" />
            <Typography
              variant="body1"
              className="text-cyan-700 p-2"
              fontWeight="500"
            >
              {enviroment.appName}
            </Typography>
          </Box>
        </Box>
        <Box component="section" className="flex flex-col justify-center h-[50%] md:h-full">
          {children}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SideForm;