import React from 'react';
import {
  Box,
  Divider,
  Paper,
  Typography
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { AutoCompleteHF, TextFieldHF, DragFileDialog, IconButtonBg } from '@wms/components';
import { ProductDetailEntity } from '@wms/entities';
import DetailProduct from './DetailProduct';
import { Cancel } from '@mui/icons-material';


const limitFile = 5;

const AddProductPage = () => {
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const [rowData, setRowData] = React.useState<ProductDetailEntity[]>([]);
  const [imageList, setImageList] = React.useState<Array<{ id: string, file: string | ArrayBuffer }>>([]);
  const onDelete = (id: string) => (_e: any) => setImageList(prevState => [...prevState.filter(ft => ft.id !== id)]);
  return (
    <FormProvider {...methods} >
      <Box component="form" className="flex flex-col gap-2" noValidate>
        <Box component="div" className="flex flex-wrap md:flex-nowrap gap-2">
          <Paper elevation={4} className="w-full md:w-1/2">
            <Box component="section" className="p-2">
              <Typography variant="h6" fontWeight="bold">Product Info</Typography>
            </Box>
            <Divider />
            <Box component="section" className="flex flex-col p-4">
              <TextFieldHF
                className="w-full"
                label="Nombre"
                name="name"
                size="small"
              />
              <TextFieldHF
                className="w-full"
                label="Descripcion"
                name="description"
                size="small"
                rows={5}
              />
              <TextFieldHF
                className="w-full md:w-1/2"
                label="Minimo Qty"
                name="minimum"
                size="small"
                mask="decimal"
              />
              <Box component="section" className="flex flex-wrap md:flex-nowrap gap-0 md:gap-2">
                <AutoCompleteHF
                  className="w-full md:w-1/2"
                  label="Marca"
                  name="brand"
                  optionsData={[]}
                  getOptionLabel={() => ''}
                  size="small"
                />
                <AutoCompleteHF
                  className="w-full md:w-1/2"
                  label="Modelo"
                  name="model"
                  optionsData={[]}
                  getOptionLabel={() => ''}
                  size="small"
                />
              </Box>
              <Box component="section" className="flex flex-wrap md:flex-nowrap gap-0 md:gap-2">
                <AutoCompleteHF
                  className="w-full md:w-1/2"
                  label="Categoria"
                  name="category"
                  optionsData={[]}
                  getOptionLabel={() => ''}
                  size="small"
                />
                <AutoCompleteHF
                  className="w-full md:w-1/2"
                  label="Unidad de Medida"
                  name="unitMeasure"
                  optionsData={[]}
                  getOptionLabel={() => ''}
                  size="small"
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
      </Box>
    </FormProvider>
  );
};

export default AddProductPage;