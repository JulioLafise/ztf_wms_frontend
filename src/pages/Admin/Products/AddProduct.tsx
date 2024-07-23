/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import { Add, ArrowBack, Cancel, FormatPaint, Image, Info, Save, SquareFoot, TableView } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import {
  AutoCompleteHF,
  TextFieldHF,
  DragFileDialog,
  ButtonActions, 
  FontAwesomeIcon,
  CheckBoxHF
} from '@wms/components';
import { IOptionsQuery } from '@wms/interfaces';
import {
  useBrand,
  useModel,
  useCategory,
  useUnitMeasure,
  useUI,
  useProduct,
  useColor,
  useAlertNotification,
  useAws
} from '@wms/hooks';
import {
  ProductEntity,
  ProductDetailEntity,
  BrandEntity,
  ModelEntity,
  CategoryEntity,
  UnitMeasureEntity,
  ColorEntity,
  ProductDimensionEntity,
  ProductImageEntity
} from '@wms/entities';
import { Validator, GeneratedData, Colors } from '@wms/helpers';
import DetailProduct from './DetailProduct';

interface IForm {
  productId: Yup.Maybe<number>,
  name: string,
  code: Yup.Maybe<string>,
  description: string,
  minimum: number,
  color: ColorEntity | null,
  brand: BrandEntity | null,
  model: ModelEntity | null,
  category: CategoryEntity | null,
  unitMeasure: object | null,
  unitMeasure2: object | null,
  dimension: Yup.Maybe<string>,
  isEcommerce: Yup.Maybe<boolean>,
  isActive: Yup.Maybe<boolean>,
}

const defaultValues: IForm  = {
  productId: 0,
  code: '',
  name: '',
  description: '',
  minimum: 1,
  color: null,
  brand: null,
  model: null,
  category: null,
  unitMeasure: null,
  unitMeasure2: null,
  dimension: '',
  isEcommerce: false,
  isActive: true,
};

const schemaValidationForm: Yup.ObjectSchema<IForm> = Yup.object().shape({
  productId: Yup.number().notRequired(),
  code: Yup.string().notRequired(),
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  minimum: Yup.number().required('Minimum is required').integer().min(1, 'The minimum is 1'),
  color: Yup.object().nullable(),
  brand: Yup.object().nullable().required('Brand is required'),
  model: Yup.object().nullable().required('Model is required'),
  category: Yup.object<CategoryEntity>().nullable().required('Category is required'),
  unitMeasure: Yup.object().nullable().required('Unit Measure is required'),
  unitMeasure2: Yup.object().nullable(),
  dimension: Yup.string(),
  isEcommerce: Yup.boolean(),
  isActive: Yup.boolean(),
});

const limitFile = 5;

