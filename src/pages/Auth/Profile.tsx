import React from 'react';
import { Box, Divider, Paper, Skeleton, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SaveAltRounded, PasswordRounded } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import {
  TextFieldHF,
  CheckBoxHF,
  AutoCompleteHF,
  DateTimeHF,
  SimpleFileDialog
} from '@wms/components';
import {
  useAuth,
  useUser,
  useAlertNotification,
  useAws
} from '@wms/hooks';
import { FilesContent } from '@wms/interfaces';
import { GeneratedData } from '@wms/helpers';

interface IFormUser {
  username: string,
  email: string,
  userImage: Yup.Maybe<string>,
  person: object | null,
  rolGroup: string,
}

interface IFormPerson {
  firstName: string,
  lastName: string,
  identificationCard: string,
  address: string,
  phone: string
}

interface IFormPassword{
  password: string,
  oldPassword: string
}

const schemaValidationPerson: Yup.ObjectSchema<IFormPerson> = Yup.object().shape({
  firstName: Yup.string()
    .strict()
    .required('FirstName is required')
    .min(4, 'FirstName must not be less than 4 characters')
    .max(25, 'FirstName must not be longer than 25 characters'),
  lastName: Yup.string()
    .strict()
    .required('LastName is required')
    .min(4, 'LastName must not be less than 4 characters')
    .max(25, 'LastName must not be longer than 25 characters'),
  identificationCard: Yup.string().strict().required('IdentificationCard is required'),
  address: Yup.string().notRequired(),
  phone: Yup.string().notRequired()
});

const schemaValidationPassword: Yup.ObjectSchema<IFormPassword> = Yup.object().shape({
  oldPassword: Yup.string().required('Current Password is required'),
  password: Yup.string()
    .required('Password is required')
    .notOneOf([Yup.ref('oldPassword')], 'Passwords cannot be repeated')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{1,})/,
      'Must contain one Uppercase, one Lowercase, one Number and one Special Case Character'
    )
    .min(8, 'Password must not be less than 8 characters')
    .max(25, 'Password must not be longer than 25 characters'),
});

const defaultValuesUser: IFormUser = {
  username: '',
  email: '',
  userImage: '',
  person: null,
  rolGroup: '',
};

const defaultValuesPerson: IFormPerson = {
  firstName: '',
  lastName: '',
  identificationCard: '',
  address: '',
  phone: ''
};

const defaultValuesPassword: IFormPassword = {
  password: '',
  oldPassword: ''
};

