import { Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { LoginRounded, KeyRounded, Person } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextFieldHF } from '@wms/components';

interface IProps {
  onSubmit: (_values: IDefaultValues) => void,
  isLoading: boolean,
}

interface IDefaultValues {
  username: string,
  password: string
}

const schemaValidation: Yup.ObjectSchema<IDefaultValues> = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const defaultValues: IDefaultValues = {
  username: '',
  password: ''
};

const SignInPage = (props : IProps) => {
  const { onSubmit, isLoading } = props;
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaValidation),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const { handleSubmit } = methods;

  return (
    <Box component="section" className="flex items-center justify-center w-full" >
      <FormProvider {...methods}>
        <form className="flex flex-col space-y-1 items-center w-full" noValidate={false} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h3" className="text-black">Sign In</Typography>
          <TextFieldHF
            name="username"
            label="Username"
            className="w-2/3"
            margin="dense"
            capitalized="lower"
            icon={<Person />}
            disabled={isLoading}
          />
          <TextFieldHF
            name="password"
            label="Password"
            className="w-2/3"
            margin="dense"
            icon={<KeyRounded />}
            isPassword
            disabled={isLoading}
          />
          <Box component="section" className="p-5 w-2/3">
            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              variant="contained"
              fullWidth
              startIcon={<LoginRounded />}
              type="submit"
            >
              Sign In
            </LoadingButton >
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default SignInPage;