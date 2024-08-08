import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { Paper, Box, Typography, Divider } from '@mui/material';
import { FactCheck } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { MasterEntryEntity, DetailEntryEntity } from '@wms/entities';
import { IOnSaveAndEditRows, IValidationErrors } from '@wms/interfaces';
import { useAlertNotification, useProduct, useProductStatus } from '@wms/hooks';
import { MaterialTable, TextFieldHF } from '@wms/components';
import { paginateArray } from '@wms/helpers';
import _ from 'lodash';
interface IPropsDetail {
  setDataGeneral: React.Dispatch<React.SetStateAction<ImportExcelProps>>,
  dataGeneral: ImportExcelProps,
  openImport: boolean
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

const DetailEntry: React.FC<IPropsDetail> = (props) => {
  const { swalToastSuccess } = useAlertNotification();
  const navigate = useNavigate();
  const [ref, setRef] = React.useState<MRT_TableInstance<DetailEntryEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const { dataGeneral, setDataGeneral, openImport } = props;
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowData, setRowData] = React.useState<DetailEntryEntity[]>([]);
  const paginateData = React.useMemo(() => paginateArray(rowData, pagination.pageSize, pagination.pageIndex), [rowData, pagination]);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<object>>({});
  const methods = useForm({
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });

  const { reset, watch } = methods;
  const formValues = watch();

  const {
    useProductListQuery
  } = useProduct();

  const {
    data
  } = useProductListQuery({ filter: '', pageIndex: 0, pageSize: 1000 });

  const columns = React.useMemo<MRT_ColumnDef<DetailEntryEntity>[]>(() => [
    {
      id: 'detailEntryId',
      accessorKey: 'detailEntryId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'product',
      accessorKey: 'product',
      accessorFn: (row) => row.product?.productId,
      header: 'Producto',
      minSize: 150,
      editVariant: 'select',
      editSelectOptions: [{ label: 'Laptops #1', value: 'Laptops #1' }, { label: 'Laptops #2', value: 'Laptops #2' }]
    },
    {
      id: 'lot',
      accessorKey: 'lot',
      header: 'Codigo Lote',
      enableEditing: true,
      minSize: 150,
    },
    {
      id: 'serie',
      accessorKey: 'serie',
      header: 'Numero Serie',
      enableEditing: true,
      minSize: 150,
    },
    {
      id: 'price',
      accessorKey: 'price',
      header: 'Precio',
      enableEditing: true,
      minSize: 150,
    },
    {
      id: 'quanty',
      accessorKey: 'quanty',
      header: 'Cantidad',
      minSize: 150,
    },
    {
      id: 'productStatus',
      accessorKey: 'productStatus',
      accessorFn: (row) => row.productStatus?.productStatusId,
      header: 'Estado', 
      minSize: 150,
      editVariant: 'select',
      editSelectOptions: [{ label: 'Bueno', value: 'Bueno' }, { label: 'Regular', value: 'Regular' }, { label: 'Malo', value: 'Malo' }]
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Observaciones',
      minSize: 150,
      enableEditing: true,
    },
  ], [validationErrors]);

  const onSaveOrEdit: IOnSaveAndEditRows<any> = async (row, table, values, validation): Promise<void> => {
    console.log(values);
    setRowData(prevState => [
      ...prevState,
      {
        ...values,
        detailEntryId: uuid(),
      }
    ]);
    setDataGeneral(prevState => ({ ...prevState, dataDetail: [...dataGeneral.dataDetail, { ...values, detailEntryId: uuid()}] }));
    setValidationErrors({});
    validation!({})(table, row.original.pedidoDetalleId ? true : false);
  };

  const onDelete = async (values: { [key: string]: any }) => {
    setRowData(prevState => [
      ...prevState.filter(ft => ft.detailEntryId != values.detailEntryId)
    ]);
    swalToastSuccess('Delete item', {
      message: 'Success',
      timer: 2000
    });
  };

  React.useEffect(() => {
    let quanty = 0;
    let prices = 0;
    rowData.forEach(item => {
      quanty += item.quanty;
      prices += item.price;
    });
    const subTotal = quanty * prices;
    const data = {
      quanty,
      subTotal,
      total: subTotal
    };
    reset(data || defaultValues);
  }, [rowData]);

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
          data={openImport ? _.get(dataGeneral, 'dataImport', []) : paginateData || []}
          enableRowActions
          isEditing
          columnsVisible={{ detailEntryId: false }}
          setRef={setRef}
          pagination={pagination}
          rowCount={rowData.length}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          onActionEdit={onSaveOrEdit}
          onActionSave={onSaveOrEdit}
          onActionDelete={(row) => onDelete(row.original)}
          // onActionRefreshTable={() => refetch()}
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