const ProfilePage = () => {
  const { user, isLoading, onChangePassword } = useAuth();
  const { s3Upload } = useAws();
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const [imageLoading, setImageLoading] = React.useState<{ image: string, isLoading: boolean }>();

  const { useUserMutation } = useUser();
  const mutationUser = useUserMutation(undefined, { typeMutation: 'put' });

  const methodsUser = useForm({
    defaultValues: defaultValuesUser
  });
  const { reset: resetUser, setValue, watch } = methodsUser;
  const formValuesUser = watch();

  const methodsPerson = useForm({
    defaultValues: defaultValuesPerson,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaValidationPerson)
  });
  const { handleSubmit: handleSubmitPerson, reset: resetPerson, setValue: setValuePerson } = methodsPerson;

  const methodsPassword = useForm({
    defaultValues: defaultValuesPassword,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaValidationPassword)
  });
  const { handleSubmit: handleSubmitPassword, reset: resetPassword, setValue: setValuePassword } = methodsPassword;

  const onSubmitPerson = (values: { [x: string]: any }) => {
    swalToastWait('Update Person Info', {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    const data: any = {
      ...values,
      birthDate: moment(values.birthDate).format('YYYY-MM-DD')
    };

  };

  const onSubmitPassword = (values: { [x: string]: any }) => {
    if (values.password === values.oldPassword) {
      swalToastError('Error Password', {
        message: 'The new and current password cannot be identical',
        timer: 4000
      });
      return;
    }
    swalToastWait('Update Password', {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    const data: any = {
      ...values,
      userId: user?.userId
    };
    onChangePassword(data)
      .then(() => {
        resetPassword(defaultValuesPassword);
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 4000 }); });
  };

  const onGeneratedPassword = () => setValuePassword('password', GeneratedData.password());

  const onSaveImage = (files: FilesContent) => {
    if (files) {
      if (files.length > 0) {
        swalToastWait('Update User Image', {
          message: 'Please wait a few minutes',
          showLoading: true,
        });
        setImageLoading({ image: '', isLoading: true });
        const fileName = `${user?.userId}.${files[0].files.name.split('.')[1]}`;
        const data: any = {
          userId: user?.userId,
          userImage: fileName
        };
        setImageLoading({ image: files[0].content, isLoading: true });
        s3Upload({
          file: files[0].files,
          fileName,
          folderName: 'alm-mis',
          contentType: files![0].files.type,
          type: 'image'
        }).then(() => {
          mutationUser.mutateAsync(data)
            .then(() => {
              setValue('userImage', fileName);
              setImageLoading({ image: files[0].content, isLoading: false });
              swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
            })
            .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 4000 }); });
        })
          .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 4000 }); });     
      }
    }
  };

  React.useEffect(() => {
    if (user) {
      setImageLoading({ image: '', isLoading: true });
      resetUser(user ? { ...user, userImage: user.userId } : defaultValuesUser);
      setValuePerson('firstName', user.firstName);
      setValuePerson('lastName', user.lastName);
      setValuePerson('identificationCard', user.identificationCard);
      setImageLoading({ image: user.picture || '', isLoading: false });
    } else {
      resetUser(defaultValuesUser);
      resetPerson(defaultValuesPerson);     
    }
    resetPassword(defaultValuesPassword);
  }, [user]);

  return (
    <Paper elevation={4}>
      <Box component="div" className="p-7">
        <Box component="div" className="flex flex-col flex-wrap">
          <Box component="div" className="flex flex-wrap justify-center">
            <Box component="section" className="flex flex-col justify-center items-center pb-2 gap-2 w-full sm:w-full md:w-1/3 lg:w-1/3">
              {
                imageLoading?.isLoading
                  ? (
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      width="55%"
                      height="250px"
                      sx={{ bgcolor: 'grey.300' }}
                    />
                  )
                  : (
                    <img
                      alt={formValuesUser.userImage || uuid()}
                      src={imageLoading && imageLoading.image || '/img/wallpaper_01.jpg'}
                      width={250}
                      height={250}
                      className="rounded-full shadow-md"
                    />
                  )
              }
              <SimpleFileDialog sizeBtn="medium" onLoadFiles={onSaveImage} isLoading={imageLoading?.isLoading || mutationUser.isPending} disabled />
            </Box>
            <Box component="section" className="flex flex-wrap sm:flex-wrap md:flex-nowrap justify-center gap-2 w-full sm:w-full md:w-2/3 lg:w-2/3">
              <Box component="article" className="flex flex-col w-full sm:w-full md:w-1/2 lg:w-1/2">
                <Box component="div">
                  <FormProvider {...methodsUser}>
                    <form noValidate className="space-y-1.5">
                      <Divider className="text-lg font-bold">User Info</Divider>
                      <TextFieldHF label="Username" name="username" capitalized="lower" disabled />
                      <TextFieldHF label="Email" name="email" capitalized="lower" disabled />
                      <TextFieldHF label="Group" name="rolGroup" capitalized="upper" disabled />
                      <Box component="section" className="flex items-center" >
                        <Typography variant="body2" fontWeight="bold" className="pe-1">Status:</Typography>
                        <Box component="div" className={`${user.isVerified ? 'bg-green-500' : 'bg-orange-500'} p-1.5 rounded-md`}>
                          <Typography variant="body2" fontWeight="bold" className="text-white">
                            {user.isVerified ? 'VERIFIED' : 'PENDING'}
                          </Typography>
                        </Box>
                      </Box>
                    </form>
                  </FormProvider>
                </Box>
                <Box component="article" className="flex flex-col">
                  <FormProvider {...methodsPassword}>
                    <form noValidate onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-1">
                      <Divider className="text-md font-bold">Password</Divider>
                      <TextFieldHF label="Current Password" name="oldPassword" isPassword />
                      <TextFieldHF
                        label="Password"
                        name="password"
                        icon={<PasswordRounded />}
                        textIcon="Suggested Password"
                        onClickIcon={onGeneratedPassword}
                        isPassword
                      />
                      <Box component="section" className="flex flex-row-reverse gap-2 pt-3">
                        <LoadingButton
                          startIcon={<SaveAltRounded />}
                          variant="contained"
                          type="submit"
                          loading={isLoading}
                        >
                          Update Password
                        </LoadingButton>
                      </Box>
                    </form>
                  </FormProvider>
                </Box>
              </Box>             
              <Box component="article" className="flex flex-col w-full sm:w-full md:w-1/2 lg:w-1/2">
                <FormProvider {...methodsPerson}>
                  <form noValidate onSubmit={handleSubmitPerson(onSubmitPerson)}>
                    <Divider className="text-lg font-bold">Person Info</Divider>
                    <TextFieldHF label="First Name" name="firstName" />
                    <TextFieldHF label="Last Name" name="lastName" />
                    <TextFieldHF
                      label="IdentificationCard"
                      name="identificationCard"
                      mask="identification"
                    />
                    <TextFieldHF label="Phone" name="phone" mask="phone" />
                    <TextFieldHF label="Address" name="address" rows={5} />
                    <Box component="section" className="flex flex-row-reverse gap-2 pt-3">
                      <LoadingButton
                        startIcon={<SaveAltRounded />}
                        variant="contained"
                        type="submit"
                        loading={false}
                      >
                        Update Info
                      </LoadingButton>
                    </Box>
                  </form>
                </FormProvider>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfilePage;