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
import { WarehouseEntity, CountryEntity, DepartamentEntity } from '@wms/entities';

interface IForm {
  description: string,
  country: Yup.Maybe<object> | null,
  departament: object | null,
  isActive: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  country: Yup.object().nullable().notRequired(),
  description: Yup.string().required('Description is required'),
  departament: Yup.object().nullable().required('Departament is required'),
  isActive: Yup.boolean()
});

const defaultValues: IForm = {
  description: '',
  departament: null,
  country: null,
  isActive: true
};

interface IProps {
  isOpen: boolean,
  isLoading: boolean,
  edit: WarehouseEntity | null,
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
          <Box component="div" className="overflow-auto pt-0.5 flex flex-col gap-1">
            <TextFieldHF label="Descripcion" name="description" />
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
              name="departament"
              optionsData={departamentsData || []}
              getOptionLabel={(option) => `${option.description}` || ''}
              loading={isLoadingDepartaments}
              disablePortal
              disabled={!formValues.country}
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

export default ModelModal;