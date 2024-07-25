import React from 'react';
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SaveAltRounded, CancelOutlined } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  SimpleModal,
  AutoCompleteHF,
  CheckBoxHF,
  FontAwesomeIcon
} from '@wms/components';
import { Colors } from '@wms/helpers';
import { colorName } from '@wms/static';
import { ColorEntity } from '@wms/entities';

type ColorProps = { colorHex: string, colorName: string };
interface IForm {
  colorId: Yup.Maybe<number>,
  color: object | null,
  isActive: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  colorId: Yup.number().notRequired(),
  color: Yup.object<ColorProps>().nullable().required('Description is required'),
  isActive: Yup.boolean()
});

const defaultValues: IForm = {
  colorId: 0,
  color: null,
  isActive: true
};

interface IProps {
  isOpen: boolean,
  isLoading: boolean,
  edit: ColorEntity | null,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onSubmit: (form: Partial<IForm>) => void
}

const ColorModal = (props: IProps) => {
  const { isOpen, isLoading, edit, setIsOpen, onSubmit } = props;
  const methods = useForm({
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaValidation)
  });
  const colorData = React.useMemo(() => colorName.map(color => ({ colorHex: `#${color[0]}`, colorName: color[1] })), []);
  const { handleSubmit, reset } = methods;
  React.useEffect(() => {
    reset(edit ? {
      color: {
        colorHex: edit.color,
        colorName: colorData.filter(ft => ft.colorHex === edit.color)[0].colorName
      },
      colorId: edit.colorId,
      isActive: edit.isActive
    } : defaultValues);
  }, [edit, isOpen]);
  return (
    <SimpleModal isOpen={isOpen} onClose={() => !isLoading && setIsOpen(false)} title={`${!edit ? 'New' : 'Edit'}`} >
      <FormProvider {...methods}>
        <form noValidate className="flex flex-col flex-wrap" onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className="overflow-auto pt-0.5">
            <AutoCompleteHF<ColorProps>
              label="Colors"
              name="color"
              optionsData={colorData}
              colorOption="colorHex"
              getOptionLabel={(option) => `${option.colorName}`}
              icon="fill-drip"
              disablePortal
              renderOption={({ key: someKey, ...props }, option) => (
                <li key={someKey} {...props}>
                  <FontAwesomeIcon icon="fill-drip" color={`${option.colorHex}`} className="pe-1.5" /> {String(Colors.getNameByHex(option.colorHex.replace('#', '')!).name)}
                </li>)
              }
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

export default ColorModal;