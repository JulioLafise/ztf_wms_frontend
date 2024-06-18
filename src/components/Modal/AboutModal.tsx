import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { enviroment } from '@wms/config';
import SimpleModal from './SimpleModal';

interface IAboutModalProps {
  isOpen: boolean,
  onClose: () => void,
}

const AboutModal: React.FC<IAboutModalProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <SimpleModal sx={{ width: 550 }} isOpen={isOpen} onClose={onClose} title="About" >
      <Box component="div" className="flex flex-col gap-2 pt-2">
        <Box component="article" className="flex flex-col">
          <Box component="div" className="flex gap-3 flex-wrap items-center justify-center text-green-800 pb-3">
            <Box component="div" className="flex items-center p-1 rounded"><img src="/img/olpc_color_logotype.png" width={200} /></Box>
            <Box component="div" className="flex items-center p-1 rounded bg-white"><img src="/img/logo.png" width={80} /></Box>
            <Box>
              <Typography variant="h4" fontWeight="bold" fontSize={35}>LAFISE</Typography>
              <Typography variant="h4" fontWeight="bold" fontSize={35}>GROUP</Typography>
            </Box>
          </Box>
          <Divider variant="inset" />
          <Box component="div" className="flex flex-col pt-2">
            <Typography variant="h6" fontSize={15}>{enviroment.appName}</Typography>
            <Typography variant="subtitle2" fontSize={12}>Version {enviroment.appVersion}</Typography>
            <Typography variant="caption">© 2024 {enviroment.appCopyright}</Typography>
            <Typography variant="caption">All rights reserved</Typography>
          </Box>
        </Box>
      </Box>
    </SimpleModal>
  );
};

export default AboutModal;