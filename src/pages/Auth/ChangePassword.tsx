import React from 'react';
import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  LoginRounded,
  KeyRounded,
  Person,
  PasswordRounded,
  LockResetRounded,
  ChangeCircle
} from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextFieldHF } from '@wms/components';
import { GeneratedData } from '@wms/helpers';
import { useAuth } from '@wms/hooks';

interface IProps {
  onSubmit: (_values: IDefaultValues) => void,
  isLoading: boolean,
  password: string
}

interface IDefaultValues {
  username: string,
  password: string,
  newPassword: string,
  repeatPassword: string
}

const schemaValidation: Yup.ObjectSchema<IDefaultValues> = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  newPassword: Yup.string()
    .required('New Password is required')
    .notOneOf([Yup.ref('password')], 'Passwords cannot be repeated')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{1,})/,
      'Must contain one Uppercase, one Lowercase, one Number and one Special Case Character'
    )
    .min(8, 'New Password must not be less than 8 characters')
    .max(25, 'New Password must not be longer than 25 characters'),
  repeatPassword: Yup.string().strict()
    .required('Repeat Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
});

const defaultValues: IDefaultValues = {
  username: '',
  password: '',
  newPassword: '',
  repeatPassword: ''
};

const ChangePasswordPage = (props : IProps) => {
  const { onSubmit, isLoading, password } = props;
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaValidation),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const { user, onSignOut } = useAuth();

  const { handleSubmit, reset, setValue } = methods;

  const onGeneratedPassword = () => setValue('newPassword', GeneratedData.password());

  React.useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        password: password
      });
    } else reset(defaultValues);
  }, []);

  return (
    <Box component="section" className="flex items-center justify-center w-full" >
      <FormProvider {...methods}>
        <form className="flex flex-col space-y-1 items-center w-full" noValidate={false} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h3" className="text-black">Sign In</Typography>
          <TextFieldHF
            name="username"
            label="Username"
            className="w-2/3 md:w-2/5"
            margin="dense"
            capitalized="lower"
            icon={<Person />}
            disabled
          />
          <TextFieldHF
            name="password"
            label="Password"
            className="w-2/3 md:w-2/5"
            margin="dense"
            icon={<KeyRounded />}
            isPassword
            disabled={isLoading}
          />
          <TextFieldHF
            name="newPassword"
            label="New Password"
            className="w-2/3 md:w-2/5"
            margin="dense"
            icon={<PasswordRounded />}
            textIcon="Suggested Password"
            onClickIcon={onGeneratedPassword}
            isPassword
            disabled={isLoading}
          />
          <TextFieldHF
            name="repeatPassword"
            label="Repeat Password"
            className="w-2/3 md:w-2/5"
            margin="dense"
            icon={<LockResetRounded />}
            isPassword
            disabled={isLoading}
          />
          <Box component="section" className="flex flex-col p-5 w-2/3 md:w-2/5 gap-2">
            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              variant="contained"
              fullWidth
              startIcon={<LoginRounded />}
              type="submit"
            >
              Change Password
            </LoadingButton >
            <LoadingButton
              disabled={isLoading}
              loadingPosition="start"
              color="info"
              variant="contained"
              fullWidth
              startIcon={<ChangeCircle />}
              type="button"
              onClick={onSignOut}
            >
              Change User
            </LoadingButton >
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default ChangePasswordPage;