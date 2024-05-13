import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

interface Props {
  name: string,
  label: string,
  className?: string,
  disabled?: boolean,
  required?: boolean,
}

const CheckBoxHF = (props: Props) => {
  const {
    name,
    label,
    className,
    disabled,
    required
  } = props;
  const { control, formState: { errors } } = useFormContext();
  return (
    <Box component="div" className={`p-1 ${className}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field: { name: nameController, value, onChange } }) => (
          <FormControl
            error={!!errors[nameController]}
            component="fieldset"
          >
            <FormControlLabel
              control={
                <Checkbox
                  id={name}
                  name={name}
                  checked={value}
                  color="primary"
                  onChange={onChange}
                  disabled={disabled}
                  required={required}
                />
              }
              required={!!errors[nameController]}
              label={label}
            />
            {!!errors[nameController] && (
              <FormHelperText className="pl-24">
                {errors[nameController]?.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
};

export default CheckBoxHF;