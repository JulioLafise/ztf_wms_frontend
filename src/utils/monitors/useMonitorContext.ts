import React from 'react';
import MonitorContext, { type IMonitorContext } from './context/MonitorContext';


export const useMonitorContext = () => React.useContext<IMonitorContext>(MonitorContext);
export { default as MonitorProvider } from './provider/MonitorProvider';