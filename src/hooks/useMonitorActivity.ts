import React from 'react';
import { fromEvent, merge } from 'rxjs';
import moment from 'moment';
import { useAuth } from './';

type EventsListener = Array<keyof WindowEventMap>;

// ... Add events here ...
const events: EventsListener = [
  'mousedown',
  'mousemove',
  'mouseenter',
  'wheel',
  'keydown',
  'touchstart',
  'scroll'
];

const INTERVAL_TIME = 1000;

const useMonitorActivity = (intervalNumber = INTERVAL_TIME) => {
  const [seconds, setSeconds] = React.useState<number>(0);
  const lastEvent = React.useRef<moment.Moment>(moment());

  const wasActiveRef = React.useRef(false);
  const { isAuthenticated } = useAuth();

  // ...Observable Events...
  const eventStreams = events.map(ev => fromEvent(window, ev));
  const allEvents$ = merge(...eventStreams);

  // ...Events listener...
  allEvents$.subscribe((ev) => {
    lastEvent.current = moment();
  });

  // ...Intervals of comprobations...
  React.useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, intervalNumber);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isAuthenticated, intervalNumber]);

  // ...Validate is Active...
  React.useEffect(() => {
    const secondDiff = moment().diff(lastEvent.current, 'second');
    if (secondDiff > 0) {
      wasActiveRef.current = false;
    } else {
      wasActiveRef.current = true;
    }
  }, [seconds]);


  return {
    isActive: wasActiveRef.current,
    interval: seconds,
    lastTime: lastEvent.current
  };

};

export default useMonitorActivity;