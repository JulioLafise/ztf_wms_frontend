import React from 'react';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';
import { TextField, type TextFieldProps } from '@mui/material';


export const PercentNumberFormat = React.forwardRef<HTMLInputElement, NumericFormatProps>((props, ref) => {
  const { onChange, ...rest } = props;
  return (
    <NumericFormat
      {...rest}
      getInputRef={ref}
      // customInput={TextField}
      thousandSeparator
      suffix="%"
      valueIsNumericString
      decimalScale={2}
      allowNegative={false}
      onValueChange={(values, { event }) => {
        onChange && onChange(
          Object.assign({} as React.ChangeEvent<HTMLInputElement>, event, {
            target: {
              name: rest.name,
              value: values.floatValue
            }
          })
        );
      }}
    />
  );
});


export const DecimalNumberFormat = React.forwardRef<HTMLInputElement, NumericFormatProps>((props, ref) => {
  const { onChange, suffix, ...rest } = props;
  return (
    <NumericFormat
      {...rest}
      getInputRef={ref}
      valueIsNumericString
      suffix={suffix || undefined}
      thousandSeparator=","
      decimalSeparator="."
      decimalScale={2}
      allowNegative={false}
      onValueChange={(values, { event }) => {
        onChange && onChange(
          Object.assign({} as React.ChangeEvent<HTMLInputElement>, event, {
            target: {
              name: rest.name,
              value: values.value
            }
          })
        );
      }}
    />
  );
});


export const IntegerNumberFormat = React.forwardRef<HTMLInputElement, NumericFormatProps>((props, ref) => {
  const { onChange, suffix, ...rest } = props;
  return (
    <NumericFormat
      {...rest}
      getInputRef={ref}
      valueIsNumericString
      suffix={suffix || undefined}
      thousandSeparator
      decimalScale={0}
      allowNegative={false}
      onValueChange={(values, { event }) => {
        onChange && onChange(
          Object.assign({} as React.ChangeEvent<HTMLInputElement>, event, {
            target: {
              name: rest.name,
              value: values.floatValue
            }
          })
        );
      }}
    />
  );
});


export const IntegerNumberFormatWithoutThousandSeparator = React.forwardRef<HTMLInputElement, NumericFormatProps>((props, ref) => {
  const { onChange, suffix, ...rest } = props;
  return (
    <NumericFormat
      {...rest}
      getInputRef={ref}
      valueIsNumericString
      suffix={suffix || undefined}
      decimalScale={0}
      allowNegative={false}
      onValueChange={(values, { event }) => {
        onChange && onChange(
          Object.assign({} as React.ChangeEvent<HTMLInputElement>, event, {
            target: {
              name: rest.name,
              value: values.floatValue
            }
          })
        );
      }}
    />
  );
});


export const SimpleNumberFormat = React.forwardRef<HTMLInputElement, NumericFormatProps>((props, ref) => {
  const { onChange, ...rest } = props;
  return (
    <NumericFormat
      {...rest}
      getInputRef={ref}
      valueIsNumericString
      decimalScale={0}
      allowNegative={false}
      allowLeadingZeros
      onValueChange={(values, { event }) => {
        onChange && onChange(
          Object.assign({} as React.ChangeEvent<HTMLInputElement>, event, {
            target: {
              name: rest.name,
              value: values.floatValue
            }
          })
        );
      }}
    />
  );
});