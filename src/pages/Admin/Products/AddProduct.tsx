import React from 'react';
import {
  Box,
  Divider,
  Paper,
  Typography
} from '@mui/material';
import { ArrowBack, Cancel, Save } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  AutoCompleteHF,
  TextFieldHF,
  DragFileDialog,
  IconButtonBg,
  ButtonActions
} from '@wms/components';
import {
  useBrand,
  useModel,
  useCategory,
  useUnitMeasure,
  useUI,
  useProduct
} from '@wms/hooks';
import {
  ProductDetailEntity,
  BrandEntity,
  ModelEntity,
  CategoryEntity,
  UnitMeasureEntity
} from '@wms/entities';
import { Validator } from '@wms/helpers';
import DetailProduct from './DetailProduct';

interface IForm {
  name: string,
  description: string,
  minimun: number,
  brand: BrandEntity | null,
  model: ModelEntity | null,
  category: object | null,
  unitMeasure: object | null
}

const defaultValues: IForm  = {
  name: '',
  description: '',
  minimun: 0,
  brand: null,
  model: null,
  category: null,
  unitMeasure: null
};

const schemaValidationForm: Yup.ObjectSchema<IForm> = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  minimun: Yup.number().required('Minimun is required'),
  brand: Yup.object().nullable().required('Brand is required'),
  model: Yup.object().nullable().required('Model is required'),
  category: Yup.object().nullable().required('Category is required'),
  unitMeasure: Yup.object().nullable().required('Unit Measure is required'),
});

const limitFile = 5;

