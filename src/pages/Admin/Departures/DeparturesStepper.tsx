import React from 'react';
import { Paper, useMediaQuery, Theme } from '@mui/material';
import { ArrowBack, ArrowForward, ExitToApp } from '@mui/icons-material';
import { Stepper, ButtonActions } from '@wms/components';
import { useUI } from '@wms/hooks';
import HeaderDeparture from './Steps/HeaderDeparture';
import DetailDeparture from './Steps/DetailDeparture';

const DeparturesStepper = () => {
  const { isSideBarOpen } = useUI();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const [activeStep, setActiveStep] = React.useState(0);
  const previousStep = () => setActiveStep(prevState => prevState - 1);
  const nextStep = () => setActiveStep(prevState => prevState + 1);
  const steps = React.useMemo(() => [
    { label: 'Departure' },
    { label: 'Detail Departure' },
    { label: 'Summary Departure' },
  ], []);
  const ComponentStep = (step: number) => {
    switch (step) {
      case 1:
        return (<DetailDeparture />);

      case 2:

        return (<>Summary</>);

      case 3:

        return (<>Report</>);

      default:
        return (<HeaderDeparture />);
    }
  };
  return (
    <React.Fragment>
      <Stepper
        activeStep={activeStep}
        steps={steps}
      />
      <Paper elevation={0} sx={{ mt: 2 }}>
        {ComponentStep(activeStep)}
        <ButtonActions
          title="Previous"
          onClick={previousStep}
          disabled={activeStep === 0}
          ComponentIcon={<ArrowBack />}
          ubication={isMobile ? { left: 50 } : { bottom: 99, left: isSideBarOpen ? 280 : 99 }}
        />
        {
          activeStep != steps.length
            ? (
              <ButtonActions
                title="Next"
                onClick={nextStep}
                ComponentIcon={<ArrowForward />}
                ubication={isMobile ? {} : { bottom: 99, right: 99 }}
              />
            )
            : (
              <ButtonActions
                title="Finish"
                // onClick={nextStep}
                ComponentIcon={<ExitToApp />}
                ubication={isMobile ? {} : { bottom: 99, right: 99 }}
              />
            )
        }
      </Paper>
    </React.Fragment>
  );
};

export default DeparturesStepper;