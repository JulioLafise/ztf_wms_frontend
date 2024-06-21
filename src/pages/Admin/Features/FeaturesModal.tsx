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
  CheckBoxHF
} from '@wms/components';
import { FeaturesEntity } from '@wms/entities';

interface IForm {
  description: string,
  isActive: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  isActive: Yup.boolean()
});

const defaultValues: IForm = {
  description: '',
  isActive: true
};

interface IProps {
  isOpen: boolean,
  isLoading: boolean,
  edit: FeaturesEntity | null,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onSubmit: (form: Partial<IForm>) => void
}

const FeaturesModal = (props: IProps) => {
  const { isOpen, isLoading, edit, setIsOpen, onSubmit } = props;
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

export default FeaturesModal;