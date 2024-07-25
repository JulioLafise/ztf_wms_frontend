import React from 'react';
import { Box, Paper } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import {
  TextFieldHF,
  AutoCompleteHF,
  DateTimeHF
} from '@wms/components';
import { CountryEntity, WarehouseEntity } from '@wms/entities';
import {
  useCountry,
  useWarehouse,
  useTypeCurrency,
  useEmployee,
  useSupplier,
  useCategory
} from '@wms/hooks';
import { useEffect } from 'react';

interface IPropsHeader {
  setDataGeneral: any,
  dataGeneral: object
}

const HeaderDeparture = (props: IPropsHeader) => {
  const methods = useFormContext();
  const { handleSubmit, watch } = methods;
  const formValues = watch();
  const [countryId, setCountryId] = React.useState(0);
  const {
    useCountryListQuery,
    useDepartamentQuery
  } = useCountry();
  const {
    setDataGeneral
  } = props;

  const {
    useWarehouseListQuery
  } = useWarehouse();

  const {
    useCategoryListQuery
  } = useCategory();

  const {
    data: dataDepartment,
    isLoading: isLoadingDepartment
  } = useDepartamentQuery({ countryId });

  const {
    useEmployeeListQuery
  } = useEmployee();

  const {
    useSupplierQuery
  } = useSupplier();

  const {
    useTypeCurrencyListQuery
  } = useTypeCurrency();

  const {
    data: dataCountry, isLoading: isLoadingCountry
  } = useCountryListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });

  const {
    data: dataWarehouse, isLoading: isLoadingWarehouse
  } = useWarehouseListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });

  const {
    data: dataEmployee, isLoading: isLoadingEmployee
  } = useEmployeeListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });

  const {
    data: dataSupplier, isLoading: isLoadingSupplier
  } = useSupplierQuery({ filter: '', pageIndex: 0, pageSize: 1000 });

  const {
    data: dataTypeCurrency, isLoading: isLoadingTypeCurrency
  } = useTypeCurrencyListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });

  const {
    data: dataCategory, isLoading: isLoadingCategory
  } = useCategoryListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });

  useEffect(() => {
    if (formValues.country) {
      setCountryId(formValues.country.countryId);
    }
  }, [formValues.country]);

  return (
    <Paper elevation={4}>
      <Box sx={{ p: 2 }}>
        <Box component="div" className="w-full flex flex-wrap">
          <AutoCompleteHF<CountryEntity>
            name="country"
            label="Pais"
            optionsData={dataCountry || []}
            getOptionLabel={(option) => `${option.description}`}
            loading={isLoadingCountry}
            className="w-full md:w-4/12 lg:w-2/12"
          />
          <AutoCompleteHF
            name="department"
            label="Departamento"
            optionsData={dataDepartment || []}
            getOptionLabel={(option) => `${option.description}`}
            loading={isLoadingDepartment}
            className="w-full md:w-4/12 lg:w-2/12"
          />
          <AutoCompleteHF<WarehouseEntity>
            name="warehouse"
            label="Bodega"
            optionsData={dataWarehouse || []}
            loading={isLoadingWarehouse}
            getOptionLabel={(option) => `${option.description}`}
            className="w-full md:w-4/12 lg:w-2/12"
          />
          <AutoCompleteHF
            name="category"
            label="Categoria"
            optionsData={dataCategory || []}
            loading={isLoadingCategory}
            getOptionLabel={(option: any) => option.description}
            className="w-full md:w-4/12 lg:w-2/12"
          />
          <AutoCompleteHF
            name="currency"
            label="Moneda"
            optionsData={dataTypeCurrency || []}
            loading={isLoadingTypeCurrency}
            getOptionLabel={(option) => `${option.description}`}
            className="w-full md:w-4/12 lg:w-2/12"
          />
          <DateTimeHF
            name="createDate"
            label="Fecha"
            className="w-full md:w-4/12 lg:w-2/12"
          />
        </Box>
        <Box component="div" className=" w-full flex flex-wrap">
          <TextFieldHF
            name="noEntry"
            label="No Entrada"
            className="w-full md:w-4/12 lg:w-2/12"
            readOnly
          />
          <AutoCompleteHF
            name="proveedor"
            label="Proveedor"
            optionsData={dataSupplier || []}
            loading={isLoadingSupplier}
            getOptionLabel={(option) => `${option.firstName}`}
            className="w-full md:w-4/12 lg:w-2/12"
          />
          <AutoCompleteHF
            name="employee"
            label="Empleado"
            optionsData={dataEmployee || []}
            loading={isLoadingEmployee}
            getOptionLabel={(option) => `${option.firstName}`}
            className="w-full md:w-4/12 lg:w-2/12"
          />
          <TextFieldHF
            name="client"
            label="Entrega"
            className="w-full md:w-4/12 lg:w-2/12"
          />
          <TextFieldHF
            name="placa"
            label="Placa"
            className="w-full md:w-4/12 lg:w-2/12"
          />
          <TextFieldHF
            name="identification"
            label="No. Identificacion"
            className="w-full md:w-4/12 lg:w-2/12"
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
      </Box>
    </Paper>
  );
};

export default HeaderDeparture;