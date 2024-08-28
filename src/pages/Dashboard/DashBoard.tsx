import React from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon, IconButtonBg } from '@wms/components';
import { useMasterPurchaseOrder } from '@wms/hooks';
import {
  ChartPieVisit,
  CharBarsAnnualVisits,
  GaugeChartPerformance,
  ChartTimeLineOperation,
  StatusCard
} from './widgets';

const DashboardPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [approved, setApproved] = React.useState(0);
  const [pending, setPending] = React.useState(0);

  const { usePurchaseOrderYearListQuery } = useMasterPurchaseOrder();
  const { data, isLoading, refetch } = usePurchaseOrderYearListQuery({ year: moment().year() });

  React.useEffect(() => {
    if (data?.length) {
      const status = data.map(item => item.status);
      const statusFilter = status.filter((ft, index) => status.indexOf(ft) === index);
      statusFilter.forEach(stat => {
        data.filter(ft => ft.status === stat).forEach(item => {
          if (item.status === 'APROBADO') {
            setApproved(prevState => prevState + item.count);
          }
          if (item.status === 'EN PROCESO') {
            setPending(prevState => prevState + item.count);
          }
        });
      });
    }
  }, [data]);

  return (
    <Box component="div" className="grid gap-3 grid-cols-12 grid-rows-auto">
      <Box component="div" className="col-span-12 col-start-1 row-start-1 animate-fade flex gap-2">
        <StatusCard title="ORDENES APROBADAS" count={approved} color="success" />
        <StatusCard title="ORDENES EN PROCESO" count={pending} color="warning" comment="Review" />
      </Box>
      <Box component="div" className="col-span-12 col-start-1 row-start-2 animate-fade">
        <CharBarsAnnualVisits />
      </Box>
      <Box component="div" className="col-span-12 col-start-1 row-start-3 animate-fade">
        <ChartTimeLineOperation />
      </Box>
      <Box component="div" className="col-span-12 md:col-span-6 col-start-1 row-start-4 animate-fade">
        <ChartPieVisit />
      </Box>
      <Box component="div" className="col-span-12 md:col-span-6 col-start-1 row-start-5 md:row-start-4 animate-fade">
        <GaugeChartPerformance />
      </Box>
      <Box component="div" className="col-span-full row-start-auto flex gap-2">
        {/* <Paper
          elevation={4}
          className="w-full md:w-3/12 p-3 flex flex-col gap-3"
        >
          <Box component="article" className="flex gap-2 items-center w-full">
            <FontAwesomeIcon className="w-1/5" icon={{ iconName: 'chart-pie', prefix: 'fas' }} size="3x" color={theme.palette.primary.main} />
            <Box component="div" className="flex flex-col w-2/3">
              <Typography variant="body1" fontWeight="bold">Metrics</Typography>
            </Box>
            <Box component="div" className="w-1/5 h-full flex items-center">
              <IconButtonBg
                bgColors={theme.palette.primary.main}
                onClick={() => navigate('metrics', { replace: false })}
              >
                <ArrowForwardIos fontSize="large" />
              </IconButtonBg>
            </Box>
          </Box>
        </Paper> */}
      </Box>
    </Box>
  );
};

export default DashboardPage;