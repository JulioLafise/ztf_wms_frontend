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
import * as Yup from 'yup';
import moment from 'moment';
import {
  TextFieldHF,
  AutoCompleteHF,
  DateTimeHF,
} from '@wms/components';
import {
  useCustomer,
  useTypeCurrency,
  useMasterPurchaseOrder,
  useEmployee,
  useDepartureType
} from '@wms/hooks';
import {
  CustomerEntity,
  TypeCurrencyEntity,
  MasterDepartureEntity,
  DetailDepartureEntity,
  MasterPurchaseOrderEntity,
  EmployeeEntity,
  DepartureTypeEntity
} from '@wms/entities';
import { useDidUpdateEffect, Validator } from '@wms/helpers';

interface IPropsHeader {
  setDataGeneral: React.Dispatch<React.SetStateAction<ImportExcelProps>>,
  dataGeneral: ImportExcelProps,
  // activeStep: number,
  setActiveStep: React.Dispatch<React.SetStateAction<number>>,
  clickCounter: number
}

type ImportExcelProps = {
  dataHeader: MasterDepartureEntity,
  dataDetail: DetailDepartureEntity[],
  dataImport: any[],
};

interface IForm {
  code: string,
  description?: string,
  departureType?: DepartureTypeEntity | null,
  customer?: CustomerEntity | null,
  employee?: EmployeeEntity | null,
  typeCurrency?: TypeCurrencyEntity | null,
  purchaseOrder?: MasterPurchaseOrderEntity | null,
  createdAt?: moment.Moment,
  isActive: Yup.Maybe<boolean>
}

const schemaValidation: Yup.ObjectSchema<IForm> = Yup.object().shape({
  code: Yup.string().notRequired(),
  description: Yup.string().notRequired(),
  departureType: Yup.mixed<DepartureTypeEntity>().nullable().required('Departure Type is required'),
  customer: Yup.mixed<CustomerEntity>().nullable().required('Customer is required'),
  employee: Yup.mixed<EmployeeEntity>().nullable().required('Employee is required'),
  typeCurrency: Yup.mixed<TypeCurrencyEntity>().nullable().required('Type Currency is required'),
  purchaseOrder: Yup.mixed<MasterPurchaseOrderEntity>().nullable().required('Purchase Order is required'),
  createdAt: Yup.mixed<moment.Moment>().required('Date is required'),
  isActive: Yup.boolean().default(true)
});

const defaultValues: IForm = {
  code: '000000',
  description: '',
  departureType: null,
  customer: null,
  employee: null,
  typeCurrency: null,
  purchaseOrder: null,
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

  const submitRef = React.useRef<HTMLInputElement>(null);

  const { useCustomerListQuery } = useCustomer();
  const { useTypeCurrencyListQuery } = useTypeCurrency();
  const { useMasterPurchaseOrderListQuery } = useMasterPurchaseOrder();
  const { useEmployeeListQuery } = useEmployee();
  const { useDepartureTypeListQuery } = useDepartureType();

  const { data: dataCustomer, isLoading: isLoadingCustomer } = useCustomerListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: dataEmployee, isLoading: isLoadingEmployee } = useEmployeeListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const { data: dataTypeCurrency, isLoading: isLoadingTypeCurrency } = useTypeCurrencyListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: dataPurchaseOrder, isLoading: isLoadingPurchaseOrder } = useMasterPurchaseOrderListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: dataDepartureType, isLoading: isLoadingDepartureType } = useDepartureTypeListQuery({ pageIndex: 0, pageSize: 100, filter: '' });

  const onSubmit = (values: { [key: string]: any }) => {
    setDataGeneral(prevState => ({
      ...prevState,
      dataHeader: values
    }));
    setActiveStep(prevState => prevState + 1);
  };

  const onClickForm = () => submitRef.current.click();

  useDidUpdateEffect(() => onClickForm(), [clickCounter]);

  React.useEffect(() => {
    reset(Validator.isObjectEmpty(dataGeneral.dataHeader) ? defaultValues : {
      ...dataGeneral.dataHeader,
      createdAt: moment(dataGeneral.dataHeader.createdAt)
    });
  }, [dataGeneral.dataHeader]);

  return (
    <Paper elevation={4}>
      <Box sx={{ p: 2 }}>
        <FormProvider {...methods}>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-nowrap flex-col space-y-5">
            <Box component="section" className="flex items-center gap-2">
              <FactCheck color="primary" />
              <Typography variant="h6" fontWeight="bold">Departure Info</Typography>
              <Box sx={{ flexGrow: 1 }} />
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
                label="No Salida"
                className="w-full md:w-4/12 lg:w-2/12"
                readOnly
              />
            </Box>
            <Box component="div" className="flex flex-wrap pt-5">
              <AutoCompleteHF<DepartureTypeEntity>
                className="w-full md:w-4/12 lg:w-2/12"
                name="departureType"
                label="Tipo Salida"
                optionsData={dataDepartureType || []}
                getOptionLabel={option => `${option.description}`}
                loading={isLoadingDepartureType}
              />
              <AutoCompleteHF<CustomerEntity>
                className="w-full md:w-4/12 lg:w-2/12"
                name="customer"
                label="Cliente"
                optionsData={dataCustomer || []}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                loading={isLoadingCustomer}
              />
              <AutoCompleteHF<EmployeeEntity>
                className="w-full md:w-4/12 lg:w-2/12"
                name="employee"
                label="Empleado"
                optionsData={dataEmployee || []}
                loading={isLoadingEmployee}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
              />
              <AutoCompleteHF<TypeCurrencyEntity>
                className="w-full md:w-4/12 lg:w-2/12"
                name="typeCurrency"
                label="Tipo Moneda"
                optionsData={dataTypeCurrency || []}
                getOptionLabel={(option) => `(${option.iconName}) ${option.description}`}
                loading={isLoadingTypeCurrency}
              />
              <AutoCompleteHF<MasterPurchaseOrderEntity>
                className="w-full md:w-4/12 lg:w-2/12"
                name="purchaseOrder"
                label="Orden de Pedido"
                optionsData={dataPurchaseOrder?.filter(ft => ft.status !== 'APROBADO') || []}
                getOptionLabel={option => `(PO ${option.code}) ${option.customer?.firstName} ${option.customer?.lastName}`}
                loading={isLoadingPurchaseOrder}
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