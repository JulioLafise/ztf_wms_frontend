import React from 'react';
import {
  Autocomplete,
  AutocompleteOwnerState,
  AutocompleteRenderOptionState,
  Box,
  CircularProgress,
  InputAdornment,
  TextField
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { FontAwesomeIcon } from '..';

interface RenderOptionProps<T> extends React.HTMLAttributes<T> {
  key?: any
}

interface Props<T> {
  name: string,
  icon?: string,
  defaultValues?: Array<any> | null,
  label: string,
  placeholder?: string,
  optionsData: Array<T>,
  isOptionEqualToValue?: ((option: T, value: T) => boolean) | undefined,
  getOptionLabel: (option: T) => string,
  renderOption?: (props: RenderOptionProps<HTMLLIElement>, option: T, state: AutocompleteRenderOptionState, ownerState: AutocompleteOwnerState<T, false, boolean, false, 'div'>) => React.ReactNode,
  size?: 'small' | 'medium',
  variant?: 'filled' | 'outlined' | 'standard',
  readOnly?: boolean,
  className?: string,
  autoFocus?: boolean,
  loading?: boolean,
  loadingText?: string,
  disabled?: boolean,
  disableClearable?: boolean,
  disablePortal?: boolean,
  required?: boolean,
  margin?: 'none' | 'dense' | 'normal',
  colorOption?: keyof T
}

const AutoCompleteHF = <T,>(props: Props<T>) => {
  const {
    name,
    icon,
    className,
    defaultValues,
    label,
    placeholder,
    size,
    variant = 'outlined',
    readOnly = false,
    optionsData,
    isOptionEqualToValue,
    getOptionLabel,
    renderOption,
    loading,
    loadingText,
    disabled,
    disableClearable,
    disablePortal,
    required,
    margin = 'none',
    colorOption
  } = props;
  const { control, formState: { errors } } = useFormContext();
  return (
    <Box component="div" className={`p-1 ${className}`}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValues || null}
        render={({ field: { onChange, value, name: nameController } }) => (
          <>
            <Autocomplete
              id={nameController}
              options={optionsData}
              disabled={disabled}
              isOptionEqualToValue={(option: any) => isOptionEqualToValue && isOptionEqualToValue(option, value) || (option?.id === value?.id)}
              getOptionLabel={getOptionLabel}
              renderOption={renderOption}
              disablePortal={disablePortal}
              fullWidth
              size={size}
              onChange={(_event, data) => onChange(data)}
              value={value}
              loading={loading}
              loadingText={loadingText}
              disableClearable={disableClearable}
              noOptionsText="Options not available"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  size={size}
                  placeholder={placeholder}
                  error={!!errors[nameController]}
                  helperText={errors[nameController]?.message?.toString()}
                  variant={variant}
                  required={required}
                  margin={margin}
                  fullWidth
                  InputProps={{
                    readOnly: readOnly,
                    ...params.InputProps,
                    startAdornment: icon ? (
                      <InputAdornment position="start" className="pl-8">
                        <FontAwesomeIcon
                          color={errors[name] ? '#f44336' : (colorOption && value) ? value[String(colorOption)] : ''}
                          iconLabel={icon}
                        />
                      </InputAdornment>
                    ) : (
                      null
                    ),
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="secondary" size={20} thickness={5} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    )
                  }}
                />
              )}
            />
            {/* {console.log(value)} */}
          </>
        )}
      />
    </Box>
  )
};

export default AutoCompleteHF;