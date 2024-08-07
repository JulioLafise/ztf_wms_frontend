import React from 'react';
import { Box, Chip } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SaveAltRounded, CancelOutlined } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  SimpleModal,
  TextFieldHF,
  CheckBoxHF,
  AutoCompleteHF
} from '@wms/components';
import { SupplierEntity, DepartamentEntity, CountryEntity } from '@wms/entities';
import { useCountry } from '@wms/hooks';

interface IForm {
  code: string,
  firstName: string,
  lastName: string,
  address: string,
  cellphone: string,
  email: string,
  country: CountryEntity | null,
  departament: DepartamentEntity | null,
  isActive: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  code: Yup.string().notRequired(),
  firstName: Yup.string().required('FirstName is required'),
  lastName: Yup.string().required('LastName is required'),
  address: Yup.string().required('Address is required'),
  cellphone: Yup.string().required('Cellphone is required'),
  email: Yup.string().email().required('Email is required'),
  country: Yup.mixed<CountryEntity>().nullable().required('Country is required'),
  departament: Yup.mixed<DepartamentEntity>().nullable().required('Departament is required'),
  isActive: Yup.boolean()
});

const defaultValues: IForm = {
  code: '',
  firstName: '',
  lastName: '',
  address: '',
  cellphone: '',
  country: null,
  departament: null,
  email: '',
  isActive: true
};

interface IProps {
  isOpen: boolean,
  isLoading: boolean,
  edit: SupplierEntity | null,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onSubmit: (form: Partial<IForm>) => void
}

const EmployeeModal = (props: IProps) => {
  const { isOpen, isLoading, edit, setIsOpen, onSubmit } = props;
  const methods = useForm({
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaValidation)
  });
  const { handleSubmit, reset, watch, setValue } = methods;
  const formValues = watch();
  const { useDepartamentQuery, useCountryListQuery } = useCountry();
  const { data: dataDepartament, isLoading: isLoadingDepartament, refetch: refetchDepartament } = useDepartamentQuery({ countryId: formValues.country?.countryId });
  const { data: dataCountry, isLoading: isLoadingCountry, refetch: refetchCountry } = useCountryListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  React.useEffect(() => {
    refetchDepartament();
    refetchCountry();
    reset(edit ? edit : defaultValues);
    if (edit) setValue('country', { countryId: edit.departament?.countryId, description: dataCountry.filter(ft => ft.countryId === edit.departament?.countryId)[0].description });
  }, [edit, isOpen]);
  return (
    <SimpleModal isOpen={isOpen} onClose={() => !isLoading && setIsOpen(false)} title={`${!edit ? 'New' : 'Edit'}`} >
      <FormProvider {...methods}>
        <form noValidate className="flex flex-col flex-wrap" onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className="overflow-auto pt-0.5 ">
            <TextFieldHF label="Codigo" name="code" disabled />
            <TextFieldHF label="Nombres" name="firstName" />
            <TextFieldHF label="Apellidos" name="lastName" />
            <TextFieldHF label="Email" name="email" />
            <TextFieldHF label="Telefono" name="cellphone" mask="phone" />
            <TextFieldHF label="Direccion" name="address" rows={5}/>
            <AutoCompleteHF<CountryEntity>
              name="country"
              label="Pais"
              optionsData={dataCountry || []}
              defaultValues={[]}
              getOptionLabel={options => options.description}
              loading={isLoadingCountry}
              disablePortal
            />
            <AutoCompleteHF<DepartamentEntity>
              name="departament"
              label="Departamento"
              optionsData={dataDepartament || []}
              defaultValues={[]}
              getOptionLabel={options => options.description}
              loading={isLoadingDepartament}
              disablePortal
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

export default EmployeeModal;