import React from 'react';
import {
  Paper,
  IconButton,
  Skeleton,
  Box
} from '@mui/material';
import { RefreshRounded } from '@mui/icons-material';
import { ChartPie } from '@wms/components';
import { useMasterAccount } from '@wms/hooks';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

const ChartPieVisit = () => {
  const { useAccountStatusQuery } = useMasterAccount();
  const [chartData, setChartData] = React.useState<any[]>([]);

  const { data, isLoading, refetch } = useAccountStatusQuery({ year: moment().year(), statusId: 0 });

  React.useEffect(() => {
    if (data?.length > 0) {
      const status = data.map(item => item.status);
      const statusFilter = status.filter((ft, index) => status.indexOf(ft) === index);
      statusFilter.forEach(statu => {
        let newState: any = {};
        let acc = 0;
        data.filter(ft => ft.status === statu).forEach(item => {
          acc += Number(item.count) || 0;
        });
        newState = {
          category: statu,
          value: acc
        };
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
                variant="circular"
                width="35%"
                height="200px"
                sx={{ bgcolor: 'grey.400' }}
              />
            </Box>
          )
          : (
            <React.Fragment>
              <IconButton onClick={() => refetch()}><RefreshRounded /></IconButton>
              <ChartPie
                id={uuid()}
                data={chartData}
                title={`Estado de Cuentas - ${moment().year()}`}
                size={{ height: '350px' }}
              />
            </React.Fragment>
          )
      }
    </Paper>
  );
};

export default ChartPieVisit;