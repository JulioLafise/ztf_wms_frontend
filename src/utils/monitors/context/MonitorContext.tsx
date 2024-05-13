import React from 'react';
import moment from 'moment';

export interface IMonitorContext {
  isActive: boolean,
  lastTime: moment.Moment,
  isLogout: boolean
}

const defaultValues: IMonitorContext = {
  isActive: false,
  lastTime: moment(),
  isLogout: false
};

const MonitorContext = React.createContext<IMonitorContext>(defaultValues);

export default MonitorContext;