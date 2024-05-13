import {
  Box,
  Paper,
  Typography
} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { FontAwesomeIcon, IconButtonBg } from '@wms/components';
import {
  ChartPieVisit,
  CharBarsAnnualVisits,
  GaugeChartPerformance
} from './widgets';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <Box component="div" className="grid gap-3 grid-cols-12 grid-rows-auto">
      <Box component="div" className="col-span-12 col-start-1 row-start-1 animate-fade">
        <CharBarsAnnualVisits />
      </Box>
      <Box component="div" className="col-span-12 md:col-span-6 col-start-1 row-start-2 animate-fade">
        <ChartPieVisit />
      </Box>
      <Box component="div" className="col-span-12 md:col-span-6 col-start-1 row-start-3 md:row-start-2 animate-fade">
        <GaugeChartPerformance />
      </Box>
      <Box component="div" className="col-span-full row-start-auto flex gap-2">
        <Paper
          elevation={4}
          className="w-full md:w-3/12 p-3 flex flex-col gap-3"
        >
          <Box component="article" className="flex gap-2 items-center w-full">
            <FontAwesomeIcon className="w-1/5" icon={{ iconName: 'chart-pie', prefix: 'fas' }} size="3x" color="#668DC0" />
            <Box component="div" className="flex flex-col w-2/3">
              <Typography variant="body1" fontWeight="bold">Metrics</Typography>
            </Box>
            <Box component="div" className="w-1/5 h-full flex items-center">
              <IconButtonBg
                bgColors="#668DC0"
                onClick={() => navigate('metrics', { replace: false })}
              >
                <ArrowForwardIos fontSize="large" />
              </IconButtonBg>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardPage;