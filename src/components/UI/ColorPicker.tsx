import React from 'react';
import {
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from '@mui/material';

interface IProps {
  name?: string,
  colors: IColors,
  onColorSelect: (color: React.CSSProperties['backgroundColor']) => void | React.Dispatch<React.SetStateAction<React.CSSProperties['backgroundColor']>>,
  defaultValue?: IDefaultValue,
  value?: React.CSSProperties['backgroundColor'],
  disabled?: boolean
}

type IColors = Array<React.CSSProperties['backgroundColor']>;
// type IDefaultValue<KeyType extends IColors> = keyof KeyType;
type IDefaultValue = React.CSSProperties['backgroundColor'];

const ColorPicker: React.FC<IProps> = (props) => {
  const {
    name,
    colors,
    onColorSelect,
    defaultValue,
    value,
    disabled
  } = props;
  const [indexValue, setIndexValue] = React.useState<number>();

  React.useEffect(() => {
    setIndexValue(colors.indexOf(defaultValue) || 0);
  }, [defaultValue]);

  React.useEffect(() => {
    value && setIndexValue(colors.indexOf(value));
  }, [value]);

  return (
    <ToggleButtonGroup
      id={name}
      exclusive
      value={indexValue}
      size="small"
      disabled={disabled}
    >
      { 
        colors.map((color, index) => (
          <ToggleButton
            key={index}
            value={index}
            type="button"
            size="small"
            onClick={() => {setIndexValue(index); onColorSelect(color);}}
          >
            <Box component="div" className="rounded-full p-3" sx={{ backgroundColor: color }} />
          </ToggleButton>
        ))
      }
    </ToggleButtonGroup>
  );
};


export default ColorPicker;