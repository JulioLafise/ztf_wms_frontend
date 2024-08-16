import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper, Box, Typography, Divider } from '@mui/material';
import { FactCheck } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import _ from 'lodash';
import * as Yup from 'yup';
import { MasterEntryEntity, DetailEntryEntity } from '@wms/entities';
import { IOnSaveAndEditRows, IValidationErrors, ComboBoxSelectTable } from '@wms/interfaces';
import { useAlertNotification, useProduct, useProductStatus, useMasterEntry } from '@wms/hooks';
import { MaterialTable, TextFieldHF, DecimalNumberFormat } from '@wms/components';
import { paginateArray, Validator, GeneratedData } from '@wms/helpers';

interface IPropsDetail {
  setDataGeneral: React.Dispatch<React.SetStateAction<ImportExcelProps>>,
  dataGeneral: ImportExcelProps,
  masterEntryId?: number
}

type ImportExcelProps = {
  dataHeader: MasterEntryEntity,
  dataDetail: DetailEntryEntity[],
  dataImport: any[]
};

interface IForm {
  quanty: number,
  subTotal: number,
  total: number,
}

const defaultValues: IForm = {
  quanty: 0,
  subTotal: 0,
  total: 0,
};

interface ISchemaValidationTable {
  productId?: number,
  lot?: string,
  serie?: string,
  price?: number,
  quanty?: number,
  productStatusId?: number,
  description?: string,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  productId: Yup.number().required('Product is required'),
  lot: Yup.string().required('Lot is required'),
  serie: Yup.string().required('Serie is required'),
  price: Yup.number().required('Price is required'),
  quanty: Yup.number().required('Quanty is required'),
  productStatusId: Yup.number().required('Product Status is required'),
  description: Yup.string().notRequired(),
  isActive: Yup.boolean().notRequired()
});

type ComboBoxItems = { products: object[], status: object[] };

