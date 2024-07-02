import React from 'react';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import * as Mask from '../Mask/MaskInput';
import * as Number from '../Mask/NumberFormat';

interface IProps {
  name: string,
  label: string,
  placeholder?: string,
  className?: string,
  margin?: 'dense' | 'none' | 'normal',
  disabled?: boolean,
  readOnly?: boolean,
  icon?: React.ReactNode,
  onClickIcon?: React.MouseEventHandler<HTMLButtonElement>,
  textIcon?: string,
  size?: 'small' | 'medium',
  variant?: 'filled' | 'outlined' | 'standard',
  rows?: number | string,
  maxLength?: number,
  type?: 'email' | 'password' | 'file' | 'text' | 'tel',
  isPassword?: boolean,
  required?: boolean,
  capitalized?: 'upper' | 'lower' | 'normal',
  mask?: TypeInputMask
}

interface OptionRowsProps extends IProps { rows?: number | string, maxLength?: never }
interface OptionMaxRowProps extends IProps { rows?: never, maxLength?: number }
type TypeInputMask = 'phone' | 'ruc' | 'passport' | 'identification' | 'resident' | 'circulation' | 'integer' | 'decimal' | 'timer' | 'percent' | 'integer2'

const TextFieldHF: React.FC<OptionRowsProps | OptionMaxRowProps> = (props) => {
  const {
    name,
    label,
    placeholder,
    className,
    margin = 'none',
    disabled,
    variant = 'outlined',
    maxLength,
    rows,
    type = 'text',
    isPassword,
    required,
    readOnly,
    icon,
    onClickIcon,
    textIcon,
    size,
    capitalized = 'normal',
    mask
  } = props;
  const { control, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const onClickShowPassword = () => setShowPassword((show) => !show);
  const capitalizedFn = (values: string) => (
    capitalized === 'upper' ? values.toUpperCase() : capitalized === 'lower' ? values.toLowerCase() : values
  );

  const getInputMask = (_mask?: TypeInputMask) => {
    switch (_mask) {
      case 'phone':
        return Mask.TelephoneInputMask;
      case 'ruc':
        return Mask.RUCInputMask;
      case 'passport':
        return Mask.PassportInputMask;
      case 'circulation':
        return Mask.CirculationInputMask;
      case 'resident':
        return Mask.ResidentInputMask;
      case 'integer':
        return Number.IntegerNumberFormat;
      case 'decimal':
        return Number.DecimalNumberFormat;
      case 'percent':
        return Number.PercentNumberFormat;
      case 'timer':
        return Mask.TimerInputMask;
      case 'integer2':
        return Number.IntegerNumberFormatWithoutThousandSeparator;
      case 'identification':
        return Mask.IdentificationCardInputMask;
      default:
        return undefined;
    }
  };

  return (
    <Box component="div" className={`p-1 ${className}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={''}
        render={({ field: { name: nameController, onChange, value } }) => (
          <TextField
            name={nameController}
            label={label}
            placeholder={placeholder}
            onChange={onChange}
            value={capitalizedFn(value)}
            margin={margin}
            disabled={disabled}
            variant={variant}
            type={isPassword ? showPassword ? 'text' : 'password' : type}
            size={size}
            rows={rows}
            maxRows={maxLength}
            minRows={maxLength && 1}
            multiline={!!rows}
            fullWidth
            required={required}
            error={!!errors[name]}
            helperText={errors[name]?.message?.toString()}
            InputProps={{
              inputComponent: getInputMask(mask),
              readOnly: readOnly,
              endAdornment: icon
                ? (
                  <InputAdornment position="end">
                    {
                      isPassword && (
                        <IconButton
                          aria-label="password"
                          onClick={onClickShowPassword}
                        >
                          {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                        </IconButton>
                      )
                    }
                    <IconButton
                      aria-label={textIcon}
                      onClick={onClickIcon}
                    >
                      {icon}
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <>
                    {
                      isPassword && (
                        < InputAdornment position="end" >

                          <IconButton
                            aria-label="password"
                            onClick={onClickShowPassword}
                          >
                            {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  </>
                )
            }}
          />
        )}
      />
    </Box>
  );
};

export default TextFieldHF;