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
import { useBrand } from '@wms/hooks';
import { ModelEntity, BrandEntity } from '@wms/entities';

interface IForm {
  description: string,
  brand: object | null,
  isActive: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  brand: Yup.object().nullable().required('Brand is required'),
  isActive: Yup.boolean()
});

const defaultValues: IForm = {
  description: '',
  brand: null,
  isActive: true
};

interface IProps {
  isOpen: boolean,
  isLoading: boolean,
  edit: ModelEntity | null,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onSubmit: (form: Partial<IForm>) => void
}

const ModelModal = (props: IProps) => {
  const { isOpen, isLoading, edit, setIsOpen, onSubmit } = props;
  const { useBrandListQuery } = useBrand();
  const { data: brandData, isLoading: isLoadingBrand} = useBrandListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const methods = useForm({
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaValidation)
  });
  const { handleSubmit, reset } = methods;
  React.useEffect(() => {
    reset(edit ? edit : defaultValues);
  }, [edit, isOpen]);
  return (
    <SimpleModal isOpen={isOpen} onClose={() => !isLoading && setIsOpen(false)} title={`${!edit ? 'New' : 'Edit'}`} >
      <FormProvider {...methods}>
        <form noValidate className="flex flex-col flex-wrap" onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className="overflow-auto pt-0.5">
            <TextFieldHF label="Descripcion" name="description" />
            <AutoCompleteHF<BrandEntity>
              label="Marca"
              name="brand"
              optionsData={brandData || []}
              getOptionLabel={(option) => `${option.description}` || ''}
              loading={isLoadingBrand}
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

export default ModelModal;