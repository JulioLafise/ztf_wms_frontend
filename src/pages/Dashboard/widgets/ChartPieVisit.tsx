import React from 'react';
import {
  Paper,
  IconButton,
  Skeleton,
  Box
} from '@mui/material';
import { RefreshRounded } from '@mui/icons-material';
import { ChartPie } from '@wms/components';
import { v4 as uuid } from 'uuid';

const ChartPieVisit = () => {
  const [isLoading] = React.useState(false);
  return (
    <Paper elevation={4}>
      {
        isLoading
          ? (
            <Box style={{ padding: 15 }} className="flex flex-col items-center justify-center">
              <Skeleton
                animation="wave"
                variant="text"
                width="40%"
                height="50px"
                sx={{ bgcolor: 'grey.400' }}
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width="35%"
                height="200px"
                sx={{ bgcolor: 'grey.400' }}
              />
            </Box>
          )
          : (
            <React.Fragment>
              <IconButton><RefreshRounded /></IconButton>
              <ChartPie
                id={uuid()}
                data={[
                  {
                    category: 'Laptops',
                    value: 250
                  },
                  {
                    category: 'Material Estudio',
                    value: 150
                  },
                  {
                    category: 'Otros',
                    value: 360
                  },
                ]}
                title="Donaciones del Mes de Abril"
                size={{ height: '350px' }}
              />
            </React.Fragment>
          )
      }
    </Paper>
  );
};

export default ChartPieVisit;