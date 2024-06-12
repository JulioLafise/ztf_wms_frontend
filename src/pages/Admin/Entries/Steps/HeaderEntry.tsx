import React from 'react';
import { Box, Paper } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import {
  TextFieldHF,
  AutoCompleteHF,
  DateTimeHF,
  // CheckBoxHF
} from '@wms/components';
import { CountryEntity, WarehouseEntity } from '@wms/entities';
import { useCountry, useWarehouse } from '@wms/hooks';

const HeaderDeparture = () => {
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const { handleSubmit } = methods;
  const {
    useCountryListQuery
  } = useCountry();

  const {
    useWarehouseListQuery
  } = useWarehouse();

  const {
    data: dataCountry, isLoading: isLoadingCountry
  } = useCountryListQuery({ filter: '', pageIndex: 1, pageSize: 1000 });

  const {
    data: dataWarehouse, isLoading: isLoadingWarehouse
  } = useWarehouseListQuery({ filter: '', pageIndex: 1, pageSize: 1000 });


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
              <AutoCompleteHF<CountryEntity>
                name="country"
                label="Pais"
                optionsData={dataCountry || []}
                getOptionLabel={(option) => `${option.description}`}
                loading={isLoadingCountry}
                className="w-2/12"
              />
              <AutoCompleteHF<WarehouseEntity>
                name="warehouse"
                label="Bodega"
                optionsData={dataWarehouse || []}
                loading={isLoadingWarehouse}
                getOptionLabel={(option) => `${option.description}`}
                className="w-2/12"
              />
              <AutoCompleteHF
                name="inventoryType"
                label="Tipo Inventario"
                optionsData={[]}s
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