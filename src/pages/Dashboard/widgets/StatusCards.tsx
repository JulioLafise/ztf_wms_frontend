import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  LaptopChromebook,
  MenuBook,
  StarsRounded,
  StyleSharp,
} from '@mui/icons-material';

interface IProps {

}

const StatusCards = (props: IProps) => {

  return (
    <React.Fragment>
      <Paper elevation={3} className="w-full md:w-2/6">
        <Box
          component="div"
          className="w-full rounded h-full bg-green-900 text-white flex flex-col items-center justify-center gap-2 p-3"
        >
          <Box component="article" className="flex gap-2 justify-center items-center w-full">
            <LaptopChromebook sx={{ fontSize: 65 }} />
            <Typography variant="h5" fontWeight="bold">Laptops</Typography>
          </Box>
          <Typography variant="h2" fontWeight="bold">500</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} className="w-full md:w-2/6">
        <Box
          component="div"
          className="w-full rounded h-full bg-orange-900 text-white flex flex-col items-center justify-center gap-2 p-3"
        >
          <Box component="article" className="flex gap-2 self-center justify-center items-center w-full">
            <MenuBook sx={{ fontSize: 65 }} />
            <Typography variant="h5" fontWeight="bold">Material de Estudio</Typography>
          </Box>
          <Typography variant="h2" fontWeight="bold">1000</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} className="w-full md:w-2/6">
        <Box
          component="div"
          className="w-full rounded h-full bg-blue-900 text-white flex flex-col items-center justify-center gap-2 p-3"
        >
          <Box component="article" className="flex gap-2 self-center justify-center items-center w-full">
            <StarsRounded sx={{ fontSize: 65 }} />
            <Typography variant="h5" fontWeight="bold">Becas Otorgadas</Typography>
          </Box>
          <Typography variant="h2" fontWeight="bold">350</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} className="w-full md:w-2/6">
        <Box
          component="div"
          className="w-full rounded h-full bg-amber-900 text-white flex flex-col items-center justify-center gap-2 p-3"
        >
          <Box component="article" className="flex gap-2 self-center justify-center items-center w-full">
            <StyleSharp sx={{ fontSize: 65 }} />
            <Typography variant="h5" fontWeight="bold">Otras Donaciones</Typography>
          </Box>
          <Typography variant="h2" fontWeight="bold">995</Typography>
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default StatusCards;