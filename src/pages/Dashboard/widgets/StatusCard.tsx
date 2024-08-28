import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@wms/components';
import { v4 as uuid } from 'uuid';

interface IProps {
  title: string,
  count: number,
  color: 'danger' | 'warning' | 'success',
  comment?: string
}

const StatusCard: React.FC<IProps> = (props) => {
  const { title, count, color, comment } = props;

  const getFormat = (state: 'danger' | 'warning' | 'success') => {
    return {
      textColor: state === 'success' ? 'text-emerald-500' : state === 'warning' ? 'text-orange-500' : 'text-red-500',
      bgColor: state === 'success' ? 'bg-emerald-500' : state === 'warning' ? 'bg-orange-500' : 'bg-red-500',
      iconPorcent: state === 'success' ? 'circle-check' : state === 'warning' ? 'circle-exclamation' : 'triangle-exclamation',
      iconMain: state === 'success' ? 'award' : state === 'warning' ? 'clock' : 'triangle-exclamation',
    };
  };

  return (
    <React.Fragment>
      <Paper className="mt-2 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4" elevation={3} key={uuid()}>
        <div className="relative flex flex-col min-w-0 break-words rounded mb-3 xl:mb-0">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 className="text-blueGray-400 uppercase font-bold text-xs">{title}</h5>
                {/* <span className="font-semibold text-3xl text-blueGray-700">{new Intl.NumberFormat('en-us', { maximumSignificantDigits: 2 }).format(count || 0)}</span> */}
                <CountUp start={0} end={count} delay={0}>
                  {({ countUpRef }) => (
                    <span ref={countUpRef} className="font-semibold text-3xl text-blueGray-700" />
                  )
                  }
                </CountUp>
              </div>
              <div className="relative w-auto pl-4 flex-initial">
                <div className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${getFormat(color).bgColor}`}>
                  <FontAwesomeIcon iconLabel={getFormat(color).iconMain} size="2x" />
                </div>
              </div>
            </div>
            <p className="text-sm text-blueGray-400 mt-4">
              <span className={`${getFormat(color).textColor} mr-2 flex items-center gap-1`}>
                <FontAwesomeIcon iconLabel={getFormat(color).iconPorcent} />
                <Typography variant="caption">{comment?.toUpperCase() || 'COMPLETED'}</Typography>
                {/* {new Intl.NumberFormat('en-us', { maximumSignificantDigits: 2 }).format(count)}% */}
              </span>
              {/* <span className="whitespace-nowrap"> Percent Completed </span> */}
            </p>
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

export default StatusCard;