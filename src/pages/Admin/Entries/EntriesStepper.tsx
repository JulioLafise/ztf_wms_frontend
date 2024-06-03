import React from 'react';
import { Paper, useMediaQuery, Theme } from '@mui/material';
import { ArrowBack, ArrowForward, ExitToApp, Task } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Stepper, ButtonActions } from '@wms/components';
import { useUI } from '@wms/hooks';
import HeaderEntry from './Steps/HeaderEntry';
import DetailEntry from './Steps/DetailEntry';

const DeparturesStepper = () => {
  const { isSideBarOpen } = useUI();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const [activeStep, setActiveStep] = React.useState(0);
  const previousStep = () => setActiveStep(prevState => prevState - 1);
  const nextStep = () => setActiveStep(prevState => prevState + 1);
  const steps = React.useMemo(() => [
    { label: 'Entry' },
    { label: 'Detail Entry' },
    { label: 'Report Entry' },
  ], []);
  const ComponentStep = (step: number) => {
    switch (step) {
      case 1:
        return (<DetailEntry />);

        // case 2:
        //   return (<>Summary</>);

      case 2:
        return (<>Report</>);

      default:
        return (<HeaderEntry />);
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
          ComponentIcon={<ArrowBack color={activeStep === 0 ? 'disabled' : 'inherit'} />}
          ubication={isMobile ? { left: 50 } : { bottom: 99, left: isSideBarOpen ? 280 : 99 }}
        />
        <ButtonActions
          title="Exit"
          onClick={() => navigate('/app/inventory/departures', { replace: true })}
          ComponentIcon={<ExitToApp />}
          ubication={isMobile ? { left: 90 } : { bottom: 99, left: isSideBarOpen ? 351 : 170 }}
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
                ComponentIcon={<Task />}
                ubication={isMobile ? {} : { bottom: 99, right: 99 }}
              />
            )
        }
      </Paper>
    </React.Fragment>
  );
};

export default DeparturesStepper;