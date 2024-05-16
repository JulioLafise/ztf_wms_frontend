import React from 'react';
import {
  Box,
  Modal,
  SxProps,
  Typography,
  Backdrop,
  Fade,
  Divider,
  styled
} from '@mui/material';

const style: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const BoxModal = styled(Box)(({ theme }) => ({
  width: 400,
  [theme.breakpoints.down(414)]: {
    width: 'calc(100% - 10%)'
  },
}));

interface IProps {
  children: React.ReactElement,
  isOpen: boolean,
  onClose: () => void,
  className?: string,
  sx?: SxProps,
  title?: string,
  description?: string
}

const SimpleModal = (props: IProps) => {
  const {
    children,
    isOpen,
    onClose,
    className,
    sx,
    title,
    description,
  } = props;
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      // disablePortal
      sx={{ zIndex: '9999 !important', }}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <BoxModal
          sx={{
            ...style,
            ...sx,
          }}
          className={className}
        >
          {
            title && (<Typography id="modal-modal-title" variant="h4" component="h2">
              {title}
            </Typography>)
          }
          {
            description && (<Typography id="modal-modal-description" variant="body2" fontWeight="bold" fontSize={11} className="text-gray-500 pt-1">
              {description}
            </Typography>)
          }
          <Box component="section" className="w-1/6 pt-2 pb-4"><Divider variant="fullWidth" className="pt-1" sx={{ bgcolor: theme => theme.palette.primary.main }} /></Box>
          {children}
        </BoxModal>
      </Fade>
    </Modal>
  );
};

export default SimpleModal;