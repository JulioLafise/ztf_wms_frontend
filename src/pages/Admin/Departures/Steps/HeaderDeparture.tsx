import React from 'react';
import { Box, Paper } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import {
  TextFieldHF,
  AutoCompleteHF,
  DateTimeHF,
  CheckBoxHF
} from '@wms/components';
import { useCustomer, useTypeCurrency } from '@wms/hooks';
import { CustomerEntity, TypeCurrencyEntity } from '@wms/entities';


const HeaderDeparture = () => {
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const { handleSubmit } = methods;

  const { useCustomerListQuery } = useCustomer();
  const { useTypeCurrencyListQuery } = useTypeCurrency();

  const { data: dataCustomer, isLoading: isLoadingCustomer } = useCustomerListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: dataTypeCurrency, isLoading: isLoadingTypeCurrency } = useTypeCurrencyListQuery({ pageIndex: 0, pageSize: 100, filter: '' });

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
              <AutoCompleteHF<CustomerEntity>
                className="w-2/12"
                name="customer"
                label="Cliente"
                optionsData={dataCustomer || []}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                loading={isLoadingCustomer}
              />
              <AutoCompleteHF<TypeCurrencyEntity>
                className="w-2/12"
                name="currentType"
                label="Tipo Moneda"
                optionsData={dataTypeCurrency || []}
                getOptionLabel={(option) => `(${option.iconName}) ${option.description}`}
                loading={isLoadingTypeCurrency}
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