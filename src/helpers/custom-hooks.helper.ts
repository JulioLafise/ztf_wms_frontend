import React from 'react';

export const useDidUpdateEffect =(fn: () => void, inputs: any[]) => {
  const isMountingRef = React.useRef(false);

  React.useEffect(() => {
    isMountingRef.current = true;
  }, []);

  React.useEffect(() => {
    if (!isMountingRef.current) {
      return fn();
    }
    isMountingRef.current = false;
    return () => { };
  }, inputs);
  
};