const DetailEntry: React.FC<IPropsDetail> = (props) => {
  const { dataGeneral, setDataGeneral, masterEntryId } = props;
  const { swalToastSuccess, swalToastQuestion, swalToastError, swalToastWait } = useAlertNotification();
  const [selectData, setSelectData] = React.useState<ComboBoxSelectTable<ComboBoxItems>>({
    products: [],
    status: []
  });
  const [ref, setRef] = React.useState<MRT_TableInstance<DetailEntryEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowData, setRowData] = React.useState<DetailEntryEntity[]>([]);
  const paginateData = React.useMemo(() => paginateArray(rowData, pagination.pageSize, pagination.pageIndex), [rowData, pagination]);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});
  const methods = useForm({
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const { reset, watch } = methods;

  const { useProductListQuery } = useProduct();
  const { useProductStatusListQuery } = useProductStatus();
  const { useMasterEntryDeleteDetailMutation } = useMasterEntry();

  const { data: dataProduct } = useProductListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const { data: dataProductStatus } = useProductStatusListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const mutationDetailDelete = useMasterEntryDeleteDetailMutation({ typeMutation: 'delete' });

  const columns = React.useMemo<MRT_ColumnDef<DetailEntryEntity>[]>(() => [
    {
      id: 'detailEntryId',
      accessorKey: 'detailEntryId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'masterEntryId',
      accessorKey: 'masterEntryId',
      header: 'Master ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'productId',
      accessorKey: 'productId',
      accessorFn: (row) => row.product?.productId,
      header: 'Producto',
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.productId,
        helperText: validationErrors.productId
      },
      editSelectOptions: selectData.products,
      Cell: ({ row }) => <div className="flex items-center h-12 w-96"><p className="text-wrap break-all">{String(row.original.product?.description).slice(0,105)}{String(row.original.product?.description).length >= 104 ? '...' : ''}</p></div>
    },
    {
      id: 'lot',
      accessorKey: 'lot',
      header: 'Codigo Lote',
      enableEditing: true,
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.lot,
        helperText: validationErrors.lot
      },
    },
    {
      id: 'serie',
      accessorKey: 'serie',
      header: 'Numero Serie',
      enableEditing: true,
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.serie,
        helperText: validationErrors.serie
      },
    },
    {
      id: 'price',
      accessorKey: 'price',
      header: 'Costo',
      enableEditing: true,
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.price,
        helperText: validationErrors.price,
        InputProps: {
          inputComponent: DecimalNumberFormat
        }
      },
    },
    {
      id: 'quanty',
      accessorKey: 'quanty',
      header: 'Cantidad',
      minSize: 150,
      enableEditing: true,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.quanty,
        helperText: validationErrors.quanty,
        InputProps: {
          inputComponent: DecimalNumberFormat
        }
      },
    },
    {
      id: 'productStatusId',
      accessorKey: 'productStatusId',
      accessorFn: (row) => row.productStatus?.productStatusId,
      header: 'Estado', 
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.productStatusId,
        helperText: validationErrors.productStatusId
      },
      editSelectOptions: selectData.status,
      Cell: ({ row }) => <span>{row.original.productStatus?.description}</span>
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Observaciones',
      minSize: 150,
      enableEditing: true,
      Cell: ({ renderedCellValue }) => <div className="flex items-center h-12 w-96"><p className="text-wrap break-all">{String(renderedCellValue).slice(0,105)}{String(renderedCellValue).length >= 104 ? '...' : ''}</p></div>
    },
  ], [validationErrors, selectData]);

  const onSaveOrEdit: IOnSaveAndEditRows<DetailEntryEntity> = async (row, table, values, validation): Promise<void> => {
    let validateValues ={ ...values };
    if (dataGeneral.dataHeader.category?.description?.indexOf('LAPTOP') > -1 || dataGeneral.dataHeader.category?.description?.indexOf('PC') > -1) {
      validateValues = { ...values, quanty: 1 };
    }
    const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data: validateValues });
    if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.detailEntryId ? true : false); return; }
    setValidationErrors({});
    validation!({})(table, row.original.detailEntryId ? true : false);
    const product = dataProduct.filter(ft => ft.productId === values.productId)[0];
    const productStatus = dataProductStatus.filter(ft => ft.productStatusId === values.productStatusId)[0];
    const data: any = {
      ...validateValues,
      product,
      productStatus,
      masterEntryId: 0,
      detailEntryId: row.original.detailEntryId || GeneratedData.getRandomInt(3000),
      isNew: true,
      // isNew: !row.original.detailEntryId,
    };
    setRowData(prevState => [
      ...prevState.filter(ft => ft.detailEntryId !== row.original.detailEntryId),
      data
    ]);
    setDataGeneral(prevState => ({
      ...prevState,
      dataDetail: [...prevState.dataDetail.filter(ft => ft.detailEntryId !== data.detailEntryId), data]
    }));
  };

  const onDelete = async (values: { [key: string]: any }) => {
    setRowData(prevState => [
      ...prevState.filter(ft => ft.detailEntryId != values.detailEntryId)
    ]);
    setDataGeneral(prevState => ({
      ...prevState,
      dataDetail: [...dataGeneral.dataDetail.filter(ft => ft.detailEntryId !== values.detailEntryId)]
    }));
    swalToastSuccess('Delete item', {
      message: 'Success',
      timer: 2000
    });
  };

  const onClearTable = (table: MRT_TableInstance<DetailEntryEntity>) => {
    swalToastQuestion('Clear Data Detail', {
      message: 'Are you sure you want clear data?',
      showConfirmButton: true,
      confirmButtonText: 'Clear',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        swalToastWait('Clear Data', {
          message: 'Please wait a few minutes',
          showLoading: true,
        });
        if (masterEntryId) {
          mutationDetailDelete.mutateAsync({ masterEntryId })
            .then(() => {
              swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
              setRowData([]);
              setDataGeneral(prevState => ({ ...prevState, dataDetail: [] }));
            })
            .catch(err => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
        } else {
          setRowData([]);
          setDataGeneral(prevState => ({ ...prevState, dataDetail: [] }));
        }
      }
    });      
  };

  React.useEffect(() => {
    const isImport = _.get(dataGeneral, 'dataImport', []).length > 0;
    setRowData(isImport && _.get(dataGeneral, 'dataImport', []) || _.get(dataGeneral, 'dataDetail', []));
    if (dataGeneral.dataHeader.category?.description?.indexOf('LAPTOP') > -1 || dataGeneral.dataHeader.category?.description?.indexOf('PC') > -1) {
      if (ref) {
        ref.setColumnVisibility(obj => ({ ...obj, quanty: false}));
      }
    }
    isImport && setDataGeneral(prevStates => ({
      ...prevStates,
      dataDetail: _.get(dataGeneral, 'dataImport', []),
      dataImport: []
    }));
  }, [dataGeneral.dataHeader, dataGeneral.dataImport, ref]);

  React.useEffect(() => {
    let quanty = 0;
    let prices = 0;
    rowData.forEach(item => {
      quanty += Number(item.quanty) || 0;
      prices += Number(item.price) || 0;
    });
    const subTotal = quanty * prices;
    const data = {
      quanty,
      subTotal,
      total: subTotal
    };
    reset(data || defaultValues);
  }, [rowData]);

  
  React.useEffect(() => {
    if (dataProduct) {
      setSelectData(oldData => ({ ...oldData, products: dataProduct.map(obj => ({ label: obj.description, value: obj.productId })) }));
    }
    if (dataProductStatus) {
      setSelectData(oldData => ({ ...oldData, status: dataProductStatus.map(obj => ({ label: obj.description, value: obj.productStatusId })) }));
    }
  }, [dataProduct, dataProductStatus]);

  return (
    <React.Fragment>
      <Paper elevation={4} sx={{ mb: 2 }}>
        <Box component="section" className="flex items-center gap-2 p-2">
          <FactCheck color="primary" />
          <Typography variant="h6" fontWeight="bold">Detail Entry</Typography>
        </Box>
        <Divider variant="inset" />
        <FormProvider {...methods}>
          <form noValidate className="p-4 flex gap-2 w-full">
            <TextFieldHF
              name="quanty"
              label="Cantidad"
              className="w-2/6"
              mask="decimal"
              readOnly
            />
            <TextFieldHF
              name="subTotal"
              label="Sub Total"
              className="w-2/6"
              mask="decimal"
              readOnly
            />
            <TextFieldHF
              name="total"
              label="Total"
              className="w-2/6"
              mask="decimal"
              readOnly
            />
          </form>
        </FormProvider>
      </Paper>
      <Paper elevation={4}>
        <MaterialTable<DetailEntryEntity>
          columns={columns}
          data={paginateData || []}
          enableRowActions
          isEditing
          columnsVisible={{ detailEntryId: false, masterEntryId: false }}
          setRef={setRef}
          pagination={pagination}
          rowCount={rowData.length}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          onActionEdit={onSaveOrEdit}
          onActionSave={onSaveOrEdit}
          onActionDelete={(row) => onDelete(row.original)}
          onActionClearTable={onClearTable}
          isLoading={false}
          isGenerate={true}
          isError={false}
          setValidationErrors={setValidationErrors}
        />
      </Paper>
    </React.Fragment>
  );
};

export default DetailEntry;