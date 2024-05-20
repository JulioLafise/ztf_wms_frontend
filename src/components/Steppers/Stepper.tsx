import React from 'react';
import {
  Stepper as MuiStepper,
  Stack,
  StepLabel,
  Step,
  StepConnector,
  stepConnectorClasses,
  styled,
  type StepIconProps,
  type Orientation
} from '@mui/material';
import { Check } from '@mui/icons-material';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // borderColor: '#784af4',
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // borderColor: '#784af4',
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    'color': theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    'display': 'flex',
    'height': 22,
    'alignItems': 'center',
    ...(ownerState.active && {
      // color: '#784af4',
      color: theme.palette.primary.main,
    }),
    '& .QontoStepIcon-completedIcon': {
      // color: '#784af4',
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 22,
    },
    '& .QontoStepIcon-circle': {
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}


interface IProps {
  steps: StepsProps[],
  activeStep?: number | undefined,
  orientation?: Orientation | undefined
}

type StepsProps = { label: string };

const Stepper: React.FC<IProps> = (props) => {
  const { steps, activeStep, orientation } = props;
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <MuiStepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} orientation={orientation}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{step.label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </Stack>
  );
};

export default Stepper;