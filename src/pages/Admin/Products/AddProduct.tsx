import React from 'react';
import {
  Box,
  Divider,
  Paper,
  Typography
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { AutoCompleteHF, TextFieldHF, DragFileDialog } from '@wms/components';
import { Collections } from '@mui/icons-material';
import { ProductDetailEntity } from '@wms/entities';
import DetailProduct from './DetailProduct';


const AddProductPage = () => {
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const [rowData, setRowData] = React.useState<ProductDetailEntity[]>([]);
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
              {/* <Box component="div" className="p-20 border border-dashed rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer">
                <input type="file" className="" hidden multiple/>
                <Collections fontSize="large" color="primary" />
                <Typography variant="body1">Drop your files here or <Typography component="a" variant="body1" fontWeight="bold" href="#">browse</Typography></Typography>
                <Typography variant="subtitle2" color="gray">JPG or PNG</Typography>
              </Box> */}
              <DragFileDialog onLoadData={console.log} />
              <Box component="div" className="flex flex-nowrap w-full gap-1 overflow-auto container-scroll">
                <img
                  src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-4.0.3"
                  width="40%"
                  className="border-2 border-solid border-gray-300 rounded-lg shadow"
                />
                <img
                  src="https://t3.ftcdn.net/jpg/05/79/91/90/360_F_579919011_3nUAOTj14Dj0eIGkDk7FwnpOv9QNOWiO.jpg"
                  width="40%"
                  className="border-2 border-solid border-gray-300 rounded-lg shadow"
                />
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