import React from 'react';
import {
  Box,
  IconButton,
  Paper,
  Skeleton
} from '@mui/material';
import { RefreshRounded } from '@mui/icons-material';
import { ChartBars } from '@wms/components';
import { v4 as uuid } from 'uuid';

const CharBarsAnnualVisits = () => {
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
                variant="rectangular"
                width="15%"
                height="200px"
                sx={{ bgcolor: 'grey.400' }}
              />
            </Box>
          )
          : (
            <React.Fragment>
              <IconButton><RefreshRounded /></IconButton>
              <ChartBars
                id={uuid()}
                title="Donaciones Anuales - 2024"
                data={[
                  {
                    field: 'Enero',
                    values: {
                      'Laptops': 5000,
                      'Material Estudio': 400,
                    }
                  },
                  {
                    field: 'Febrero',
                    values: {
                      'Laptops': 2000,
                      'Material Estudio': 700,
                    }
                  },
                  {
                    field: 'Marzo',
                    values: {
                      'Laptops': 1500,
                      'Material Estudio': 3600,
                      'Otros': 600
                    }
                  },
                ]}
                // // variant="columns"
                // isPorcent
                // isStacked
              />
            </React.Fragment>
          )
      }
    </Paper>
  );
};

export default CharBarsAnnualVisits;