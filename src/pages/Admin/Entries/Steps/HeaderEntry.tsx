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

            {/* <TextFieldHF
              name="noEntry"
              label="No Entrada"
              className="w-2/12"
              readOnly
            /> */}
            <Box component="div" className="w-full flex flex-wrap">
              <AutoCompleteHF
                name="country"
                label="Pais"
                optionsData={[]}
                getOptionLabel={(option: any) => option.description}
                className="w-2/12"
              />
              <AutoCompleteHF
                name="warehouse"
                label="Bodega"
                optionsData={[]}
                getOptionLabel={(option: any) => option.description}
                className="w-2/12"
              />
              <AutoCompleteHF
                name="inventoryType"
                label="Tipo Inventario"
                optionsData={[]}
                getOptionLabel={(option: any) => option.description}
                className="w-2/12"
              />
              <AutoCompleteHF
                name="currency"
                label="Moneda"
                optionsData={[]}
                getOptionLabel={(option: any) => option.description}
                className="w-2/12"
              />
              <DateTimeHF
                name="createDate"
                label="Fecha"
                className="w-2/12"
              />
              <TextFieldHF
                name="noEntry"
                label="No Entrada"
                className="w-2/12"
                readOnly
              />
            </Box>
            <Box component="div" className=" w-full flex flex-wrap">
              <AutoCompleteHF
                name="proveedor"
                label="Proveedor"
                optionsData={[]}
                getOptionLabel={(option: any) => option.description}
                className="w-2/12"
              />
              <AutoCompleteHF
                name="employee"
                label="Empleado"
                optionsData={[]}
                getOptionLabel={(option: any) => option.description}
                className="w-2/12"
              />
              <TextFieldHF
                name="client"
                label="Entrega"
                className="w-2/12"
                readOnly
              />
              <TextFieldHF
                name="placa"
                label="Placa"
                className="w-2/12"
                readOnly
              />
              <TextFieldHF
                name="identification"
                label="No. Identificacion"
                className="w-2/12"
                readOnly
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