import React from 'react';
import { InputMask, type InputMaskProps } from '@react-input/mask';


export const TelephoneInputMask = React.forwardRef<HTMLInputElement, InputMaskProps>((props, ref) =>
  <InputMask
    {...props}
    ref={ref}
    mask="____-____"
    // pattern="[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
    replacement={{ _: /\d/ }}
    // placeholder={'0000-0000'}
    // showMask
  />
);

export const IdentificationCardInputMask = React.forwardRef<HTMLInputElement, InputMaskProps>((props, ref) =>
  <InputMask
    {...props}
    ref={ref}
    mask="___-______-____a"
    // pattern="[/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /[A-Za-z]/]"
    replacement={{ _: /\d/, a: /[A-Z]/ }}
    // placeholder={'000-000000-0000Y'}
    // separate
    // showMask
  />
);

export const RUCInputMask = React.forwardRef<HTMLInputElement, InputMaskProps>((props, ref) =>
  <InputMask
    {...props}
    ref={ref}
    mask="a_____________]"
    // pattern="[/[A-Z]/i, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
    replacement={{ _: /\d/, a: /[A-Z]/i }}
    // placeholder={'J0000000000000'}
    // showMask
  />
);

export const TimerInputMask = React.forwardRef<HTMLInputElement, InputMaskProps>((props, ref) =>
  <InputMask
    {...props}
    ref={ref}
    mask="hs:ms"
    // pattern="[/[1,2,0]/, /[0-9]/, ':', /[1,2,3,4,5,6]/, /[0-9]/]"
    replacement={{ h: /[1,2,0]/, m: /[1,2,3,4,5,6]/, s: /[0-9]/ }}
    // placeholder={'hh:mm'}
    // // placeholder={'\u2000'}
    // showMask
  />
);

export const DateInputMask = React.forwardRef<HTMLInputElement, InputMaskProps>((props, ref) =>
  <InputMask
    {...props}
    ref={ref}
    mask="yyyy-ms-dd"
    // pattern="[/[1,2,0]/, /[0-9]/, ':', /[1,2,3,4,5,6]/, /[0-9]/]"
    replacement={{ m: /[0,1]/, s: /[0-9]/, y: /[0-9]/, d: /[0-9]/ }}
    // placeholder={'YYYY-MM-DD'}
    // showMask
  />
);

export const PassportInputMask = React.forwardRef<HTMLInputElement, InputMaskProps>((props, ref) =>
  <InputMask
    {...props}
    ref={ref}
    mask="______________"
    // pattern="[/./, /./, /./, /./, /./, /./, /./, /./, /./, /./, /./, /./, /./, /./]"
    replacement={{ _: /./ }}
    // placeholder={'\u2000'}
    showMask
  />
);

export const CirculationInputMask = React.forwardRef<HTMLInputElement, InputMaskProps>((props, ref) =>
  <InputMask
    {...props}
    ref={ref}
    mask="a_______"
    // pattern="[/[A-Z]/i, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
    replacement={{ _: /\d/, a: /[A-Z]/i }}
    // placeholder={'\u2000'}
    showMask
  />
);

export const ResidentInputMask = React.forwardRef<HTMLInputElement, InputMaskProps>((props, ref) =>
  <InputMask
    {...props}
    ref={ref}
    mask="['R', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]"
    // replacement={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /[A-Za-z]/]}
    // placeholder={'\u2000'}
    showMask
  />
);