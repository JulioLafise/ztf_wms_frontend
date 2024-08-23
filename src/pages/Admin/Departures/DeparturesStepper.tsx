import React from 'react';
import { Paper } from '@mui/material';
import { ArrowBack, ArrowForward, ExitToApp, Save, Task } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import { Data, Field } from 'react-spreadsheet-import/types/types';
import { Meta } from 'react-spreadsheet-import/types/steps/ValidationStep/types';
import { Stepper, ButtonActions } from '@wms/components';
import {
  useUI,
  useAlertNotification,
  useMasterDeparture
} from '@wms/hooks';
import { MasterDepartureEntity, DetailDepartureEntity } from '@wms/entities';
import { Validator } from '@wms/helpers';
import HeaderDeparture from './Steps/HeaderDeparture';
import DetailDeparture from './Steps/DetailDeparture';
import ReportDeparture from './Steps/Report';

interface IDataExcel {
  all: (Data<string> & Meta)[],
  validData: Data<string>[],
  invalidData: Data<string>[],
}

type ImportExcelProps = {
  dataHeader: MasterDepartureEntity,
  dataDetail: DetailDepartureEntity[],
  dataImport: any[]
};

const DeparturesStepper = () => {
  const { isSideBarOpen, isMobile } = useUI();
  const params = useParams();
  const navigate = useNavigate();
  const { swalToastSuccess, swalToastError, swalToastWait } = useAlertNotification();
  const [openImport, setOpenImport] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const previousStep = () => setActiveStep(prevState => prevState - 1);
  const nextStep = () => setActiveStep(prevState => prevState + 1);
  const [clickCounter, setClickCounter] = React.useState(0);
  const onClick = () => setClickCounter(prevState => prevState + 1);
  const [dataGeneral, setDataGeneral] = React.useState<ImportExcelProps>({
    dataHeader: {},
    dataDetail: [],
    dataImport: []
  });

  const { useMasterDepartureMutation, useMasterDepartureQuery, useMasterDepartureDeleteDetailMutation } = useMasterDeparture();
  const { data, refetch, isRefetching } = useMasterDepartureQuery({ masterDepartureId: Number(params.departureId) || 0 });
  const mutation = useMasterDepartureMutation({ pageIndex: 0, pageSize: 1000, filter: '' }, { typeMutation: !params.departureId ? 'post' : 'put' });
  const mutationDetailDelete = useMasterDepartureDeleteDetailMutation({ typeMutation: !params.departureId ? 'post' : 'put' });

  const steps = React.useMemo<{ label: string }[]>(() => [
    { label: 'Departure' },
    { label: 'Detail Departure' },
    { label: 'Report Departure' },
  ], []);

  const ComponentStep = (step: number) => {
    switch (step) {
      case 1:
        return (<DetailDeparture dataGeneral={dataGeneral} setDataGeneral={setDataGeneral} masterDepartureId={Number(params.departureId)} />);
      case 2:
        return (<ReportDeparture />);
      default:
        return (<HeaderDeparture dataGeneral={dataGeneral} setDataGeneral={setDataGeneral} setActiveStep={setActiveStep} clickCounter={clickCounter} />);
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
    setDataGeneral(prevState => ({ ...prevState, dataImport: validatedData }));
  };

  const onSaveOrEdit = () => {
    const title = !params.entryId ? 'Saving Entry!' : 'Updating Entry!';
    swalToastWait(title, {
      message: 'Please wait a few minutes',
      showLoading: true,
    });
    const values: MasterDepartureEntity = {
      ...dataGeneral.dataHeader,
      details: dataGeneral.dataDetail
    };
    mutationDetailDelete.mutateAsync(values)
      .then(() => {
        mutation.mutateAsync(values)
          .then(result => {
            swalToastSuccess('Finished', { showConfirmButton: false, timer: 2000 });
            navigate(`/app/inventory/departures/${result.masterDepartureId}/edit`, { replace: true });
            setActiveStep(2);
          })
          .catch(err => { swalToastError(err.message, { showConfirmButton: false, timer: 3000 }); });
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
          disabled={activeStep === 0 || (mutation.isPending || mutationDetailDelete.isPending)}
          ComponentIcon={<ArrowBack color={activeStep === 0 ? 'disabled' : 'inherit'} />}
          ubication={isMobile ? { left: 50 } : { bottom: 99, left: isSideBarOpen ? 280 : 99 }}
        />
        {
          activeStep !== 2 && (
            <ButtonActions
              title="Exit"
              onClick={() => navigate('/app/inventory/departures', { replace: true })}
              ComponentIcon={<ExitToApp />}
              ubication={isMobile ? { left: 120 } : { bottom: 99, left: isSideBarOpen ? 351 : 170 }}
              disabled={(mutation.isPending || mutationDetailDelete.isPending)}
            />
          )
        }
        {/* {
          activeStep === 1 && (
            <>
              <ButtonActions
                title="Import"
                onClick={() => setOpenImport(true)}
                ComponentIcon={<Download />}
                ubication={isMobile ? {} : { bottom: 99, right: 180 }}
                disabled={(mutation.isPending || mutationDetailDelete.isPending)}
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
        } */}
        {
          (activeStep === 2 ? activeStep + 1 : activeStep) != steps.length
            ? (
              <ButtonActions
                title={activeStep === 1 ? 'Save' : 'Next'}
                onClick={activeStep === 0 ? onClick : activeStep === 1 ? onSaveOrEdit : nextStep}
                ComponentIcon={activeStep === 1 ? <Save /> : <ArrowForward />}
                ubication={isMobile ? {} : { bottom: 99, right: 99 }}
                disabled={(mutation.isPending || mutationDetailDelete.isPending)}
              />
            )
            : (
              <ButtonActions
                title="Finish"
                onClick={() => navigate('/app/inventory/departures', { replace: true })}
                ComponentIcon={<Task />}
                ubication={isMobile ? {} : { bottom: 99, right: 99 }}
              />
            )
        }
      </Paper>
    </React.Fragment>
  );
};

export default DeparturesStepper;