const AddProductPage = () => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaValidationForm),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const { isMobile, isSideBarOpen } = useUI();
  const navigate = useNavigate();
  const params = useParams();
  const { watch, handleSubmit, setValue, reset } = methods;
  const formValues = watch();
  const [rowData, setRowData] = React.useState<ProductDetailEntity[]>([]);
  const [imageList, setImageList] = React.useState<Array<{ id: any, file: string | ArrayBuffer }>>([]);
  const onDelete = (id: string) => (_e: any) => setImageList(prevState => [...prevState.filter(ft => ft.id !== id)]);
  const [modelDataFilter, setModelDataFilter] = React.useState<ModelEntity[]>([]);
  const { useBrandListQuery } = useBrand();
  const { useModelListQuery } = useModel();
  const { useCategoryListQuery } = useCategory();
  const { useUnitMeasureListQuery } = useUnitMeasure();
  const { useProductQuery } = useProduct();
  const { data: brandData, isLoading: isLoadingBrand } = useBrandListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: modelData, isLoading: isLoadingModel } = useModelListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: categoryData, isLoading: isLoadingCategory } = useCategoryListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: unitMeasureData, isLoading: isLoadingUnitMeasure } = useUnitMeasureListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: productData } = useProductQuery({ productId: params.productId });

  const onSubmit = (values: IForm) => {
    console.log(values.minimun);
  };
  
  React.useEffect(() => {
    const data = modelData?.filter(ft => ft.brand?.brandId === formValues.brand?.brandId) || [];
    setModelDataFilter(data);
    if (Validator.isObjectEmpty(params)) setValue('model', null);
  }, [formValues.brand]);

  React.useEffect(() => {
    if (!Validator.isObjectEmpty(params)) {
      reset(productData);
      setValue('brand', productData?.model?.brand || null);
      setValue('model', productData?.model || null);
      productData?.images?.forEach(image => {
        setImageList(prevState => [...prevState, { id: image.productImageId, file: image.url || '' }]);
      });
      productData?.details?.forEach(detail => {
        setRowData(prevState => [...prevState, detail]);
      });
    } else {
      reset(defaultValues);
    }
  }, [productData]);

  React.useEffect(()=> {
    console.log(productData);
  }, []);

  return (
    <FormProvider {...methods} >
      <Box component="form" className="flex flex-col gap-2" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box component="div" className="flex flex-wrap md:flex-nowrap gap-2">
          <Paper elevation={4} className="w-full md:w-1/2">
            <Box component="section" className="p-2">
              <Typography variant="h6" fontWeight="bold">Product Info</Typography>
            </Box>
            <Divider />
            <Box component="section" className="flex flex-col p-4 md:space-y-5">
              <TextFieldHF
                className="w-full"
                label="Nombre"
                name="name"
                maxLength={5}
                size="small"
                required
              />
              <TextFieldHF
                className="w-full"
                label="Descripcion"
                name="description"
                size="small"
                rows={5}
                required
              />
              <TextFieldHF
                className="w-full md:w-1/2"
                label="Minimo Qty"
                name="minimum"
                size="small"
                mask="decimal"
                required
              />
              <Box component="section" className="flex flex-wrap md:flex-nowrap gap-0 md:gap-2">
                <AutoCompleteHF<BrandEntity>
                  className="w-full md:w-1/2"
                  label="Marca"
                  name="brand"
                  optionsData={brandData || []}
                  loading={isLoadingBrand}
                  getOptionLabel={option => `${option.description}`}
                  size="small"
                  required
                />
                <AutoCompleteHF<ModelEntity>
                  className="w-full md:w-1/2"
                  label="Modelo"
                  name="model"
                  optionsData={modelDataFilter || []}
                  getOptionLabel={option => `${option.description}`}
                  loading={isLoadingModel}
                  size="small"
                  required
                />
              </Box>
              <Box component="section" className="flex flex-wrap md:flex-nowrap gap-0 md:gap-2">
                <AutoCompleteHF<CategoryEntity>
                  className="w-full md:w-1/2"
                  label="Categoria"
                  name="category"
                  optionsData={categoryData || []}
                  getOptionLabel={option => `${option.description}`}
                  loading={isLoadingCategory}
                  size="small"
                  required
                />
                <AutoCompleteHF<UnitMeasureEntity>
                  className="w-full md:w-1/2"
                  label="Unidad de Medida"
                  name="unitMeasure"
                  optionsData={unitMeasureData || []}
                  getOptionLabel={option => `${option.description}`}
                  loading={isLoadingUnitMeasure}
                  size="small"
                  required
                />
              </Box>
            </Box>
          </Paper>
          <Paper elevation={4} className="w-full md:w-1/2">
            <Box component="section" className="p-2">
              <Typography variant="h6" fontWeight="bold">Images</Typography>
            </Box>
            <Divider />
            <Box component="section" className="flex flex-col p-4 gap-2">
              <DragFileDialog limitFile={limitFile} type="images" onLoadData={(data) => {
                if (imageList.length >= limitFile) return;
                setImageList(prevState => [
                  ...prevState,
                  ...data.slice(0, limitFile - imageList.length).filter(ft => ft.id)
                ]);
              }} />
              <Box component="div" className="flex flex-nowrap w-full gap-2 overflow-auto container-scroll items-start">
                {
                  imageList.map(image => 
                    <>
                      <img
                        src={image.file.toString()}
                        width="150px"
                        height="150px"
                        className="border-2 border-solid border-gray-300 rounded-lg shadow"
                      />
                      <IconButtonBg
                        sx={{ position: 'sticky', marginLeft: -5, marginTop: 1 }}
                        bgColors="whitesmoke"
                        color="inherit"
                        size="small"
                        onClick={onDelete(image.id)}
                      >
                        <Cancel fontSize="small" />
                      </IconButtonBg>
                    </>
                  )
                }
              </Box>
            </Box>
          </Paper>
        </Box>
        <Paper elevation={4} className="w-full">
          <Box component="section" className="p-2">
            <Typography variant="h6" fontWeight="bold">Details</Typography>
          </Box>
          <Divider />
          <DetailProduct rowData={rowData} setRowData={setRowData} />
        </Paper>
        <ButtonActions
          title="Previous"
          onClick={() => navigate('/app/inventory/products', { replace: true })}
          ComponentIcon={<ArrowBack />}
          ubication={isMobile ? { left: 50 } : { bottom: 99, left: isSideBarOpen ? 280 : 99 }}
        />
        <ButtonActions
          title="Save"
          typeSubmit="submit"
          ubication={isMobile ? {} : { bottom: 99, right: 99 }}
          ComponentIcon={<Save />}
        />
      </Box>
    </FormProvider>
  );
};

export default AddProductPage;