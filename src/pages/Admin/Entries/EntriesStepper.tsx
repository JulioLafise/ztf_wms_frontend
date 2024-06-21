import React from 'react';
import { Paper, useMediaQuery, Theme } from '@mui/material';
import { ArrowBack, ArrowForward, ExitToApp, Task, Download, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Stepper, ButtonActions } from '@wms/components';
import { useUI, useProduct } from '@wms/hooks';
import HeaderEntry from './Steps/HeaderEntry';
import DetailEntry from './Steps/DetailEntry';
import Report from './Steps/ReportEntries';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';
import _ from 'lodash';
import { Data } from 'react-spreadsheet-import/types/types';
import { Meta } from 'react-spreadsheet-import/types/steps/ValidationStep/types';

interface IDataExcel {
  all: (Data<string> & Meta)[],
  validData: Data<string>[],
  invalidData: Data<string>[],
}
const DeparturesStepper = () => {
  const { isSideBarOpen } = useUI();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down(768));
  const [activeStep, setActiveStep] = React.useState(0);
  const [openImport, setOpenImport] = React.useState(false);
  const previousStep = () => setActiveStep(prevState => prevState - 1);
  const nextStep = () => setActiveStep(prevState => prevState + 1);
  const [data, setData] = React.useState({
    dataHeader: {}
  });

  const {
    filterProductExistByName
  } = useProduct();

  const steps = React.useMemo(() => [
    { label: 'Entry' },
    { label: 'Detail Entry' },
    { label: 'Report Entry' },
  ], []);

  const ComponentStep = (step: number) => {
    switch (step) {
      case 1:
        return (<DetailEntry />);
      case 2:
        return (<Report />);

      default:
        return (<HeaderEntry />);
    }
  };

  const fields = [
    {
      // Visible in table header and when matching columns.
      label: 'Nombre',
      // This is the key used for this field when we call onSubmit.
      key: 'Nombre',
      // Allows for better automatic column matching. Optional.
      // alternateMatches: ['first name', 'first'],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - 'input' / 'checkbox' / 'select'.
        type: 'input',
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: 'Stephanie',
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be 'required' / 'unique' / 'regex'
          rule: 'required',
          errorMessage: 'Nombre es requerido',
          // There can be 'info' / 'warning' / 'error' levels. Optional. Default 'error'.
          level: 'error',
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: 'Apellido',
      // This is the key used for this field when we call onSubmit.
      key: 'Apellido',
      // Allows for better automatic column matching. Optional.
      // alternateMatches: ['first name', 'first'],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - 'input' / 'checkbox' / 'select'.
        type: 'input',
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: 'Mena',
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be 'required' / 'unique' / 'regex'
          rule: 'required',
          errorMessage: 'Apellido es requerido',
          // There can be 'info' / 'warning' / 'error' levels. Optional. Default 'error'.
          level: 'error',
        },
      ],
    },
    {
      // Visible in table header and when matching columns.
      label: 'Direccion',
      // This is the key used for this field when we call onSubmit.
      key: 'Direccion',
      // Allows for better automatic column matching. Optional.
      // alternateMatches: ['first name', 'first'],
      // Used when editing and validating information.
      fieldType: {
        // There are 3 types - 'input' / 'checkbox' / 'select'.
        type: 'input',
      },
      // Used in the first step to provide an example of what data is expected in this field. Optional.
      example: 'Managua',
      // Can have multiple validations that are visible in Validation Step table.
      validations: [
        {
          // Can be 'required' / 'unique' / 'regex'
          rule: 'required',
          errorMessage: 'Direccion es requerida',
          // There can be 'info' / 'warning' / 'error' levels. Optional. Default 'error'.
          level: 'error',
        },
      ],
    },
  ] as const;

  const onSubmit = (data: IDataExcel) => {
    console.log(data.invalidData);
    if (data.invalidData.length > 0) {
      console.log(data.invalidData, 'invalid');
    }
    const dataUnique: { nombre: string }[] = _.uniqBy(data.validData, (obj: any) => obj.Nombre).map((obj: any) => ({ nombre: obj.Nombre }));
    filterProductExistByName(dataUnique).then((res: boolean) => console.log(res));
  };

  return (
    <React.Fragment>
      <Stepper
        activeStep={activeStep}
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
          onClick={() => navigate('/app/inventory/departures', { replace: true })}
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
      </Paper>
    </React.Fragment>
  );
};

export default DeparturesStepper;