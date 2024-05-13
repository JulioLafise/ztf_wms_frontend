import React from 'react';
import {
  Box,
  IconButton,
  Paper,
  Skeleton
} from '@mui/material';
import { RefreshRounded } from '@mui/icons-material';
import { GaugeChart } from '@wms/components';
import { v4 as uuid } from 'uuid';

const GaugeCharPerformance = () => {
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
                width="15%"
                height="200px"
                sx={{ bgcolor: 'grey.400' }}
              />
            </Box>
          )
          : (
            <React.Fragment>
              <IconButton><RefreshRounded /></IconButton>
              <GaugeChart
                id={uuid()}
                title="Donaciones por Filiales"
                data={[
                  {
                    category: 'Nicaragua',
                    value: 95,
                    full: 100
                  },
                  {
                    category: 'Rep. Dominicana',
                    value: 60,
                    full: 100
                  },
                  {
                    category: 'Honduras',
                    value: 90,
                    full: 100
                  },
                  {
                    category: 'Guatemala',
                    value: 55,
                    full: 100
                  },
                  {
                    category: 'Panama',
                    value: 45,
                    full: 100
                  },
                  {
                    category: 'Costa Rica',
                    value: 83,
                    full: 100
                  },
                ]}
              />
            </React.Fragment>
          )
      }
    </Paper>
  );
};

export default GaugeCharPerformance;