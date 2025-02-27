import React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    'backgroundColor': '#44b700',
    'color': '#44b700',
    'boxShadow': `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

interface Props {
  colorPointer?: React.CSSProperties['color'],
  children: React.ReactElement | React.ReactElement[]
}

const AvatarBadge = ({ colorPointer = '#44b700', children }: Props) => {
  return (
    <StyledBadge
      sx={{
        '& .MuiBadge-badge': {
          'backgroundColor': colorPointer,
          'color': colorPointer,
        }
      }}
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      {children}
    </StyledBadge>
  );
};

export default AvatarBadge;