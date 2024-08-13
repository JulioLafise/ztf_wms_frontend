import React from 'react';
import {
  Box,
  Divider,
  Paper,
  Tooltip,
  Typography
} from '@mui/material';
import { CheckCircle, CheckCircleOutline, FactCheck } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from'yup';
import moment from 'moment';
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
import { useDidUpdateEffect, Validator } from '@wms/helpers';

interface IPropsHeader {
  setDataGeneral: React.Dispatch<React.SetStateAction<ImportExcelProps>>,
  dataGeneral: ImportExcelProps,
  // activeStep: number,
  setActiveStep: React.Dispatch<React.SetStateAction<number>>,
  clickCounter: number
}

type ImportExcelProps = {
  dataHeader: MasterEntryEntity,
  dataDetail: DetailEntryEntity[],
  dataImport: any[],
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
  createdAt?: moment.Moment,
  isActive: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  code: Yup.string().notRequired(),
  description: Yup.string().notRequired(),
  delivery: Yup.string().required('Delivery is required'),
  employee: Yup.mixed<EmployeeEntity>().nullable().required('Employee is required'),
  supplier: Yup.mixed<SupplierEntity>().nullable().required('Supplier is required'),
  typeCurrency: Yup.mixed<TypeCurrencyEntity>().nullable().required('Type Currency is required'),
  category: Yup.mixed<TypeCurrencyEntity>().nullable().required('Category is required'),
  country: Yup.mixed<CountryEntity>().nullable().notRequired(),
  departament: Yup.mixed<DepartamentEntity>().nullable().required('Departament is required'),
  entryType: Yup.mixed<EntryTypeEntity>().nullable().required('Entry Type is required'),
  warehouse: Yup.mixed<WarehouseEntity>().nullable().required('Warehouse is required'),
  createdAt: Yup.mixed<moment.Moment>().required('Date is required'),
  isActive: Yup.boolean().default(true)
});

const defaultValues: IForm = {
  code: '000000',
  description: '',
  delivery: '',
  category: null,
  departament: null,
  employee: null,
  supplier: null,
  typeCurrency: null,
  entryType: null,
  warehouse: null,
  createdAt: moment(),
  isActive: true
};

const HeaderDeparture: React.FC<IPropsHeader> = (props) => {
  const {
    setDataGeneral,
    dataGeneral,
    setActiveStep,
    clickCounter,
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
    watch,
    setValue
  } = methods;
  const formValues = watch();

  const [countryId, setCountryId] = React.useState(0);
  const submitRef = React.useRef<HTMLInputElement>(null);

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
    setDataGeneral(prevState => ({
      ...prevState,
      dataHeader: values
    }));
    setActiveStep(prevState => prevState + 1);
  };

  const onClickForm = () => submitRef.current.click();

  React.useEffect(() => {
    if (formValues.country) {
      setCountryId(formValues.country.countryId);
    }
    Validator.isObjectEmpty(dataGeneral.dataHeader) && setValue('departament', null);
  }, [formValues.country]);

  useDidUpdateEffect(() => onClickForm(), [clickCounter]);

  React.useEffect(() => {
    reset(Validator.isObjectEmpty(dataGeneral.dataHeader) ? defaultValues : {
      ...dataGeneral.dataHeader,
      country: dataCountry?.length && dataCountry.filter(ft => ft.countryId === dataGeneral.dataHeader.departament.countryId)[0],
      createdAt: moment(dataGeneral.dataHeader.createdAt)
    });
  }, [dataGeneral.dataHeader, dataCountry]);

  return (
    <Paper elevation={4}>
      <Box sx={{ p: 2 }}>
        <FormProvider {...methods}>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-nowrap flex-col space-y-5">
            <Box component="section" className="flex items-center gap-2">
              <FactCheck color="primary" />
              <Typography variant="h6" fontWeight="bold">Entry Info</Typography>
              <Box sx={{ flexGrow: 1}} />
              <Typography variant="body2" fontWeight="bold">Status: </Typography>
              {
                formValues.isActive
                  ? (<Tooltip title="Activo"><CheckCircle color="success" fontSize="medium" /></Tooltip>)
                  : (<Tooltip title="Inactivo"><CheckCircleOutline color="error" fontSize="medium" /></Tooltip>)
              }
            </Box>
            <Divider variant="inset" />
            <Box component="div" className="w-full flex flex-row-reverse">
              <DateTimeHF
                name="createdAt"
                label="Fecha"
                className="w-full md:w-4/12 lg:w-2/12"
                disabled
              />
              <TextFieldHF
                name="code"
                label="No Entrada"
                className="w-full md:w-4/12 lg:w-2/12"
                readOnly
              />
            </Box>
            <Box component="div" className=" w-full flex flex-wrap">
              <AutoCompleteHF<EntryTypeEntity>
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
              <AutoCompleteHF<DepartamentEntity>
                name="departament"
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
              <AutoCompleteHF<CategoryEntity>
                name="category"
                label="Categoria"
                optionsData={dataCategory || []}
                loading={isLoadingCategory}
                getOptionLabel={(option: any) => option.description}
                className="w-full md:w-4/12 lg:w-2/12"
              />
              <AutoCompleteHF<TypeCurrencyEntity>
                name="typeCurrency"
                label="Moneda"
                optionsData={dataTypeCurrency || []}
                loading={isLoadingTypeCurrency}
                getOptionLabel={(option) => `(${option.iconName}) ${option.description}`}
                className="w-full md:w-4/12 lg:w-2/12"
              />
              <AutoCompleteHF<SupplierEntity>
                name="supplier"
                label="Proveedor"
                optionsData={dataSupplier || []}
                loading={isLoadingSupplier}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                className="w-full md:w-4/12 lg:w-2/12"
              />
              <AutoCompleteHF<EmployeeEntity>
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
              <input ref={submitRef} id="submitHidden" hidden type="submit" />
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Paper>
  );
};

export default HeaderDeparture;

