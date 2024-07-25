import React from 'react';
import { Paper, useMediaQuery, Theme } from '@mui/material';
import { ArrowBack, ArrowForward, ExitToApp, Task, Download, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import _ from 'lodash';
import { Data } from 'react-spreadsheet-import/types/types';
import { Meta } from 'react-spreadsheet-import/types/steps/ValidationStep/types';
import { FormProvider, useForm } from 'react-hook-form';
import { Stepper, ButtonActions } from '@wms/components';
import { useUI, useProduct, useMasterEntry } from '@wms/hooks';
import { MasterEntryEntity, DetailEntryEntity } from '@wms/entities';
import HeaderEntry from './Steps/HeaderEntry';
import DetailEntry from './Steps/DetailEntry';
import Report from './Steps/ReportEntries';

interface IDataExcel {
  all: (Data<string> & Meta)[],
  validData: Data<string>[],
  invalidData: Data<string>[],
}

type ImportExcelProps = {
  dataHeader: MasterEntryEntity,
  dataDetail: DetailEntryEntity[],
  dataImport: any[]
};

const DeparturesStepper = () => {
  const { isSideBarOpen } = useUI();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const [activeStep, setActiveStep] = React.useState(0);
  const [openImport, setOpenImport] = React.useState(false);
  const previousStep = () => setActiveStep(prevState => prevState - 1);
  const nextStep = () => setActiveStep(prevState => prevState + 1);
  const [dataGeneral, setDataGeneral] = React.useState<ImportExcelProps>({
    dataHeader: {},
    dataDetail: [],
    dataImport: []
  });

  const {
    filterProductExistByName
  } = useProduct();
  
  const {
    useMasterEntryMutation
  } = useMasterEntry();

  const mutation = useMasterEntryMutation({ pageIndex: 0, filter: '', pageSize: 1000}, { typeMutation: 'post' });

  const steps = React.useMemo(() => [
    { label: 'Entry' },
    { label: 'Detail Entry' },
    { label: 'Report Entry' },
  ], []);

  const ComponentStep = (step: number) => {
    switch (step) {
      case 1:
        return (<DetailEntry dataGeneral={dataGeneral} setDataGeneral={setDataGeneral} openImport={openImport} />);
      case 2:
        return (<Report />);
      default:
        return (<HeaderEntry dataGeneral={dataGeneral} setDataGeneral={setDataGeneral} />);
    }
  };

  const fields = [
    {
      // Visible in table header and when matching columns.
      label: 'Producto',
      // This is the key used for this field when we call onSubmit.
      key: 'Producto',
      // Allows for better automatic column matching. Optional.
      alternateMatches: ['producto'],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - 'input' / 'checkbox' / 'select'.
        type: 'input',
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: 'Laptop',
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be 'required' / 'unique' / 'regex'
          rule: 'required',
          errorMessage: 'Producto es requerido',
          // There can be 'info' / 'warning' / 'error' levels. Optional. Default 'error'.
          level: 'error',
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: 'Codigo Lote',
      // This is the key used for this field when we call onSubmit.
      key: 'CodigoLote',
      // Allows for better automatic column matching. Optional.
      alternateMatches: ['lote', 'codigoLote'],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - 'input' / 'checkbox' / 'select'.
        type: 'input',
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: '00001',
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be 'required' / 'unique' / 'regex'
          rule: 'required',
          errorMessage: 'Lote es requerido',
          // There can be 'info' / 'warning' / 'error' levels. Optional. Default 'error'.
          level: 'error',
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: 'Numero Serie',
      // This is the key used for this field when we call onSubmit.
      key: 'NumeroSerie',
      // Allows for better automatic column matching. Optional.
      alternateMatches: ['numeroSerie'],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - 'input' / 'checkbox' / 'select'.
        type: 'input',
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: '1234845454f',
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be 'required' / 'unique' / 'regex'
          rule: 'required',
          errorMessage: 'Numero de serie es requerido',
          // There can be 'info' / 'warning' / 'error' levels. Optional. Default 'error'.
          level: 'error',
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: 'Cantidad',
      // This is the key used for this field when we call onSubmit.
      key: 'Cantidad',
      // Allows for better automatic column matching. Optional.
      alternateMatches: ['cantidad'],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - 'input' / 'checkbox' / 'select'.
        type: 'input',
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: '1',
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be 'required' / 'unique' / 'regex'
          rule: 'required',
          errorMessage: 'Cantidad es requerida',
          // There can be 'info' / 'warning' / 'error' levels. Optional. Default 'error'.
          level: 'error',
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: 'Estado Producto',
      // This is the key used for this field when we call onSubmit.
      key: 'Estado',
      // Allows for better automatic column matching. Optional.
      alternateMatches: ['estadoProducto', 'Estado Producto', 'estado producto', 'Estado producto', 'EstadoProducto'],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - 'input' / 'checkbox' / 'select'.
        type: 'input',
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: 'Buen estado',
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be 'required' / 'unique' / 'regex'
          rule: 'required',
          errorMessage: 'Estado es requerido',
          // There can be 'info' / 'warning' / 'error' levels. Optional. Default 'error'.
          level: 'error',
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: 'Descripcion',
      // This is the key used for this field when we call onSubmit.
      key: 'Descripcion',
      // Allows for better automatic column matching. Optional.
      alternateMatches: ['descripcion', 'observaciones', 'Observaciones'],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - 'input' / 'checkbox' / 'select'.
        type: 'input',
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: 'Observaciones sobre el producto',
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be 'required' / 'unique' / 'regex'
          rule: 'required',
          errorMessage: 'Observaciones es requerido',
          // There can be 'info' / 'warning' / 'error' levels. Optional. Default 'error'.
          level: 'error',
        },
      ],
    },
  ] as const;

  const onSubmit = (data: IDataExcel) => {
    // console.log(data.validData);
    // const x = '5252';
    // console.log(`${x.substring(0, 1)}${x.substring(1, x.length)}`);
    const validatedData = data.validData.map(obj => {
      const objectData = {};
      Object.keys(obj).map(_obj => {
        objectData[`${_obj.substring(0, 1).toLowerCase()}${_obj.substring(1, _obj.length)}`] = obj[_obj];
      });
      return objectData;
    }
    );
    // console.log(validatedData, 'Pruebaa');
    setDataGeneral(prevState => ({ ...prevState, dataImport: validatedData }));
    // if (data.invalidData.length > 0) {
    //   console.log(data.invalidData, 'invalid');
    // }
    // const dataUnique: { nombre: string }[] = _.uniqBy(data.validData, (obj: any) => obj.Nombre).map((obj: any) => ({ nombre: obj.Nombre }));
    // filterProductExistByName(dataUnique).then((res: boolean) => console.log(res));
  };

  const onSubmitHeader = (data: any) => {
    console.log(data);
    setDataGeneral(prevState => ({ ...prevState, dataHeader: data }));
  };
  const onSubmitDetail = (data: any) => {
    console.log(data, dataGeneral);
    // dataHeader: {
    //   country: { countryId: 2, description: 'NICARAGUA', isActive: true },
    //   department: { departamentId: 2, description: 'MANAGUA', isActive: true },
    //   warehouse: {
    //     warehouseId: 20,
    //     description: 'OLPC CASA MATRIZ',
    //     isActive: true,
    //     departament: { departamentId: 1, description: 'TEGUCIGALPA', countryId: 1 }
    //   },
    //   category: { categoryId: 2, description: 'XO Chromebooks', isActive: true },
    //   currency: {
    //     typeCurrencyId: 3,
    //     description: 'Lempira Hondureño',
    //     iconName: 'L',
    //     isActive: true
    //   },
    //   noEntry: '',
    //   proveedor: null,
    //   employee: null,
    //   client: '',
    //   placa: '',
    //   identification: '',
    //   description: ''
    // },
    [
      {
        entradaDetalleId: 0,
        descripcion: '',
        cantidad: 0,
        codigoLote: '',
        numeroSerie: '',
        precio: 0,
        maestroentradaId: 0,
        estadoProductoId: 0,
        productoId: 0
      }
    ];
    const dataEntry = {
      descripcion: dataGeneral.dataHeader.description,
      personaEntrega: dataGeneral.dataHeader.supplier?.firstName,
      tipoMonedaId: dataGeneral.dataHeader.typeCurrency.typeCurrencyId,
      empleadoRecibeId: dataGeneral.dataHeader.employee.employeeId,
      categoriaId: dataGeneral.dataHeader.category.categoryId,
      proveedorId: dataGeneral.dataHeader.supplier.supplierId,
      listaDetalle: dataGeneral.dataDetail,
      departamentoId: dataGeneral.dataHeader.department.departmentId,
      bodegaId: dataGeneral.dataHeader.warehouse.warehouseId
    };
    console.log(dataGeneral, dataEntry, 'prueba', dataDetail);
    // mutation.mutateAsync(data).then(res => console.log(res));
  };

  return (
    <React.Fragment>
      <Stepper
        activeStep={activeStep}
        steps={steps}
      />
      <Paper elevation={0} sx={{ mt: 2 }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(activeStep === 1 ? onSubmitDetail : onSubmitHeader)} className="flex flex-nowrap flex-col">
            {ComponentStep(activeStep)}
            <ButtonActions
              title="Previous"
              onClick={previousStep}
              disabled={activeStep === 0}
              ComponentIcon={<ArrowBack color={activeStep === 0 ? 'disabled' : 'inherit'} />}
              ubication={isMobile ? { left: 50 } : { bottom: 55, left: isSideBarOpen ? 280 : 99 }}
            />
            <ButtonActions
              title="Exit"
              onClick={() => navigate('/app/inventory/entries', { replace: true })}
              ComponentIcon={<ExitToApp />}
              ubication={isMobile ? { left: 90 } : { bottom: 55, left: isSideBarOpen ? 351 : 170 }}
            />
            {
              activeStep === 1 && (
                <>
                  <ButtonActions
                    title="Next"
                    onClick={() => setOpenImport(true)}
                    ComponentIcon={<Download />}
                    ubication={isMobile ? {} : { bottom: 55, right: 180 }}
                  />
                  {/* <div style={{
                marginTop: 'px'
              }}> */}
                  <ReactSpreadsheetImport isOpen={openImport} onClose={() => setOpenImport(false)} onSubmit={(result) => onSubmit(result)} fields={fields} />
                  {openImport && (
                    <ButtonActions
                      title="Cancelar"
                      onClick={() => setOpenImport(false)}
                      ComponentIcon={<Cancel />}
                      zIndex={100000000}
                      ubication={isMobile ? {} : { bottom: 30, right: 60 }}
                    />
                  )}
                  {/* </div> */}
                </>
              )
            }
            {
              activeStep != steps.length
                ? (
                  <ButtonActions
                    title="Next"
                    onClick={nextStep}
                    typeSubmit="submit"
                    ComponentIcon={<ArrowForward />}
                    ubication={isMobile ? {} : { bottom: 55, right: 99 }}
                  />
                )
                : (
                  <ButtonActions
                    title="Finish"
                    // onClick={nextStep}
                    ComponentIcon={<Task />}
                    ubication={isMobile ? {} : { bottom: 55, right: 99 }}
                  />
                )
            }
          </form>
        </FormProvider>
      </Paper>
    </React.Fragment>
  );
};

export default DeparturesStepper;