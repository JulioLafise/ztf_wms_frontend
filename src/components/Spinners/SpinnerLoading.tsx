import React from 'react';
import { Box, CircularProgress, Theme, Typography } from '@mui/material';

interface Props {
  label?: string,
  size?: string | number,
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  fontSize?: string | number | ((theme: Theme) => string | number),
  typeProgress?: IProgress,
  height?: string | number
}

interface IProgress {
  variant: 'determinate' | 'indeterminate',
  value: number
}

const SpinnerLoading = (props: Props) => {
  const {
    label = 'Loading...',
    size = 150,
    color = 'primary',
    fontSize = 25,
    typeProgress = { variant: 'indeterminate', value: 0 },
    height = '100vh'
  } = props;
  return (
    <Box
      component="div"
      className="relative flex flex-nowrap items-center justify-center text-center"
      sx={{ height }}
    >
      <CircularProgress
        size={size}
        color={color}
        className=""
        title={label}
        variant={typeProgress.variant}
        value={typeProgress.value}
      />
      <Typography
        variant="h5"
        className={`absolute
        ${typeProgress.variant === 'determinate'
      ? ''
      : 'animate-fade animate-infinite animate-duration-[1500ms] animate-ease-in-out animate-alternate-reverse animate-fill-both'}
        `}
        textAlign="center"
        fontSize={fontSize}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default SpinnerLoading;
