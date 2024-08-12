import React from 'react';
import { Paper } from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  ExitToApp,
  Task,
  Download,
  Cancel,
  Save
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { Data, Field } from 'react-spreadsheet-import/types/types';
import { Meta } from 'react-spreadsheet-import/types/steps/ValidationStep/types';
import _ from 'lodash';
import { Validator } from '@wms/helpers';
import { Stepper, ButtonActions } from '@wms/components';
import {
  useUI,
  useProduct,
  useMasterEntry,
  useAlertNotification
} from '@wms/hooks';
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

const EntriesStepper = () => {
  const { isSideBarOpen, isMobile } = useUI();
  const params = useParams();
  const navigate = useNavigate();
  const { swalToastSuccess, swalToastError, swalToastWait } = useAlertNotification();
  const [activeStep, setActiveStep] = React.useState(0);
  const [openImport, setOpenImport] = React.useState(false);
  const previousStep = () => setActiveStep(prevState => prevState - 1);
  const nextStep = () => setActiveStep(prevState => prevState + 1);
  const [clickCounter, setClickCounter] = React.useState(0);
  const onClick = () => setClickCounter(prevState => prevState + 1);
  const [dataGeneral, setDataGeneral] = React.useState<ImportExcelProps>({
    dataHeader: {},
    dataDetail: [],
    dataImport: []
  });

  const { useMasterEntryMutation, useMasterEntryQuery } = useMasterEntry();
  const { data, refetch, isRefetching } = useMasterEntryQuery({ masterEntryId: Number(params.entryId) || 0 });
  const mutation = useMasterEntryMutation({ pageIndex: 0, pageSize: 1000, filter: '' }, { typeMutation: !params.entryId ? 'post' : 'put' });

  const steps = React.useMemo<{ label: string }[]>(() => [
    { label: 'Entry' },
    { label: 'Detail Entry' },
    { label: 'Report Entry' },
  ], []);

  const fields = React.useMemo<Field<string>[]>(() => [
    {
      label: 'Producto',
      key: 'Producto',
      alternateMatches: ['producto'],
      fieldType: {
        type: 'input',
      },
      example: 'Laptop',
      validations: [
        {
          rule: 'required',
          errorMessage: 'Producto es requerido',
          level: 'error',
        },
      ],
    },
    {
      label: 'Codigo Lote',
      key: 'CodigoLote',
      alternateMatches: ['lote', 'codigoLote'],
      fieldType: {
        type: 'input',
      },
      example: '00001',
      validations: [
        {
          rule: 'required',
          errorMessage: 'Lote es requerido',
          level: 'error',
        },
      ],
    },
    {
      label: 'Numero Serie',
      key: 'NumeroSerie',
      alternateMatches: ['numeroSerie'],
      fieldType: {
        type: 'input',
      },
      example: '1234845454f',
      validations: [
        {
          rule: 'required',
          errorMessage: 'Numero de serie es requerido',
          level: 'error',
        },
      ],
    },
    {
      label: 'Cantidad',
      key: 'Cantidad',
      alternateMatches: ['cantidad'],
      fieldType: {
        type: 'input',
      },
      example: '1',
      validations: [
        {
          rule: 'required',
          errorMessage: 'Cantidad es requerida',
          level: 'error',
        },
      ],
    },
    {
      label: 'Estado Producto',
      key: 'Estado',
      alternateMatches: ['estadoProducto', 'Estado Producto', 'estado producto', 'Estado producto', 'EstadoProducto'],
      fieldType: {
        type: 'input',
      },
      example: 'Buen estado',
      validations: [
        {
          rule: 'required',
          errorMessage: 'Estado es requerido',
          level: 'error',
        },
      ],
    },
    {
      label: 'Descripcion',
      key: 'Descripcion',
      alternateMatches: ['descripcion', 'observaciones', 'Observaciones'],
      fieldType: {
        type: 'input',
      },
      example: 'Observaciones sobre el producto',
      validations: [
        {
          rule: 'required',
          errorMessage: 'Observaciones es requerido',
          level: 'error',
        },
      ],
    },
  ], []);

  const ComponentStep = (step: number) => {
    switch (step) {
      case 1:
        return (<DetailEntry dataGeneral={dataGeneral} setDataGeneral={setDataGeneral} openImport={openImport} />);
      case 2:
        return (<Report />);
      default:
        return (<HeaderEntry dataGeneral={dataGeneral} setDataGeneral={setDataGeneral} setActiveStep={setActiveStep} clickCounter={clickCounter} />);
    }
  };

  const onSubmitImport = (data: IDataExcel) => {
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

  const onSaveOrEdit = () => {
    const title = !params.entryId ? 'Saving Entry!' : 'Updating Entry!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    const values: MasterEntryEntity = {
      ...dataGeneral.dataHeader,
      details: dataGeneral.dataDetail
    };
    mutation.mutateAsync(values)
      .then(result => {
        swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
        navigate(`/app/inventory/entries/${result.masterEntryId}/edit`, { replace: true });
        setActiveStep(2);
      })
      .catch(err => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
  };

  React.useEffect(() => {
    if (!Validator.isObjectEmpty(params)) {
      if (data) {
        const { details, ...header } = data;
        setDataGeneral({
          dataHeader: header,
          dataDetail: details || [],
          dataImport: []
        });
      }
    }
  }, [data, isRefetching]);

  React.useEffect(() => { refetch(); }, []);

  return (
    <React.Fragment>
      <Stepper
        activeStep={activeStep === 2 ? activeStep + 1 : activeStep}
        steps={steps}
      />
      <Paper elevation={0} sx={{ mt: 2 }}>
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
                title="Import"
                onClick={() => setOpenImport(true)}
                ComponentIcon={<Download />}
                ubication={isMobile ? {} : { bottom: 55, right: 180 }}
              />
              <ReactSpreadsheetImport
                isOpen={openImport}
                onSubmit={(result) => onSubmitImport(result)}
                onClose={() => setOpenImport(false)}
                fields={fields}
              />
              {openImport && (
                <ButtonActions
                  title="Cancelar"
                  onClick={() => setOpenImport(false)}
                  ComponentIcon={<Cancel />}
                  zIndex={100000000}
                  ubication={isMobile ? {} : { bottom: 30, right: 60 }}
                />
              )}
            </>
          )
        }
        {
          (activeStep === 2 ? activeStep + 1 : activeStep) != steps.length
            ? (
              <ButtonActions
                title={activeStep === 1 ? 'Save' : 'Next'}
                onClick={activeStep === 0 ? onClick : activeStep === 1 ? onSaveOrEdit : nextStep}
                ComponentIcon={activeStep === 1 ? <Save /> : <ArrowForward />}
                ubication={isMobile ? {} : { bottom: 55, right: 99 }}
              />
            )
            : (
              <ButtonActions                
                title="Finish"
                onClick={() => navigate('/app/inventory/entries', { replace: true })}
                ComponentIcon={<Task />}
                ubication={isMobile ? {} : { bottom: 55, right: 99 }}
              />
            )
        }
      </Paper>
    </React.Fragment>
  );
};

export default EntriesStepper;