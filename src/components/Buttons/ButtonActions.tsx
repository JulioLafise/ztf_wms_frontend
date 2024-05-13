import React, { ReactElement, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import { Fab, PropTypes, Tooltip, Zoom } from '@mui/material';

interface Props {
  title: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  ComponentIcon?: ReactElement,
  children?: ReactElement | ReactElement[] | boolean,
  typeSubmit?: 'button' | 'reset' | 'submit',
  disabled?: boolean,
  color?: PropTypes.Color | 'success' | 'error' | 'info' | 'warning' | undefined,
  ubication?: ILocation,
  variant?: 'extended' | 'circular',
  size?: 'small' | 'medium' | 'large',
  timeIn?: number
}

type ILocation = {
  top?: number | 'auto',
  bottom?: number | 'auto',
  left?: number | 'auto',
  right?: number | 'auto',
}

const ButtonActions = (props: Props) => {
  const {
    title,
    onClick,
    ComponentIcon,
    typeSubmit,
    disabled,
    color,
    ubication,
    variant,
    size,
    children,
    timeIn
  } = props;
  const transitionDuration = {
    enter: 350,
    exit: 250,
    appear: 350
  };
  const [appState, setAppState] = React.useState(false);

  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(setTimeout(() => { setAppState(true); }, timeIn || 400));
    });
  }, []);
  return (
    <Tooltip title={title} components={{}}>
      <Zoom
        timeout={transitionDuration}
        in={appState}
        style={{
          transitionDelay: `${100}ms`, animation: 'ease-in'
        }}
        unmountOnExit
      >
        <Fab
          aria-label={title}
          variant={variant}
          size={size}
          type={typeSubmit || 'button'}
          color={color || 'primary'}
          disabled={disabled}
          style={{
            position: 'fixed',
            bottom: ubication?.bottom || 50,
            right: ubication?.right || 50,
            left: ubication?.left || 'auto',
            top: ubication?.top || 'auto',
          }}
          onClick={onClick}
        >
          {ComponentIcon || <Add />}
          {children}
        </Fab>
      </Zoom>
    </Tooltip>
  );
};

export default ButtonActions;