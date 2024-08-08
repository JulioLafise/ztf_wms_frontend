import React from 'react';
import {
  Box,
  Divider,
  Paper,
  Tooltip,
  Typography
} from '@mui/material';
import {
  ArrowBack,
  CheckBox,
  CheckBoxOutlineBlank,
  CheckCircle,
  CheckCircleOutline,
  PrecisionManufacturing,
  Save
} from '@mui/icons-material';
import { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextFieldHF,
  AutoCompleteHF,
  MaterialTable,
  ButtonActions
} from '@wms/components';
import { CategoryEntity, KitDetailEntity, KitEntity } from '@wms/entities';
import {
  IValidationErrors,
  ComboBoxSelectTable,
  IOnSaveAndEditRows,
  IOptionsQuery
} from '@wms/interfaces';
import {
  useAlertNotification,
  useUI,
  useFeatures,
  useCategory,
  useKit
} from '@wms/hooks';
import { paginateArray, Validator, GeneratedData } from '@wms/helpers';

interface IForm {
  description: string,
  category: object | null,
  isActive: Yup.Maybe<boolean>
}

const defaultValues: IForm = {
  description: '',
  category: null,
  isActive: true
};

const schemaValidationForm: Yup.ObjectSchema<IForm> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  category: Yup.object<CategoryEntity>().nullable().required('Feature is required'),
  isActive: Yup.boolean().notRequired()
});

interface ISchemaValidationTable {
  description?: string,
  featuresId?: number
}

const schemaValidationTable: Yup.ObjectSchema<ISchemaValidationTable> = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  featuresId: Yup.number().required('Feature is required')
});

type ComboBoxItems = { features: object[] };

const AddKitPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isMobile, isSideBarOpen } = useUI();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaValidationForm),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const {
    handleSubmit,
    reset,
    watch,
    setError,
    setFocus
  } = methods;
  const formValues = watch();
  const { swalToastSuccess, swalToastError, swalToastWait, swalToastInfo } = useAlertNotification();
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [lock, setLock] = React.useState<boolean>(false);
  const [rowData, setRowData] = React.useState<KitDetailEntity[]>([]);
  const [validationErrors, setValidationErrors] = React.useState<IValidationErrors<ISchemaValidationTable>>({});
  const [ref, setRef] = React.useState<MRT_TableInstance<KitDetailEntity>>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [selectData, setSelectData] = React.useState<ComboBoxSelectTable<ComboBoxItems>>({
    features: []
  });
  const paginateData = React.useMemo(() => paginateArray(rowData, pagination.pageSize, pagination.pageIndex), [rowData, pagination]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const { useKitQuery, useKitMutation } = useKit();
  const { useFeaturesListQuery } = useFeatures();
  const { useCategoryListQuery } = useCategory();
  const { data: featureData } = useFeaturesListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: categoryData, isLoading: isLoadingCategory } = useCategoryListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: kitData, isRefetching, refetch } = useKitQuery({ kitId: Number(params.kitId) || 0 });
  const mutation = useKitMutation(undefined, optionsQuery);

  const columns = React.useMemo<MRT_ColumnDef<KitDetailEntity>[]>(() => [
    {
      id: 'kitDetailId',
      accessorKey: 'kitDetailId',
      header: 'Detail ID',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'kitId',
      accessorKey: 'kitId',
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
      id: 'featuresId',
      accessorKey: 'featuresId',
      accessorFn: (row) => row.feature?.featuresId,
      header: 'Caracteristica', 
      minSize: 150,
      editVariant: 'select',
      muiEditTextFieldProps: {      
        required: true,
        error: !!validationErrors.featuresId,
        helperText: validationErrors.featuresId
      },
      editSelectOptions: selectData.features,
      Cell: ({ row }) => <>{row.original.feature?.description}</>
    },
    {
      id: 'isActive',
      accessorKey: 'isActive',
      header: 'Activo',
      minSize: 150,
      enableEditing: false,
      Cell: ({ renderedCellValue }) => renderedCellValue ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />,
    },
  ], [validationErrors, selectData]);

  const onSubmit = (values: { [key: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.kitId ? 'put' : 'post'
    });
    const isPost = values.kitId ? false : true;
    const title = values.kitId ? 'Updating Product!' : 'Saving Product!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    const data: KitEntity = {
      ...values,
      details: rowData
    };
    mutation.mutateAsync(data)
      .then(resp => {
        if (isPost) {
          navigate(`/app/catalogue/product-kit/${resp.kitId}/edit`, { replace: true });
        } else {
          refetch();
        }
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
      })
      .catch((err) => {
        swalToastError(err.message, { showConfirmButton: false, timer: 3000 });
        if (String(err.message).indexOf('Duplicate') >= 0) {
          setError('description', err.message);
          setFocus('description');
        }
      });
  };

  const onSaveOrEdit: IOnSaveAndEditRows<KitDetailEntity> = async (row, table, values, validation): Promise<void> => {
    const [isPassed, errors] = await Validator.yupSchemaValidation({ schema: schemaValidationTable, data: values });
    if (!isPassed) { setValidationErrors(errors); validation!(errors)(table, row.original.kitDetailId ? true : false); return; }
    setValidationErrors({});
    validation!({})(table, row.original.kitDetailId ? true : false);
    setRowData(prevState => [
      ...prevState.filter(ft => ft.kitDetailId !== row.original.kitDetailId),
      {
        ...row.original,
        ...values,
        feature: {
          featuresId: values.featuresId,
          description: featureData?.filter(ft => ft.featuresId === values.featuresId)[0].description
        },
        kitId: row.original.kitId || 0,
        kitDetailId: row.original.kitDetailId || GeneratedData.getRandomInt(3000),
        isNew: !row.original.kitDetailId,
        isActive: row.original.isActive || true
      }
    ]);
  };

  const onDelete = async (values: { [key: string]: any }) => {
    if (!values.isNew) {
      swalToastInfo('Delete is not allowed',{
        message: 'The record has already been saved',
        timer: 2500
      });
      return;
    }
    setRowData(prevState => [
      ...prevState.filter(ft => ft.kitDetailId != values.kitDetailId)
    ]);
    swalToastSuccess('Delete item', {
      message: 'Success',
      timer: 2000
    });
  };

  const onChangeState = async (values: { [key: string]: any }) => {
    setRowData(prevState => [
      ...prevState.filter(ft => ft.kitDetailId != values.kitDetailId),
      {
        ...values,
        isActive: !values.isActive
      }
    ]);
    swalToastSuccess('Finished', {
      timer: 2000
    });
  };

  React.useEffect(() => {
    if (!Validator.isObjectEmpty(params)) {
      reset(kitData);
      setRowData([]);
      kitData?.details?.forEach(detail => {
        setRowData(prevState => [...prevState, detail]);
      });
    }
  }, [kitData, isRefetching]);

  React.useEffect(() => {
    if (mutation.isPending) {
      setLock(true);
    } else {
      setLock(false);
    }
  }, [mutation]);
  
  React.useEffect(() => {
    if (featureData) {
      setSelectData(oldData => ({ ...oldData, features: featureData.map(obj => ({ label: obj.description, value: obj.featuresId })) }));
    }
  }, [featureData]);


  return (
    <Paper elevation={4}>
      <FormProvider {...methods}>
        <Box component="form" className="flex flex-col gap-2" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box component="div" className="flex-col flex-wrap md:flex-nowrap gap-2 w-full">
            <Box component="section" className="flex items-center gap-2 p-2">
              <PrecisionManufacturing color="primary" />
              <Typography variant="h6" fontWeight="bold">Assembling Kit</Typography>
              <Box sx={{ flexGrow: 1}} />
              <Typography variant="body2" fontWeight="bold">Status: </Typography>
              {
                formValues.isActive
                  ? (<Tooltip title="Activo"><CheckCircle color="success" fontSize="medium" /></Tooltip>)
                  : (<Tooltip title="Inactivo"><CheckCircleOutline color="error" fontSize="medium" /></Tooltip>)
              }
            </Box>
            <Divider />
            <Box component="section" className="flex flex-col md:flex-row p-4 md:space-y-2">
              <TextFieldHF
                name="description"
                label="Descripcion"
                className="w-full md:w-1/2 pt-3"
                disabled={!!params.kitId || lock}
              />
              <AutoCompleteHF<CategoryEntity>
                name="category"
                label="Categoria"
                optionsData={categoryData || []}
                getOptionLabel={(option) => `${option.description}`}
                className="w-full md:w-1/2"
                margin="none"
                loading={isLoadingCategory}
                disabled={!!params.kitId || lock}
              />
            </Box>
            <Divider />
            <Box>
              <MaterialTable<KitDetailEntity>
                columns={columns}
                data={paginateData || []}
                enableRowActions
                isEditing
                columnsVisible={{ kitDetailId: false, kitId: false }}
                setRef={setRef}
                pagination={pagination}
                rowCount={rowData.length}
                onPaginationChange={setPagination}
                globalFilter={globalFilter}
                onGlobalFilterChange={setGlobalFilter}
                onActionEdit={onSaveOrEdit}
                onActionSave={onSaveOrEdit}
                onActionDelete={(row) => onDelete(row.original)}
                onActionStateChange={(row) => onChangeState(row.original)}
                isLoading={false}
                isGenerate={true}
                isError={false}
                setValidationErrors={setValidationErrors}
              />
            </Box>
          </Box>
          <ButtonActions
            title="Back"
            onClick={() => navigate('/app/catalogue/product-kit', { replace: true })}
            ComponentIcon={<ArrowBack />}
            ubication={isMobile ? { left: 50 } : { bottom: 99, left: isSideBarOpen ? 280 : 99 }}
          />
          <ButtonActions
            title="Save"
            typeSubmit="submit"
            ubication={isMobile ? undefined : { bottom: 99, right: 99 }}
            ComponentIcon={<Save />}
            disabled={(lock) || false}
          />
        </Box>
      </FormProvider>
    </Paper>
  );
};

export default AddKitPage;