import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import * as Yup from 'yup';
import { IValidationErrors, IOptionsQuery, IOnSaveAndEditRows, ComboBoxSelectTable } from '@wms/interfaces';
import { Validator } from '@wms/helpers';
import { useAlertNotification, useUI, useCustomer, useCountry } from '@wms/hooks';
import {
  MaterialTable,
  ButtonActions,
  EditCheckboxTable,
  TelephoneExtInputMask,
  IdentificationCardInputMask
} from '@wms/components';
import { CustomerEntity, CountryEntity } from '@wms/entities';
import CustomerModal from './CustomerModal';

interface ISchemaValidationTable {
  firstName?: string,
  lastName?: string,
  cellphone?: string,
  email?: string,
  address?: string,
  identificationCard?: string,
  departamentId?: number,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  cellphone: Yup.string().required('Cellphone is required'),
  email: Yup.string().email().required('Email is required'),
  address: Yup.string().required('Address is required'),
  identificationCard: Yup.string().required('Identification Card is required'),
  departamentId: Yup.number().required('Departament is required'),
  isActive: Yup.boolean().notRequired()
});

type ComboBoxItems = { countries: object[], departaments: object[] };

const CustomerPage = () => {
  const [countryId, setCountryId] = React.useState<number>(1);
  const countryFilter = React.useRef<CountryEntity[]>([]);
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile } = useUI();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [checkState, setCheckState] = React.useState<Partial<CustomerEntity>>({
    isActive: false,
  });
  const [selectData, setSelectData] = React.useState<ComboBoxSelectTable<ComboBoxItems>>({
    countries: [],
    departaments: [],
  });
  const [edit, setEdit] = React.useState<CustomerEntity | null>(null);
  const [ref, setRef] = React.useState<MRT_TableInstance<CustomerEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { useCountryListQuery, useDepartamentQuery } = useCountry();
  const { isGenerate, rowCount, useCustomerListQuery, useCustomerMutation } = useCustomer();
  const { data, isLoading, isError, refetch } = useCustomerListQuery({ ...pagination, filter: globalFilter });
  const { data: countryData } = useCountryListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: departamentData } = useDepartamentQuery({ countryId });
  const mutation = useCustomerMutation({ ...pagination, filter: globalFilter }, optionsQuery);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});

  const columns = React.useMemo<MRT_ColumnDef<CustomerEntity>[]>(() => [
    {
      id: 'customerId',
      accessorKey: 'customerId',
      header: 'Modelo ID',
      enableEditing: false,
      minSize: 150,
    },
    // {
    //   id: 'code',
    //   accessorKey: 'code',
    //   header: 'Codigo',
    //   enableEditing: false,
    //   minSize: 150,
    // },
    {
      id: 'identificationCard',
      accessorKey: 'identificationCard',
      header: 'Identificacion',
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.identificationCard,
        helperText: validationErrors.identificationCard,
        InputProps: {
          inputComponent: IdentificationCardInputMask
        }
      },
    },
    {
      id: 'firstName',
      accessorKey: 'firstName',
      header: 'Nombre',
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.firstName,
        helperText: validationErrors.firstName
      },
    },
    {
      id: 'lastName',
      accessorKey: 'lastName',
      header: 'Apellidos',
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.lastName,
        helperText: validationErrors.lastName
      },
    },
    {
      id: 'cellphone',
      accessorKey: 'cellphone',
      header: 'Telefono',
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.cellphone,
        helperText: validationErrors.cellphone,
        InputProps: {
          inputComponent: TelephoneExtInputMask
        }
      },
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.email,
        helperText: validationErrors.email,
        // InputProps: {
        //   inputComponent: TelephoneExtInputMask
        // }
      },
    },
    {
      id: 'address',
      accessorKey: 'address',
      header: 'Direccion',
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.address,
        helperText: validationErrors.address
      },
    },
    {
      id: 'countryId',
      accessorKey: 'countryId',
      accessorFn: (row) => row.departament?.countryId,
      header: 'Pais',
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        // required: true,
        // error: !!validationErrors.departamentId,
        // helperText: validationErrors.departamentId,
        onChange: (_event) => { setCountryId(Number(_event.target.value)); }
      },
      editSelectOptions: selectData.countries,
      Cell: ({ row }) => <span>{getCountryName(row.original.departament?.countryId)}</span>
    },
    {
      id: 'departamentId',
      accessorKey: 'departamentId',
      accessorFn: (row) => row.departament?.departamentId,
      header: 'Departamento',
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.departamentId,
        helperText: validationErrors.departamentId
      },
      editSelectOptions: selectData.departaments,
      Cell: ({ row }) => <span>{row.original.departament?.description}</span>
    },
    {
      id: 'isActive',
      accessorKey: 'isActive',
      header: 'Activo',
      minSize: 150,
      enableEditing: false,
      editVariant: undefined,
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors.isActive,
        helperText: validationErrors.isActive,
      },
      Edit: (props) => <EditCheckboxTable {...props} setCheckState={setCheckState} />,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    },
  ], [validationErrors, selectData]);

  const getCountryName = (countryId?: number) => {
    if (countryId) {
      const country = countryFilter.current.filter(ft => ft.countryId === countryId)[0];
      if (country) {
        return country.description;
      }
    }
    return '';
  };

  const onSaveOrEdit: IOnSaveAndEditRows<CustomerEntity> = async (row, table, values, validation): Promise<void> => {
    if (!isMobile) {
      setOptionsQuery({
        typeMutation: row.original.customerId ? 'put' : 'post'
      });
      const data: CustomerEntity = {
        ...values,
        ...checkState,
        isActive: row.original.customerId ? row.original.isActive : true
      };
      const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data });
      if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.customerId ? true : false); return; }
      setValidationErrors({});
      validation!({})(table, row.original.customerId ? true : false);
      onTransaction({ customerId: row.original.customerId, ...data });
    }
    else {
      setEdit(row.original);
      setIsOpen(true);
    }
  };

  const onSubmit = (values: { [x: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.customerId ? 'put' : 'post'
    });
    onTransaction(values);
  };

  const onTransaction = (values: { [x: string]: any }) => {
    const title = !values.customerId ? 'Saving Customer!' : 'Updating Customer!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    mutation.mutateAsync(values)
      .then(() => {
        setIsOpen(false);
        setEdit(null);
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => { 
        let message = '';
        if (String(err.message).indexOf('Duplicate') > -1) {
          message = 'Review the fields Identification Card, Phone and Email';
        }
        swalToastError(err.message, { message, showConfirmButton: false, timer: 4000 }); 
      });
  };

  const onChangeState = async (values: { [key: string]: any }) => {
    setOptionsQuery({ typeMutation: 'delete'});
    const title = values.isActive ? 'Desactive Customer!' : 'Active Customer!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    mutation.mutateAsync(values)
      .then(() => {
        setIsOpen(false);
        setEdit(null);
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  React.useEffect(() => {
    if (countryData) {
      countryFilter.current = countryData;
      setSelectData(oldData => ({ ...oldData, countries: countryData.map(obj => ({ label: obj.description, value: obj.countryId })) }));
    }
    if (departamentData) {
      setSelectData(oldData => ({ ...oldData, departaments: departamentData.map(obj => ({ label: obj.description, value: obj.departamentId })) }));
    }
  }, [countryData, departamentData]);

  return (
    <Paper elevation={4}>
      <MaterialTable<CustomerEntity>
        columns={columns}
        data={data || []}
        enableRowActions
        columnsVisible={{ customerId: false }}
        setRef={setRef}
        pagination={pagination}
        rowCount={rowCount}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        isEditing={!isMobile}
        onActionEdit={onSaveOrEdit}
        onActionSave={onSaveOrEdit}
        isLoading={isLoading}
        onActionStateChange={(row) => onChangeState(row.original)}
        isGenerate={isGenerate}
        isError={isError}
        setValidationErrors={setValidationErrors} 
        onActionRefreshTable={() => refetch()}       
      />
      {isMobile && <ButtonActions title="New" onClick={() => { setIsOpen(true); setEdit(null); }} />}
      <CustomerModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={onSubmit} isLoading={mutation.isPending} edit={edit} />
    </Paper>
  );
};

export default CustomerPage;