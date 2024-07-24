import React from 'react';
import type { MRT_ColumnDef, MRT_TableInstance, MRT_RowData } from 'material-react-table';
import * as Yup from 'yup';
import { IOnSaveAndEditRows, IValidationErrors, ComboBoxSelectTable } from '@wms/interfaces';
import { MaterialTable } from '@wms/components';
import { useAlertNotification, useCategory } from '@wms/hooks';
import { KitDetailEntity, ProductDetailEntity } from '@wms/entities';
import { Validator, paginateArray, GeneratedData } from '@wms/helpers';

interface IProps {
  rowData: ProductDetailEntity[]
  setRowData: React.Dispatch<React.SetStateAction<ProductDetailEntity[]>>,
  categoryId: number,
  disabled?: boolean
}

interface ISchemaValidationTable {
  description?: string,
  kitDetailId?: number,
  isActive?: Yup.Maybe<boolean>
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  kitDetailId: Yup.number().required('Feature is required'),
  isActive: Yup.boolean().notRequired()
});

type ComboBoxItems = { kits: object[], };

const DetailProduct: React.FC<IProps> = (props) => {
  const { rowData, setRowData, disabled, categoryId } = props;
  const { swalToastSuccess } = useAlertNotification();
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});
  const [ref, setRef] = React.useState<MRT_TableInstance<ProductDetailEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [selectData, setSelectData] = React.useState<ComboBoxSelectTable<ComboBoxItems>>({
    kits: [],
  });
  const paginateData = React.useMemo(() => paginateArray(rowData, pagination.pageSize, pagination.pageIndex), [rowData, pagination]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { useCategoryKitListQuery } = useCategory();
  const { data: kitData} = useCategoryKitListQuery({ categoryId });
  const kitDetailData = React.useMemo(() => {
    let data: KitDetailEntity[] = [];
    if (kitData?.length) {
      kitData.forEach(values => {
        data = [
          ...data,
          ...values.details!
        ];
      });
    }
    return data;
  }, [kitData]);

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
        helperText: validationErrors.description,
      },
    },
    {
      id: 'kitDetailId',
      accessorKey: 'kitDetailId',
      accessorFn: (row) => row.kitDetail?.kitDetailId,
      header: 'Caracteristica', 
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.kitDetailId,
        helperText: validationErrors.kitDetailId,
      },
      editSelectOptions: selectData.kits,
      Cell: ({ row }) => <p>({row.original.kitDetail?.kitName}) {row.original.kitDetail?.feature?.description}</p>
    },
  ], [validationErrors, selectData]);

  const onSaveOrEdit: IOnSaveAndEditRows<ProductDetailEntity> = async (row, table, values, validation): Promise<void> => {
    const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data: values });
    if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.productDetailId ? true : false); return; }
    setValidationErrors({});
    validation!({})(table, row.original.productDetailId ? true : false);
    const kitDetail: KitDetailEntity = kitDetailData.filter(ft => ft.kitDetailId === values.kitDetailId)[0];
    setRowData(prevState => [
      ...prevState.filter(ft => ft.productDetailId !== row.original.productDetailId),
      {
        ...row.original,
        ...values,
        productDetailId: row.original.productDetailId || GeneratedData.getRandomInt(3000),
        kitDetail
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
    if (kitDetailData) {
      setSelectData(oldData => ({ ...oldData, kits: kitDetailData.map(obj => ({ label: `(${obj.kitName}) ${obj.feature?.description}`, value: obj.kitDetailId })) }));
    }
  }, [kitDetailData]);

  return (
    <MaterialTable<ProductDetailEntity>
      columns={columns}
      data={paginateData|| []}
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
      isLoading={false}
      isGenerate={true}
      isError={false}
      setValidationErrors={setValidationErrors}  
    />
  );
};

export default DetailProduct;