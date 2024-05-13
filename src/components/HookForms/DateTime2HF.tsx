import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import * as Yup from 'yup';
import { DateTimeValidationError, DateTimePicker } from '@mui/x-date-pickers';

interface Props {
  name: string,
  label: string,
  disablePast?: boolean,
  disableFuture?: boolean,
  className?: string,
  autoFocus?: boolean,
  disabled?: boolean,
  required?: boolean,
  zIndexDialog?: number,
  format?: string,
  maxDate?: Date | string | moment.Moment | Yup.Maybe<moment.Moment>,
  minDate?: Date | string | moment.Moment | Yup.Maybe<moment.Moment>,
}

const DateTime2HF = (props: Props) => {
  const {
    name,
    className,
    label,
    disablePast,
    disableFuture,
    autoFocus,
    disabled,
    required,
    zIndexDialog,
    format = 'YYYY-MM-DD hh:mm A',
    maxDate,
    minDate
  } = props;
  const { control, formState: { errors } } = useFormContext();
  const [error, setError] = React.useState<DateTimeValidationError | null>(null);
  
  return (
    <React.Fragment>
      <Box component="div" className={`my-1 mx-1 ${className}`}>
        <Controller
          control={control}
          name={name}
          defaultValue={moment()}
          render={({ field: { onChange, value, name: nameController } }) => (
            <FormControl
              error={!!errors[nameController]}
              component="fieldset"
              required={required}
              fullWidth
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  format={format}
                  value={value}
                  label={`${label}${required ? ' *' : ''}`}
                  name={nameController}
                  onChange={(newValue) => onChange(moment(newValue))}
                  disablePast={disablePast}
                  disableFuture={disableFuture}
                  autoFocus={autoFocus}
                  maxDate={maxDate && moment(maxDate)}
                  minDate={minDate && moment(minDate)}
                  disabled={disabled}
                  onError={(newError) => setError(newError)}
                  slotProps={{
                    textField: {
                      className: 'text-center',
                    },
                    popper: {
                      sx: { zIndex: zIndexDialog && `${zIndexDialog} !important` }
                    },
                    dialog: {
                      sx: { zIndex: zIndexDialog && `${zIndexDialog} !important` }
                    },
                    field: {
                      className: errors[nameController] ? 'border border-danger rounded' : '',
                    }
                  }}
                />
              </LocalizationProvider>
              {!!errors[nameController] && (
                <FormHelperText className="pl-24">
                  {errors[nameController]?.message?.toString()}
                </FormHelperText>
              )}
            </FormControl>
          )
          }
        />
      </Box >
    </React.Fragment>
  );
};

export default DateTime2HF;