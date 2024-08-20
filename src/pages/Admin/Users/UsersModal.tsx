import React from 'react';
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SaveAltRounded, CancelOutlined, PasswordRounded } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  SimpleModal,
  TextFieldHF,
  CheckBoxHF
} from '@wms/components';
import { UserEntity } from '@wms/entities';
import { GeneratedData } from '@wms/helpers';

interface IForm {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  isActive: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  email: Yup.string().email('Format invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{1,})/,
      'Must contain one Uppercase, one Lowercase, one Number and one Special Case Character'
    )
    .min(8, 'Password must not be less than 8 characters')
    .max(25, 'Password must not be longer than 25 characters'),
  firstName: Yup.string().required('FirstName is required'),
  lastName: Yup.string().required('LastName is required'),
  isActive: Yup.boolean()
});

const defaultValues: IForm = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  isActive: true
};

interface IProps {
  isOpen: boolean,
  isLoading: boolean,
  edit: UserEntity | null,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onSubmit: (form: Partial<IForm>) => void
}

const UnitMeasureModal = (props: IProps) => {
  const { isOpen, isLoading, edit, setIsOpen, onSubmit } = props;
  const methods = useForm({
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaValidation)
  });
  const { handleSubmit, reset, setValue } = methods;
  const onGeneratedPassword = () => setValue('password', GeneratedData.password());
  React.useEffect(() => {
    reset(edit ? edit : defaultValues);
  }, [edit, isOpen]);
  return (
    <SimpleModal isOpen={isOpen} onClose={() => !isLoading && setIsOpen(false)} title={`${!edit ? 'New' : 'Edit'}`} >
      <FormProvider {...methods}>
        <form noValidate className="flex flex-col flex-wrap" onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className="overflow-auto pt-0.5">
            <TextFieldHF label="Email" name="email" required />
            <TextFieldHF label="Nombres" name="firstName" required />
            <TextFieldHF label="Apellidos" name="lastName" required />
            <TextFieldHF
              label="Password"
              name="password"
              icon={<PasswordRounded />}
              textIcon="Suggested Password"
              onClickIcon={onGeneratedPassword}
              isPassword
              required={!edit}
            />
            <Box component="section" className="flex items-start" ><CheckBoxHF label="Activo" name="isActive" disabled /></Box>
          </Box>
          <Box component="section" className="flex flex-row-reverse gap-2 pt-3">
            <LoadingButton
              startIcon={<CancelOutlined />}
              variant="contained"
              color="error"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              startIcon={<SaveAltRounded />}
              variant="contained"
              type="submit"
              loading={isLoading}
            >
              Save
            </LoadingButton>
          </Box>
        </form>
      </FormProvider>
    </SimpleModal>
  );
};

export default UnitMeasureModal;