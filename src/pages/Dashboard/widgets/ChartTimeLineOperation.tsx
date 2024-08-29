import React from 'react';
import {
  Box,
  IconButton,
  Paper,
  Skeleton
} from '@mui/material';
import { RefreshRounded } from '@mui/icons-material';
import { ChartBars } from '@wms/components';
import { useMasterDeparture } from '@wms/hooks';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

const CharBarsAnnualVisits = () => {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const { useEntryDepartureListQuery } = useMasterDeparture();
  const { data, isLoading, refetch } = useEntryDepartureListQuery({ year: moment().year() });

  React.useEffect(() => {
    if (data?.length > 0) {
      const months = data.map(item => item.month);
      const monthsFilter = months.filter((ft, index) => months.indexOf(ft) === index);
      monthsFilter.forEach(month => {
        let newState: any = {};
        data.filter(ft => ft.month === month).forEach(item => {
          newState = {
            field: item.month,
            values: {
              ...newState.values,
              [item.type.toUpperCase()]: item.count
            }
          };
        });
        setChartData(prevState => [
          ...prevState,
          newState
        ]);
      });
    }
  }, [data]);

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
              <IconButton onClick={() => refetch()}><RefreshRounded /></IconButton>
              <ChartBars
                id={uuid()}
                title={`Entradas & Salidas - ${moment().year()}`}
                data={chartData}
              />
            </React.Fragment>
          )
      }
    </Paper>
  );
};

export default CharBarsAnnualVisits;