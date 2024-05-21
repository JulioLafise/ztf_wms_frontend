import React from 'react';
import { Box, Paper } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import {
  TextFieldHF,
  AutoCompleteHF,
  DateTimeHF,
  CheckBoxHF
} from '@wms/components';


const HeaderDeparture = () => {
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: { [key: string]: any }) => { };
  return (
    <Paper elevation={4}>
      <Box sx={{ p: 2 }}>
        <FormProvider {...methods}>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-nowrap flex-col">
            <Box component="div" className="w-full flex flex-row-reverse">
              <DateTimeHF
                name="createDate"
                label="Fecha"
                className="w-2/12"
              />
              <TextFieldHF
                name="noDeparture"
                label="No Salida"
                className="w-2/12"
                readOnly
              />
            </Box>
            <Box component="div" className="flex flex-wrap pt-5">
              <AutoCompleteHF
                name="customer"
                label="Cliente"
                optionsData={[]}
                getOptionLabel={(option: any) => option.description}
                className="w-2/12"
              />
              <AutoCompleteHF
                name="currentType"
                label="Tipo Moneda"
                optionsData={[]}
                getOptionLabel={(option: any) => option.description}
                className="w-2/12"
              />
              <AutoCompleteHF
                name="purchaseOrder"
                label="Orden de Pedido"
                optionsData={[]}
                getOptionLabel={(option: any) => option.description}
                className="w-2/12"
              />
              <TextFieldHF
                name="description"
                label="Descripcion"
                className="w-full"
                rows={2}
              />
            </Box>
            <Box component="div" className="w-full flex flex-row-reverse">
              {/* <CheckBoxHF name="isFinalizado" label="Finalizado" /> */}
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Paper>
  );
};

export default HeaderDeparture;