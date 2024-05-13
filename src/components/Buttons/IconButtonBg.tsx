import React from 'react';
import { IconButton as IconButtonMUI, styled, IconButtonProps } from '@mui/material';

const IconButton = styled(IconButtonMUI)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.light
  },
  'backgroundColor': theme.palette.primary.dark
}));

interface IProps extends IconButtonProps {
  bgColors?: React.CSSProperties['color'],
  bgColorsHover?: React.CSSProperties['color'],
}

const IconButtonBg = React.forwardRef<HTMLButtonElement, IProps>((props, ref) => {
  const {
    bgColors,
    bgColorsHover,
    sx,
    ...rest
  } = props;

  return (
    <IconButton
      ref={ref}
      sx={{
        ...sx,
        'bgcolor': bgColors,
        '&:hover': {
          backgroundColor: bgColorsHover
        },
      }}
      {...rest}
    />
  );
});

export default IconButtonBg;