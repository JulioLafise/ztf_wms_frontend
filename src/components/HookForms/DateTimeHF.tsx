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
import { DateValidationError, MobileDatePicker, DateTimeField } from '@mui/x-date-pickers';

interface Props {
  name: string,
  label: string,
  disablePast?: boolean,
  disableFuture?: boolean,
  className?: string,
  autoFocus?: boolean,
  disabled?: boolean,
  zIndexDialog?: number,
  format?: string,
  required?: boolean,
  maxDate?: Date | string | moment.Moment | Yup.Maybe<moment.Moment>,
  minDate?: Date | string | moment.Moment | Yup.Maybe<moment.Moment>,
}

const DateTimeHF = (props: Props) => {
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
    format = 'YYYY-MM-DD',
    maxDate,
    minDate
  } = props;
  const { control, formState: { errors } } = useFormContext();
  const [error, setError] = React.useState<DateValidationError | null>(null);
  
  return (
    <React.Fragment>
      <Box component="div" className={`p-1 ${className}`}>
        <Controller
          control={control}
          name={name}
          defaultValue={moment()}
          render={({ field: { onChange, value, name: nameController } }) => (
            <FormControl
              error={!!errors[nameController]}
              component="fieldset"
              fullWidth
              required={required}
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  format={format}
                  value={value}
                  label={label}
                  name={nameController}
                  onChange={(newValue) => onChange(moment(newValue))}
                  disablePast={disablePast}
                  disableFuture={disableFuture}
                  autoFocus={autoFocus}
                  disabled={disabled}
                  maxDate={maxDate && moment(maxDate)}
                  minDate={minDate && moment(minDate)}
                  onError={(newError) => setError(newError)}
                  closeOnSelect
                  slotProps={{
                    textField: {
                      className: 'text-center',
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

export default DateTimeHF;