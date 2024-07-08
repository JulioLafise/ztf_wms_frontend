import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance, MRT_RowData } from 'material-react-table';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { IOnSaveAndEditRows, IValidationErrors, ComboBoxSelectTable } from '@wms/interfaces';
import { MaterialTable } from '@wms/components';
import { useAlertNotification, useFeatures, useProduct } from '@wms/hooks';
import { ProductDetailEntity } from '@wms/entities';
import { Validator, pagintateArray } from '@wms/helpers';

interface IProps {
  rowData: ProductDetailEntity[]
  setRowData: React.Dispatch<React.SetStateAction<ProductDetailEntity[]>>,
  productId?: number,
  disabled?: boolean
}

interface ISchemaValidationTable {
  description?: string,
  productId?: number,
  featureId?: number,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  productId: Yup.number().required('Brand is required'),
  featureId: Yup.number().required('Feature is required'),
  isActive: Yup.boolean().notRequired()
});

type ComboBoxItems = { features: object[], products: object[] };

const DetailProduct: React.FC<IProps> = (props) => {
  const { rowData, setRowData, disabled, productId } = props;
  const { swalToastSuccess } = useAlertNotification();
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});
  const [ref, setRef] = React.useState<MRT_TableInstance<ProductDetailEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [selectData, setSelectData] = React.useState<ComboBoxSelectTable<ComboBoxItems>>({
    features: [],
    products: []
  });
  const paginateData = React.useMemo(() => pagintateArray(rowData, pagination.pageSize, pagination.pageIndex), [rowData, pagination]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { useFeaturesListQuery } = useFeatures();
  const { useProductListQuery } = useProduct();
  const { data: featureData } = useFeaturesListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: productData } = useProductListQuery({ pageIndex: 0, pageSize: 100, filter: '' });

  const columns = React.useMemo<MRT_ColumnDef<ProductDetailEntity>[]>(() => [
    {
      id: 'productDetailId',
      accessorKey: 'productDetailId',
      header: 'ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Descripcion',
      minSize: 150,
      enableEditing: true,
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.description,
        helperText: validationErrors.description
      },
    },
    {
      id: 'productId',
      accessorKey: 'productId',
      accessorFn: (row) => row.productId,
      header: 'Producto',
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.productId,
        helperText: validationErrors.productId
      },
      editSelectOptions: selectData.products,
      Cell: ({ renderedCellValue }) => <>{productData?.filter(ft => ft.productId === renderedCellValue)[0].name || renderedCellValue}</>
    },
    {
      id: 'featureId',
      accessorKey: 'featureId',
      accessorFn: (row) => row.featureId,
      header: 'Caracteristica', 
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.featureId,
        helperText: validationErrors.featureId
      },
      editSelectOptions: selectData.features,
      Cell: ({ renderedCellValue }) => <>{featureData?.filter(ft => ft.featuresId === renderedCellValue)[0].description || renderedCellValue}</>
    },
  ], [validationErrors, selectData]);

  const onSaveOrEdit: IOnSaveAndEditRows<ProductDetailEntity> = async (row, table, values, validation): Promise<void> => {
    const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data: values });
    if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.productDetailId ? true : false); return; }
    setValidationErrors({});
    validation!({})(table, row.original.productDetailId ? true : false);
    setRowData(prevState => [
      ...prevState,
      {
        ...values,
        productDetailId: uuid(),
      }
    ]);
  };

  const onDelete = async (values: { [key: string]: any }) => {
    setRowData(prevState => [
      ...prevState.filter(ft => ft.productDetailId != values.productDetailId)
    ]);
    swalToastSuccess('Delete item', {
      message: 'Success',
      timer: 2000
    });
  };

  React.useEffect(() => {
    if (productData) {
      setSelectData(oldData => ({ ...oldData, products: productData.map(obj => ({ label: obj.name, value: obj.productId })) }));
    }
    if (featureData) {
      setSelectData(oldData => ({ ...oldData, features: featureData.map(obj => ({ label: obj.description, value: obj.featuresId })) }));
    }
  }, [productData, featureData]);

  React.useEffect(() => { console.log(paginateData); }, [paginateData]);

  return (
    <MaterialTable<ProductDetailEntity>
      columns={columns}
      data={paginateData || []}
      enableRowActions={!disabled || false}
      isEditing={!disabled || false}
      columnsVisible={{ productDetailId: false }}
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
  );
};

export default DetailProduct;