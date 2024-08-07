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
import { EmployeeEntity, CountryEntity } from '@wms/entities';
import { useCountry } from '@wms/hooks';

interface IForm {
  firstName: string,
  lastName: string,
  countries: CountryEntity[],
  isActive: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  firstName: Yup.string().required('FirstName is required'),
  lastName: Yup.string().required('LastName is required'),
  countries: Yup.array<CountryEntity>().min(1, 'Countries is required').required('Countries is required'),
  isActive: Yup.boolean()
});

const defaultValues: IForm = {
  firstName: '',
  lastName: '',
  countries: [],
  isActive: true
};

interface IProps {
  isOpen: boolean,
  isLoading: boolean,
  edit: EmployeeEntity | null,
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
  const { handleSubmit, reset } = methods;
  const { useCountryListQuery } = useCountry();
  const { data, isLoading: isLoadingData, refetch } = useCountryListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  React.useEffect(() => {
    refetch();
    reset(edit ? edit : defaultValues);
  }, [edit, isOpen]);
  return (
    <SimpleModal isOpen={isOpen} onClose={() => !isLoading && setIsOpen(false)} title={`${!edit ? 'New' : 'Edit'}`} >
      <FormProvider {...methods}>
        <form noValidate className="flex flex-col flex-wrap" onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className="overflow-auto pt-0.5">
            <TextFieldHF label="Codigo" name="code" disabled />
            <TextFieldHF label="Nombres" name="firstName" />
            <TextFieldHF label="Apellidos" name="lastName" />
            <AutoCompleteHF<CountryEntity>
              name="countries"
              label="Paises"
              optionsData={data || []}
              getOptionLabel={options => options.description}
              loading={isLoadingData}
              multiple
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      label={option.description}
                      {...tagProps}
                    />
                  );
                })}
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