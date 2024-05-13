import {
  Box,
  FormControl,
  FormHelperText,
  Typography
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { ColorPicker } from '../';

interface Props {
  label: string,
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom',
  variant?: 'body1' | 'body2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'overline',
  name: string,
  className?: string,
  colors: IColors,
  defaultValue?: IDefaultValue,
  required?: boolean
  disabled?: boolean
}

type IColors = Array<React.CSSProperties['backgroundColor']>;
// type IDefaultValue<KeyType extends IColors> = keyof KeyType;
type IDefaultValue = React.CSSProperties['backgroundColor'];

const ColorPickerHF = (props: Props) => {
  const {
    name,
    label,
    labelPlacement = 'start',
    className,
    disabled,
    required,
    colors,
    variant = 'caption',
    defaultValue,
  } = props;
  const { control, formState: { errors } } = useFormContext();

  const getLabelOrientation = (placement: string) => {
    if (placement === 'start') return 'flex-row';
    if (placement === 'end') return 'flex-row-reverse';
    if (placement === 'top') return 'flex-col';
    if (placement === 'bottom') return 'flex-col-reverse';
    return 'flex-row';
  };
  return (
    <Box component="div" className={`p-1 ${className}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { name: nameController, value, onChange } }) => (
          <FormControl
            error={!!errors[nameController]}
            component="fieldset"
            required={required}
          >
            <Box component="section" className={`flex ${getLabelOrientation(labelPlacement)} gap-2 items-center`} >
              <Typography variant={variant}>{label}{required ? ' *' : ''}</Typography>
              <ColorPicker
                name={nameController}
                colors={colors}
                onColorSelect={(color) => onChange(color)}
                value={value}
                disabled={disabled}
              />
            </Box>
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

export default ColorPickerHF;