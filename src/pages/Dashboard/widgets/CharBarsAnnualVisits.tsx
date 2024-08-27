import React from 'react';
import {
  Box,
  IconButton,
  Paper,
  Skeleton
} from '@mui/material';
import { RefreshRounded } from '@mui/icons-material';
import { ChartBars } from '@wms/components';
import { useMasterPurchaseOrder } from '@wms/hooks';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

const CharBarsAnnualVisits = () => {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const { usePurchaseOrderYearListQuery } = useMasterPurchaseOrder();
  const { data, isLoading, refetch } = usePurchaseOrderYearListQuery({ year: moment().year() });

  React.useEffect(() => {
    if (data?.length) {
      const months = data.map(item => item.month);
      const monthsFilter = months.filter((ft, index) => months.indexOf(ft) === index);
      monthsFilter.forEach(month => {
        let newState: any = {};
        data.filter(ft => ft.month === month).forEach(item => {
          newState = {
            field: item.month,
            values: {
              ...newState.values,
              [item.status]: item.count
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
                title="Ordenes de Compras - 2024"
                data={chartData}
                variant="columns"
                isLegend={false}
                isPorcent
                isStacked
              />
            </React.Fragment>
          )
      }
    </Paper>
  );
};

export default CharBarsAnnualVisits;