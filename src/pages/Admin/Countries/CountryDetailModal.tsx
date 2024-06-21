import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { SearchRounded, CancelOutlined, Public } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import {
  SimpleModal,
  TextFieldHF,
} from '@wms/components';
import { useCountry } from '@wms/hooks';

interface IForm {
  filter: string
}

const defaultValues: IForm = {
  filter: ''
};

interface IProps {
  isOpen: boolean,
  countryName: string,
  countryId: number,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onClick?: (form: Partial<IForm>) => void
}

const CountryDetailModal = (props: IProps) => {
  const { isOpen, countryId, setIsOpen, onClick, countryName } = props;
  const { useDepartamentQuery } = useCountry();
  const { data } = useDepartamentQuery({ countryId });
  const [departamentName, setDepartamentName] = React.useState<string>('');
  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = (values: IForm) => {
    setDepartamentName(values.filter.toLowerCase());
    onClick && onClick(values);
  };
  React.useEffect(() => {
    reset(defaultValues);
  }, [isOpen]);
  return (
    <SimpleModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Departaments" >
      <FormProvider {...methods}>
        <form noValidate className="flex flex-col flex-wrap" onChange={handleSubmit(onSubmit)}>
          <Typography variant="h5">{countryName.toUpperCase()}</Typography>
          <Box component="div" className="pt-0.5">
            <TextFieldHF
              label="Filter"
              name="filter"
              icon={<SearchRounded />}
              margin="dense"
            />
          </Box>
          <Box component="div" className="overflow-auto h-[50vh] md:h-[30vh]">
            <List>
              {
                data?.filter(ft => (ft.description?.toLocaleLowerCase().indexOf(departamentName) !== -1)).map(departament => (
                  <React.Fragment>
                    <ListItem>
                      <ListItemIcon><Public /></ListItemIcon>
                      <ListItemText primary={departament.description} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              }
            </List>
          </Box>
          <Box component="section" className="flex flex-row-reverse gap-2 pt-3">
            <LoadingButton
              startIcon={<CancelOutlined />}
              variant="contained"
              color="error"
              onClick={() => setIsOpen(false)}
            >
              Close
            </LoadingButton>
          </Box>
        </form>
      </FormProvider>
    </SimpleModal>
  );
};

export default CountryDetailModal;