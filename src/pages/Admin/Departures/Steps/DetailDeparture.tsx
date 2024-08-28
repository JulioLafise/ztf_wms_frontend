import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { Paper, Box, Typography, Divider } from '@mui/material';
import { FactCheck } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import _ from 'lodash';
import * as Yup from 'yup';
import { MasterDepartureEntity, DetailDepartureEntity } from '@wms/entities';
import { IOnSaveAndEditRows, IValidationErrors, ComboBoxSelectTable } from '@wms/interfaces';
import {
  useAlertNotification,
  useInventory,
  useProductStatus,
  useProduct,
  useMasterPurchaseOrder
} from '@wms/hooks';
import { MaterialTable, TextFieldHF, DecimalNumberFormat } from '@wms/components';
import { paginateArray, Validator, GeneratedData } from '@wms/helpers';

interface IPropsDetail {
  setDataGeneral: React.Dispatch<React.SetStateAction<ImportExcelProps>>,
  dataGeneral: ImportExcelProps,
  masterDepartureId?: number
}

type ImportExcelProps = {
  dataHeader: MasterDepartureEntity,
  dataDetail: DetailDepartureEntity[],
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
  inventoryId?: number,
  lot?: string,
  serie?: string,
  // price?: number,
  quanty?: number,
  productStatusId?: number,
  description?: string,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  inventoryId: Yup.number().required('Product is required'),
  lot: Yup.string().notRequired(),
  serie: Yup.string().notRequired(),
  // price: Yup.number().required('Price is required'),
  quanty: Yup.number().required('Quanty is required'),
  productStatusId: Yup.number().required('Product Status is required'),
  description: Yup.string().notRequired(),
  isActive: Yup.boolean().notRequired()
});

type ComboBoxItems = { products: object[], status: object[] };

