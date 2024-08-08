import React from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { FactCheck } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from'yup';
import {
  TextFieldHF,
  AutoCompleteHF,
  DateTimeHF
} from '@wms/components';
import {
  CountryEntity,
  WarehouseEntity,
  MasterEntryEntity,
  DetailEntryEntity,
  EmployeeEntity,
  SupplierEntity,
  TypeCurrencyEntity,
  CategoryEntity,
  DepartamentEntity,
  EntryTypeEntity,
} from '@wms/entities';
import {
  useCountry,
  useWarehouse,
  useTypeCurrency,
  useEmployee,
  useSupplier,
  useCategory,
  useEntryType
} from '@wms/hooks';

interface IPropsHeader {
  setDataGeneral: React.Dispatch<React.SetStateAction<ImportExcelProps>>,
  dataGeneral: ImportExcelProps,
}

type ImportExcelProps = {
  dataHeader: MasterEntryEntity,
  dataDetail: DetailEntryEntity[],
  dataImport: any[]
};

interface IForm {
  code: string,
  description?: string,
  delivery?: string,
  employee?: EmployeeEntity | null,
  supplier?: SupplierEntity | null,
  typeCurrency?: TypeCurrencyEntity | null,
  category?: CategoryEntity | null,
  country?: CountryEntity | null,
  departament?: DepartamentEntity | null,
  entryType?: EntryTypeEntity | null,
  warehouse?: WarehouseEntity | null,
  isActive: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  code: Yup.string().required('Code is required'),
  description: Yup.string().required('Description is required'),
  delivery: Yup.string().required('Delivery is required'),
  employee: Yup.mixed<EmployeeEntity>().nullable().required('Employee is required'),
  supplier: Yup.mixed<SupplierEntity>().nullable().required('Supplier is required'),
  typeCurrency: Yup.mixed<TypeCurrencyEntity>().nullable().required('Type Currency is required'),
  category: Yup.mixed<TypeCurrencyEntity>().nullable().required('Category is required'),
  country: Yup.mixed<CountryEntity>().nullable().notRequired(),
  departament: Yup.mixed<DepartamentEntity>().nullable().required('Departament is required'),
  entryType: Yup.mixed<EntryTypeEntity>().nullable().required('Entry Type is required'),
  warehouse: Yup.mixed<WarehouseEntity>().nullable().required('Warehouse is required'),
  isActive: Yup.boolean()
});

const defaultValues: IForm = {
  code: '',
  description: '',
  delivery: '',
  category: null,
  departament: null,
  employee: null,
  supplier: null,
  typeCurrency: null,
  entryType: null,
  warehouse: null,
  isActive: true
};

const HeaderDeparture = (props: IPropsHeader) => {
  const {
    setDataGeneral,
    dataGeneral
  } = props;

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaValidation),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const {
    reset,
    handleSubmit,
    watch
  } = methods;
  const formValues = watch();

  const [countryId, setCountryId] = React.useState(0);

  const { useCountryListQuery, useDepartamentQuery } = useCountry();
  const { useWarehouseListQuery } = useWarehouse();
  const { useCategoryListQuery } = useCategory();
  const { useEmployeeListQuery } = useEmployee();
  const { useSupplierListQuery } = useSupplier();
  const { useTypeCurrencyListQuery } = useTypeCurrency();
  const { useEntryTypeListQuery } = useEntryType();
  
  const { data: dataDepartment, isLoading: isLoadingDepartment } = useDepartamentQuery({ countryId });
  const { data: dataCountry, isLoading: isLoadingCountry } = useCountryListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const { data: dataWarehouse, isLoading: isLoadingWarehouse } = useWarehouseListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const { data: dataEmployee, isLoading: isLoadingEmployee } = useEmployeeListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const { data: dataSupplier, isLoading: isLoadingSupplier } = useSupplierListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const { data: dataTypeCurrency, isLoading: isLoadingTypeCurrency } = useTypeCurrencyListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const { data: dataCategory, isLoading: isLoadingCategory  } = useCategoryListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const { data: dataEntryType, isLoading: isLoadingEntryType  } = useEntryTypeListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });

  const onSubmit = (values: { [key: string]: any }) => {
    console.log(values);
  };

  React.useEffect(() => {
    if (formValues.country) {
      setCountryId(formValues.country.countryId);
    }
  }, [formValues.country]);

  return (
    <Paper elevation={4}>
      <Box sx={{ p: 2 }}>
        <FormProvider {...methods}>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-nowrap flex-col space-y-5">
            <Box component="section" className="flex items-center gap-2">
              <FactCheck color="primary" />
              <Typography variant="h6" fontWeight="bold">Entry Info</Typography>
            </Box>
            <Divider variant="inset" />
            <Box component="div" className="w-full flex flex-row-reverse">
              <DateTimeHF
                name="createDate"
                label="Fecha"
                className="w-full md:w-4/12 lg:w-2/12"
              />
              <TextFieldHF
                name="noEntry"
                label="No Entrada"
                className="w-full md:w-4/12 lg:w-2/12"
                readOnly
              />
            </Box>
            <Box component="div" className=" w-full flex flex-wrap">
              <AutoCompleteHF<CountryEntity>
                name="entryType"
                label="Tipo Entrada"
                optionsData={dataEntryType || []}
                getOptionLabel={(option) => `${option.description}`}
                loading={isLoadingEntryType}
                className="w-full md:w-4/12 lg:w-2/12"
              />
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
              <AutoCompleteHF
                name="proveedor"
                label="Proveedor"
                optionsData={dataSupplier || []}
                loading={isLoadingSupplier}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                className="w-full md:w-4/12 lg:w-2/12"
              />
              <AutoCompleteHF
                name="employee"
                label="Empleado"
                optionsData={dataEmployee || []}
                loading={isLoadingEmployee}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                className="w-full md:w-4/12 lg:w-2/12"
              />
              <TextFieldHF
                name="delivery"
                label="Entrega"
                className="w-full md:w-4/12 lg:w-2/12"
              />
              <TextFieldHF
                name="description"
                label="Descripcion"
                className="w-full"
                rows={3}
              />
            </Box>
            <Box component="div" className="w-full flex flex-row-reverse">
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Paper>
  );
};

export default HeaderDeparture;