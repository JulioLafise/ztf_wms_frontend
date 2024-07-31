import React from 'react';
import { Box } from '@mui/material';
import {
  useMonitorActivity,
  useAlertNotification,
  useToastNotification,
  useAuth,
  useUI,
} from '@wms/hooks';
import { LocalStorageConfig, enviroment as config } from '@wms/config';
import MonitorContext from '../context/MonitorContext';

interface IMonitorProviderProps {
  children: React.ReactElement | React.ReactElement[],
}

const MonitorProvider: React.FC<IMonitorProviderProps> = (props) => {
  const { children } = props;
  const { isActive, interval, lastTime } = useMonitorActivity();
  const [seconds, setSeconds] = React.useState<number>(0);
  const [isLogout, setIsLogout] = React.useState<boolean>(false);
  const { swalToastInfo, swalToastWarn } = useAlertNotification();
  const { toastInfo } = useToastNotification();
  const { onSignOut } = useAuth();
  const { onDarkMode } = useUI();
  const secondsAllowed = config.minutesInactive * 60;

  React.useEffect(() => {
    // console.log(interval);
    if (!isActive) {
      const warnNotificationSeconds = secondsAllowed - seconds;
      if (warnNotificationSeconds === 900) {
        swalToastWarn('User Inactivity', {
          message: 'Your session expired in 15 minutes due to inactivity',
          showConfirmButton: true,
          confirmButtonText: 'OK'
        });
      }
      if (seconds > secondsAllowed) {
        if (!isLogout) {
          setIsLogout(true);
          LocalStorageConfig.removeItem('rftk');
          swalToastInfo('Session Expired', {
            message: 'Your session has expired',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          }).then(result => {
            if (result.isConfirmed) {
              setIsLogout(false);
              onDarkMode(false, true);
              onSignOut();
              toastInfo('Your session has expired', { duration: 4000, mode: 'light' });
            }
          });
        }
      } else {
        setSeconds(prevState => prevState + 1);
      }
    } else setSeconds(0);
  }, [isActive, interval]);

  return (
    <MonitorContext.Provider value={{ isActive, lastTime, isLogout }}>
      {
        isLogout && (
          <Box component="div" className="absolute w-[100vw] h-[100vh]" sx={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: '99991 !important' }} /> 
        )
      }      
      {children}     
    </MonitorContext.Provider>
  );
};

export default MonitorProvider;