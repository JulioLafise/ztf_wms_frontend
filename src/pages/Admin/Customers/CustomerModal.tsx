import React from 'react';
import { Box } from '@mui/material';
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
import { useCountry } from '@wms/hooks';
import { CustomerEntity, DepartamentEntity, CountryEntity } from '@wms/entities';

interface IForm {
  firstName?: string,
  lastName?: string,
  cellphone?: string,
  email?: string,
  address?: string,
  identificationCard?: string,
  country?: CountryEntity | null,
  departament?: DepartamentEntity | null,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  cellphone: Yup.string().required('Cellphone is required'),
  email: Yup.string().email().required('Email is required'),
  address: Yup.string().required('Address is required'),
  identificationCard: Yup.string().required('Identification Card is required'),
  country: Yup.mixed<CountryEntity>().nullable().notRequired(),
  departament: Yup.object<DepartamentEntity>().nullable().required('Departament is required'),
  isActive: Yup.boolean()
});

const defaultValues: IForm = {
  address: '',
  cellphone: '',
  email: '',
  firstName: '',
  lastName: '',
  identificationCard: '',
  country: null,
  departament: null,
  isActive: true
};

interface IProps {
  isOpen: boolean,
  isLoading: boolean,
  edit: CustomerEntity | null,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onSubmit: (form: Partial<IForm>) => void
}

const ModelModal = (props: IProps) => {
  const { isOpen, isLoading, edit, setIsOpen, onSubmit } = props;
  const [isLoadingEdit, setIsLoadingEdit] = React.useState<boolean>(false);
  const [countryId, setCountryId] = React.useState<number>(0);
  const { useCountryListQuery, useDepartamentQuery } = useCountry();
  const { data: countriesData, isLoading: isLoadingCountries } = useCountryListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: departamentsData, isLoading: isLoadingDepartaments } = useDepartamentQuery({ countryId: countryId });
  const methods = useForm({
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaValidation)
  });
  const { handleSubmit, reset, watch, setValue } = methods;
  const formValues = watch();
  React.useEffect(() => {
    reset(edit ? edit : defaultValues);
    if (edit) {
      setIsLoadingEdit(true);
      setValue('country', countriesData?.filter(ft => ft.countryId === edit.departament?.countryId)[0]);
    }
  }, [edit, isOpen]);
  
  React.useEffect(() => {   
    if (formValues.country) {
      if (!isLoadingEdit) {
        setValue('departament', null);
      }
      const country: CountryEntity = formValues.country;
      setCountryId(country.countryId!);
    }
    setIsLoadingEdit(false);
  }, [formValues.country]);
  return (
    <SimpleModal isOpen={isOpen} onClose={() => !isLoading && setIsOpen(false)} title={`${!edit ? 'New' : 'Edit'}`} >
      <FormProvider {...methods}>
        <form noValidate className="flex flex-col flex-wrap" onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className="overflow-auto pt-0.5 h-[50vh] container-scroll">
            <TextFieldHF label="Identificacion" name="identificationCard" mask="identification" />
            <TextFieldHF label="Email" name="email" />
            <TextFieldHF label="Nombre" name="firstName" />
            <TextFieldHF label="Apellido" name="lastName" />
            <TextFieldHF label="Telefono" name="cellphone" mask="phone2" />
            <AutoCompleteHF<CountryEntity>
              label="Pais"
              name="country"
              optionsData={countriesData || []}
              getOptionLabel={(option) => `${option.description}` || ''}
              loading={isLoadingCountries}
              disablePortal
            />
            <AutoCompleteHF<DepartamentEntity>
              label="Departamento"
              name="departametn"
              optionsData={departamentsData || []}
              getOptionLabel={(option) => `${option.description}` || ''}
              loading={isLoadingDepartaments}
              disablePortal
            />
            <TextFieldHF label="Direccion" name="address" rows={3} />
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

export default ModelModal;