const DetailDeparture: React.FC<IPropsDetail> = (props) => {
  const { dataGeneral, setDataGeneral, masterDepartureId } = props;
  const { swalToastSuccess, swalToastQuestion, swalToastError, swalToastWait } = useAlertNotification();
  const [selectData, setSelectData] = React.useState<ComboBoxSelectTable<ComboBoxItems>>({
    products: [],
    status: []
  });
  const [ref, setRef] = React.useState<MRT_TableInstance<DetailDepartureEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowData, setRowData] = React.useState<DetailDepartureEntity[]>([]);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});
  const paginateData = React.useMemo(() => paginateArray(rowData, pagination.pageSize, pagination.pageIndex), [rowData, pagination]);
  const methods = useForm({
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const { reset, watch } = methods;

  const { useProductListQuery } = useProduct();
  const { useInventoryDepartureListQuery } = useInventory();
  const { useProductStatusListQuery } = useProductStatus();
  const { useMasterPurchaseOrderListQuery } = useMasterPurchaseOrder();

  const { data: dataInventory } = useInventoryDepartureListQuery();
  const { data: dataProduct } = useProductListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const { data: dataProductStatus } = useProductStatusListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });
  const { data: dataPurchaseOrder } = useMasterPurchaseOrderListQuery({ pageIndex: 0, pageSize: 100, filter: '' });

  const columns = React.useMemo<MRT_ColumnDef<DetailDepartureEntity>[]>(() => [
    {
      id: 'detailDepartureId',
      accessorKey: 'detailDepartureId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'masterDepartureId',
      accessorKey: 'masterDepartureId',
      header: 'Master ID',
      enableEditing: false,
      minSize: 150,
    },
    // {
    //   id: 'productId',
    //   accessorKey: 'productId',
    //   header: 'Inventory ID',
    //   enableEditing: false,
    //   minSize: 150,
    // },
    {
      id: 'inventoryId',
      accessorKey: 'inventoryId',
      accessorFn: (row) => row.inventoryId,
      header: 'Producto',
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.inventoryId,
        helperText: validationErrors.inventoryId
      },
      editSelectOptions: selectData.products,
      Cell: ({ row }) => <div className="flex items-center h-12 w-96"><p className="text-wrap break-all">{String(row.original.product?.description).slice(0,105)}{String(row.original.product?.description).length >= 104 ? '...' : ''}</p></div>
    },
    {
      id: 'lot',
      accessorKey: 'lot',
      header: 'Codigo Lote',
      enableEditing: false,
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
      enableEditing: false,
      minSize: 150,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.serie,
        helperText: validationErrors.serie
      },
    },
    // {
    //   id: 'price',
    //   accessorKey: 'price',
    //   header: 'Precio',
    //   enableEditing: true,
    //   minSize: 150,
    //   muiEditTextFieldProps: {      
    //     required: true,
    //     error: !!validationErrors.price,
    //     helperText: validationErrors.price,
    //     InputProps: {
    //       inputComponent: DecimalNumberFormat
    //     }
    //   },
    // },
    {
      id: 'quanty',
      accessorKey: 'quanty',
      header: 'Cantidad',
      minSize: 150,
      enableEditing: false,
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

  const onSaveOrEdit: IOnSaveAndEditRows<DetailDepartureEntity> = async (row, table, values, validation): Promise<void> => {
    let validateValues = { ...values };
    // if (dataGeneral.dataHeader.category?.description?.indexOf('LAPTOP') > -1 || dataGeneral.dataHeader.category?.description?.indexOf('PC') > -1) {
    const productId = dataInventory.filter(ft => ft.inventoryId === values.inventoryId)[0].product?.productId;
    validateValues = {
      ...values,
      quanty: 1,
      price: 0,
      serie: dataInventory.filter(ft => ft.inventoryId === values.inventoryId)[0].serie || '',
      lot: dataInventory.filter(ft => ft.inventoryId === values.inventoryId)[0].ticket || ''
    };
    console.log(validateValues);
    // }
    const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data: validateValues });
    if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.detailDepartureId ? true : false); return; }
    setValidationErrors({});
    validation!({})(table, row.original.detailDepartureId ? true : false);
    const product = dataProduct.filter(ft => ft.productId === productId)[0];
    const productStatus = dataProductStatus.filter(ft => ft.productStatusId === values.productStatusId)[0];
    const data: any = {
      ...validateValues,
      product,
      productStatus,
      masterDepartureId: 0,
      detailDepartureId: row.original.detailDepartureId || GeneratedData.getRandomInt(3000),
      isNew: true,
      // isNew: !row.original.detailDepartureId,
    };
    setRowData(prevState => [
      ...prevState.filter(ft => ft.detailDepartureId !== row.original.detailDepartureId),
      data
    ]);
    setDataGeneral(prevState => ({
      ...prevState,
      dataDetail: [...prevState.dataDetail.filter(ft => ft.detailDepartureId !== data.detailDepartureId), data]
    }));
  };

  const onDelete = async (values: { [key: string]: any }) => {
    setRowData(prevState => [
      ...prevState.filter(ft => ft.detailDepartureId != values.detailDepartureId)
    ]);
    setDataGeneral(prevState => ({
      ...prevState,
      dataDetail: [...dataGeneral.dataDetail.filter(ft => ft.detailDepartureId !== values.detailDepartureId)]
    }));
    swalToastSuccess('Delete item', {
      message: 'Success',
      timer: 2000
    });
  };

  const onClearTable = (table: MRT_TableInstance<DetailDepartureEntity>) => {
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
        if (masterDepartureId) {
          swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
          setRowData([]);
          setDataGeneral(prevState => ({ ...prevState, dataDetail: [] }));
          // mutationDetailDelete.mutateAsync({ masterDepartureId })
          //   .then(() => {
          //     swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
          //     setRowData([]);
          //     setDataGeneral(prevState => ({ ...prevState, dataDetail: [] }));
          //   })
          //   .catch(err => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
        } else {
          swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
          setRowData([]);
          setDataGeneral(prevState => ({ ...prevState, dataDetail: [] }));
        }
      }
    });      
  };

  React.useEffect(() => {
    const isImport = _.get(dataGeneral, 'dataImport', []).length > 0;
    setRowData(isImport && _.get(dataGeneral, 'dataImport', []) || _.get(dataGeneral, 'dataDetail', []));
    // if (dataGeneral.dataHeader.category?.description?.indexOf('LAPTOP') > -1 || dataGeneral.dataHeader.category?.description?.indexOf('PC') > -1) {
    //   if (ref) {
    //     ref.setColumnVisibility(obj => ({ ...obj, quanty: false}));
    //   }
    // }
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
    if (dataInventory) {
      if (Validator.isObjectEmpty(dataGeneral.dataHeader.purchaseOrder)) {
        setSelectData(oldData => ({ ...oldData, products: dataInventory.map(obj => ({ label: obj.product?.name, value: obj.inventoryId })) }));
      } else {
        const productId = dataGeneral.dataHeader.purchaseOrder.productId;
        setSelectData(oldData => ({ ...oldData, products: dataInventory.filter(ft => ft.product.productId === productId).map(obj => ({ label: obj.product?.name, value: obj.inventoryId })) }));
      }
    }
    if (dataProductStatus) {
      setSelectData(oldData => ({ ...oldData, status: dataProductStatus.map(obj => ({ label: obj.description, value: obj.productStatusId })) }));
    }
  }, [dataInventory, dataProductStatus]);

  return (
    <React.Fragment>
      <Paper elevation={4} sx={{ mb: 2 }}>
        <Box component="section" className="flex items-center gap-2 p-2">
          <FactCheck color="primary" />
          <Typography variant="h6" fontWeight="bold">Detail Departure</Typography>
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
        <MaterialTable<DetailDepartureEntity>
          columns={columns}
          data={paginateData || []}
          enableRowActions
          isEditing
          columnsVisible={{ detailDepartureId: false, masterDepartureId: false }}
          setRef={setRef}
          pagination={pagination}
          rowCount={rowData.length}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          onActionEdit={onSaveOrEdit}
          onActionSave={onSaveOrEdit}
          onActionClearTable={onClearTable}
          onActionDelete={(row) => onDelete(row.original)}
          isLoading={false}
          isGenerate={true}
          isError={false}
          setValidationErrors={setValidationErrors}
        />
      </Paper>
    </React.Fragment>
  );
};

export default DetailDeparture;