const AddProductPage = () => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaValidationForm),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const { swalToastError, swalToastWait, swalToastSuccess } = useAlertNotification();
  const { isMobile, isSideBarOpen, theme } = useUI();
  const { uploadImageToS3Api, isLoading: isLoadingS3 } = useAws();
  const navigate = useNavigate();
  const params = useParams();
  const { watch, handleSubmit, setValue, reset, setError, setFocus } = methods;
  const formValues = watch();
  const [lock, setLock] = React.useState<boolean>(false);
  const [optionsQuery, setOptionsQuery] = React.useState<IOptionsQuery>({});
  const [dimensions, setDimensions] = React.useState<ProductDimensionEntity[]>([]);
  const [colors, setColors] = React.useState<ColorEntity[]>([]);
  const [rowData, setRowData] = React.useState<ProductDetailEntity[]>([]);
  const [imageList, setImageList] = React.useState<Array<{ id: any, name: string, file: string | ArrayBuffer }>>([]);
  const [files, setFiles] = React.useState<File[]>([]);
  const [modelDataFilter, setModelDataFilter] = React.useState<ModelEntity[]>([]);
  const { useBrandListQuery } = useBrand();
  const { useModelListQuery } = useModel();
  const { useCategoryListQuery } = useCategory();
  const { useUnitMeasureListQuery } = useUnitMeasure();
  const { useProductQuery, useProductMutation, useProductEliminateItemsMutation } = useProduct();
  const { useColorListQuery } = useColor();
  const { data: brandData, isLoading: isLoadingBrand } = useBrandListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: modelData, isLoading: isLoadingModel } = useModelListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: categoryData, isLoading: isLoadingCategory } = useCategoryListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: unitMeasureData, isLoading: isLoadingUnitMeasure } = useUnitMeasureListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: colorData, isLoading: isLoadingColor } = useColorListQuery({ pageIndex: 0, pageSize: 100, filter: '' });
  const { data: productData, refetch: refetchProductData, isRefetching } = useProductQuery({ productId: params.productId });
  const mutation = useProductMutation({ pageIndex: 0, pageSize: 100, filter: '' }, optionsQuery);
  const mutationEliminate = useProductEliminateItemsMutation(['colors', 'images', 'dimensions', 'details']);

  const onSubmit = (values: { [x: string]: any }) => {
    setOptionsQuery({
      typeMutation: values.productId ? 'put' : 'post'
    });
    const isPost = values.productId ? false : true;
    const title = values.productId ? 'Updating Product!' : 'Saving Product!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    mutationEliminate.mutateAsync(values)
      .then(isDelete => {
        if (isDelete) {
          uploadImageToS3Api(files)
            .then(urls => {
              let images: ProductImageEntity[] = [];
              if (urls.length) {
                urls.forEach(url => {
                  images = [...images, { url }];
                });
              }
              imageList.filter(ft => ft.file.toString().indexOf('http') > -1).forEach(image => {
                images = [...images, { url: image.file as string }];
              });
              const data: ProductEntity = {
                ...values,
                colors,
                dimensions,
                images,
                details: rowData
              };
              mutation.mutateAsync(data)
                .then(resp => {
                  if (isPost) {
                    navigate(`/app/inventory/products/${resp.productId}/edit`, { replace: true });
                  } else {
                    refetchProductData();
                  }
                  swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
                })
                .catch((err) => {
                  swalToastError(err.message, { showConfirmButton: false, timer: 3000 });
                  if (String(err.message).indexOf('Duplicate') >= 0) {
                    setError('name', err.message);
                    setFocus('name');
                  }
                });
            })
            .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
        }
      })
      .catch((err) => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  const onAddDimension = (_e: any) => {
    const unitMeasure = formValues.unitMeasure2 || {};
    const description = formValues.dimension || '';
    if (!Validator.isObjectEmpty(unitMeasure) && description.length) {
      const dimension: ProductDimensionEntity = {
        dimensionId: GeneratedData.getRandomInt(3000),
        unitMeasure,
        description
      };
      setDimensions(prevState => [...prevState, dimension]);
      setValue('unitMeasure2', null);
      setValue('dimension', '');
    }
  };
  
  const onDelete = (id: string, name: string) => (_e: any) => {
    console.log(files);
    setFiles(prevState => [...prevState.filter(ft => ft.name !== name)]);
    setImageList(prevState => [...prevState.filter(ft => ft.id !== id)]);
  };    

  const onDeleteColor = (id: number) => (_e: any) => setColors(prevState => [...prevState.filter(ft => ft.colorId !== id)]);

  const onDeleteDimension = (id: number) => (_e: any) => setDimensions(prevState => [...prevState.filter(ft => ft.dimensionId !== id)]);

  const onArrayClear = () => {
    setImageList([]);
    setRowData([]);
    setColors([]);
    setDimensions([]);
  };

  React.useEffect(() => {
    const data = modelData?.filter(ft => ft.brand?.brandId === formValues.brand?.brandId) || [];
    setModelDataFilter(data);
    if (Validator.isObjectEmpty(params)) setValue('model', null);
  }, [formValues.brand]);
  
  React.useEffect(() => {
    const color = formValues.color || {};
    if (!Validator.isObjectEmpty(color)) {      
      setColors(prevState => {
        if (prevState.filter(item => item.colorId === color.colorId)[0]) return prevState;
        return [...prevState, color];
      });
      setValue('color', null);
    }
  }, [formValues.color]);

  React.useEffect(() => {
    if (!Validator.isObjectEmpty(params)) {
      reset(productData);
      console.log(productData);
      setValue('category', productData?.category || null);
      setValue('brand', productData?.model?.brand || null);
      setValue('model', productData?.model || null);
      onArrayClear();
      productData?.images?.forEach(image => {
        setImageList(prevState => [...prevState, { id: image.productImageId, file: image.url || '', name: '' }]);
      });
      productData?.details?.forEach(detail => {
        setRowData(prevState => [...prevState, detail]);
      });
      productData?.colors?.forEach(color => {
        setColors(prevState => [...prevState, color]);
      });
      productData?.dimensions?.forEach(dimension => {
        setDimensions(prevState => [...prevState, dimension]);
      });
    } else {
      reset(defaultValues);
    }
  }, [productData, isRefetching]);

  React.useEffect(() => {
    if (formValues.isEcommerce || mutation.isPending || mutationEliminate.isPending || isLoadingS3) {
      setLock(true);
    } else {
      setLock(false);
    }
  }, [formValues.isEcommerce, mutation.isPending, mutationEliminate.isPending, isLoadingS3]);

  return (
    <FormProvider {...methods} >
      <Box component="form" className="flex flex-col gap-2" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box component="div" className="flex flex-wrap md:flex-nowrap gap-2">
          <Paper elevation={4} className="w-full md:w-1/2">
            <Box component="section" className="flex items-center gap-2 p-2">
              <Info color="primary" />
              <Typography variant="h6" fontWeight="bold">Product Info</Typography>
            </Box>
            <Divider />
            <Box component="section" className="flex flex-col p-4 md:space-y-2">
              <TextFieldHF
                className="w-full"
                label="Codigo"
                name="code"
                maxLength={5}
                size="small"
                disabled
              />
              <TextFieldHF
                className="w-full"
                label="Nombre"
                name="name"
                maxLength={5}
                size="small"
                disabled={!!params.productId || lock}
                required
              />
              <TextFieldHF
                className="w-full"
                label="Descripcion"
                name="description"
                size="small"
                rows={5}
                disabled={lock || false}
                required
              />
              <TextFieldHF
                className="w-full md:w-1/2"
                label="Minimo Qty"
                name="minimum"
                size="small"
                mask="decimal"
                disabled={lock || false}
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
                  disabled={lock || false}
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
                  disabled={lock || false}
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
                  disabled={lock || false}
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
                  disabled={lock || false}
                  required
                />
              </Box>
              <Box component="section" className="flex flex-row-reverse">
                <CheckBoxHF
                  name="isEcommerce"
                  label="Activo Ecommerce"
                  className="w-1/2"    
                  disabled
                />
                <CheckBoxHF
                  name="isActive"
                  label="Activo"
                  className="w-1/2"
                  disabled
                />
              </Box>
            </Box>
          </Paper>
          <Paper elevation={4} className="w-full md:w-1/2">
            <Box component="section" className="flex items-center gap-2 p-2">
              <Image color="primary" />
              <Typography variant="h6" fontWeight="bold">Images</Typography>
            </Box>
            <Divider />
            <Box component="section" className="flex flex-col p-4 gap-2">
              <DragFileDialog limitFile={limitFile} type="images" disabled={lock || false} onLoadData={(data) => {
                if (imageList.length >= limitFile) return;
                setImageList(prevState => [
                  ...prevState,
                  ...data.slice(0, limitFile - imageList.length).filter(ft => ft.id)
                ]);
              }} 
              onLoadFiles={(data) => {
                if (imageList.length >= limitFile) return;
                setFiles(prevState => [
                  ...prevState,
                  // @ts-expect-error
                  ...Array.from(data).slice(0, limitFile - imageList.length).filter(ft => ft.name)
                ]);
              }}
              />
              <Box component="div" className="flex flex-nowrap w-full gap-2 overflow-auto container-scroll items-start">
                {
                  imageList.map(image => 
                    <React.Fragment key={image.id}>
                      <img
                        src={image.file.toString()}
                        width="150px"
                        height="150px"
                        className="border-2 border-solid border-gray-300 rounded-lg shadow"
                      />
                      <IconButton
                        sx={{ position: 'sticky', marginLeft: -5, marginTop: 1 }}
                        color="inherit"
                        size="small"
                        onClick={onDelete(image.id, image.name)}
                        disabled={lock || false}
                      >
                        <Cancel fontSize="small" color="primary" />
                      </IconButton>
                    </React.Fragment>
                  )
                }
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box component="div" className="flex flex-wrap md:flex-nowrap gap-2">
          <Paper elevation={4} className="w-full md:w-1/2">
            <Box component="section" className="flex items-center gap-2 p-2">
              <FormatPaint color="primary" />
              <Typography variant="h6" fontWeight="bold">Colors</Typography>
            </Box>
            <Divider />
            <Box component="section" className="flex flex-col p-4 gap-2">
              <AutoCompleteHF<ColorEntity>
                className="w-full"
                label="Colores"
                name="color"
                optionsData={colorData || []}
                getOptionLabel={option => `${option.color}`}
                renderOption={({ key: someKey, ...props }, option) => (
                  <li key={someKey} {...props}>
                    <FontAwesomeIcon icon="fill-drip" color={option.color} className="pe-1.5" /> {String(Colors.getNameByHex(option.color!).name)}
                  </li>)
                }
                loading={isLoadingColor}
                disabled={lock || false}
                size="small"
              />
              <Box component="section" className="flex gap-2 flex-wrap py-2">
                {
                  colors.map(color =>
                    <Box component="div" key={color.colorId} className="bg-gray-200 rounded-full py-0.5 px-1 flex items-center justify-center gap-1">
                      <FontAwesomeIcon icon="fill-drip" color={color.color} className="pe-0.5" />
                      <Typography variant="subtitle2" className="text-black">{Colors.getNameByHex(color.color!).name}</Typography>
                      <IconButton
                        color="inherit"
                        size="small"
                        onClick={onDeleteColor(color.colorId || 0)}
                        disabled={lock || false}
                      >
                        <Cancel fontSize="small" color="primary" />
                      </IconButton>
                    </Box>
                  )
                }
              </Box>
            </Box>
          </Paper>
          <Paper elevation={4} className="w-full md:w-1/2">
            <Box component="section" className="flex items-center gap-2 p-2">
              <SquareFoot color="primary" />
              <Typography variant="h6" fontWeight="bold">Dimensions</Typography>
            </Box>
            <Divider />
            <Box component="section" className="flex flex-col p-4 gap-2">
              <Box component="section" className="flex flex-wrap md:flex-nowrap gap-2 pb-2 items-center">
                <TextFieldHF
                  className="w-full md:w-1/2"
                  label="Dimension"
                  name="dimension"
                  maxLength={5}
                  size="small"
                  disabled={lock || false}
                />
                <AutoCompleteHF<UnitMeasureEntity>
                  className="w-full md:w-1/2"
                  label="Unidad de Medida"
                  name="unitMeasure2"
                  optionsData={unitMeasureData || []}
                  getOptionLabel={option => `${option.description}`}
                  loading={isLoadingUnitMeasure}
                  size="small"
                  disabled={lock || false}
                />
                {
                  isMobile
                    ? (<Button variant="contained" onClick={onAddDimension} fullWidth disabled={lock || false}>Add</Button>)
                    : (<IconButton onClick={onAddDimension} disabled={lock || false}><Add color="primary" /></IconButton>)
                }
              </Box>
              <Box component="section" className="flex gap-2 flex-wrap py-2">
                {
                  dimensions.map(dimension =>
                    <Box component="div" key={dimension.dimensionId} className="bg-gray-200 rounded-full py-0.5 px-1 flex items-center justify-center gap-1">
                      <FontAwesomeIcon icon="ruler" className="pe-0.5" color={theme.paletteColors?.primary.main} />
                      <Typography variant="subtitle2" className="text-black">{dimension.description} {dimension.unitMeasure?.description}</Typography>
                      <IconButton
                        color="inherit"
                        size="small"
                        onClick={onDeleteDimension(dimension.dimensionId || 0)}
                        disabled={lock || false}
                      >
                        <Cancel fontSize="small" color="primary" />
                      </IconButton>
                    </Box>
                  )
                }
              </Box>
            </Box>
          </Paper>
        </Box>
        <Paper elevation={4} className="w-full">
          <Box component="section" className="flex items-center gap-2 p-2">
            <TableView color="primary" />
            <Typography variant="h6" fontWeight="bold">Details</Typography>
          </Box>
          <Divider />
          <DetailProduct rowData={rowData} setRowData={setRowData} disabled={lock || false} categoryId={formValues.category?.categoryId || 0} />
        </Paper>
        <ButtonActions
          title="Back"
          onClick={() => navigate('/app/inventory/products', { replace: true })}
          ComponentIcon={<ArrowBack />}
          ubication={isMobile ? { left: 50 } : { bottom: 99, left: isSideBarOpen ? 280 : 99 }}
        />
        <ButtonActions
          title="Save"
          typeSubmit="submit"
          ubication={isMobile ? {} : { bottom: 99, right: 99 }}
          ComponentIcon={<Save />}
          disabled={(lock) || false}
        />
      </Box>
    </FormProvider>
  );
};

export default AddProductPage;