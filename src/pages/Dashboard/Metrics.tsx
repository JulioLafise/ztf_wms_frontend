import React from 'react';
import { Box, Paper } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { CardCollapse, ChartBars, MaterialTable } from '@wms/components';
import { useAws } from '@wms/hooks';
import { v4 as uuid } from 'uuid';
import { StatusCards } from './widgets';


const MetricsPage = () => {
  const { s3GetObject } = useAws();
  const [employeeData, setEmployeeData] = React.useState<object[] | undefined>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [globalFilter, setGlobalFilter] = React.useState('');
  const data = [1, 2, 3, 4];


  const columns = React.useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      id: 'line',
      accessorKey: 'line',
      header: 'Line',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'articule',
      accessorKey: 'articule',
      header: 'Articulos',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'in',
      accessorKey: 'in',
      header: 'Entradas',
      enableEditing: false,
      minSize: 150,
    },
    {
      id: 'out',
      accessorKey: 'out',
      header: 'Salidas',
      enableEditing: false,
      minSize: 150,
    },
  ], []);

  const onClick = (values: { [key: string]: any }) => {

  };

  const onTopPage = () => {
    const scrollPage = document.getElementById('container-page');
    scrollPage?.scrollTo({ top: -scrollPage.scrollHeight });
  };

  React.useEffect(() => {
    setEmployeeData([{}]);
    // if (data) {
    //   if (data.length > 0) {
    //     data.forEach(item => {
    //       if (item.person?.personImage && item.person?.personImage != '') {
    //         s3GetObject({
    //           fileName: item.person?.personImage || '',
    //           folderName: 'alm-mis'
    //         }).then(fileUrl => {            
    //           setEmployeeData(prevState => {
    //             const state = prevState || [];
    //             return [
    //               ...state,
    //               {
    //                 ...item,
    //                 person: {
    //                   ...item.person,
    //                   personImage: fileUrl
    //                 }
    //               }
    //             ];
    //           });
    //         });
    //         return;
    //       }
    //       setEmployeeData(prevState => {
    //         const state = prevState || [];
    //         return [
    //           ...state,
    //           {
    //             ...item,
    //           }
    //         ];
    //       });
    //       return;
    //     });
    //   }
    // }
  }, [data]);

  return (
    <Box component="div" padding={2} className="grid gap-3 grid-cols-12 grid-rows-1">
      <Box component="article" className="col-span-12 flex flex-wrap md:flex-nowrap gap-2 w-full">
        <StatusCards />
      </Box>
      {/* <Paper elevation={2} className="col-span-12 row-span-2 w-full">
        <ChartBars
          id="metrics-bar"
          title="Donaciones"
          data={[
            {
              field: 'Enero',
              values: {
                'Laptops': 75,
                'Material de Estudio': 120,
                'Becas': 93,
                'Otros': 250
              }
            },
            {
              field: 'Febrero',
              values: {
                'Laptops': 75,
                'Material de Estudio': 120,
                'Becas': 93,
                'Otros': 250
              }
            },
          ]}
        />
      </Paper> */}
      <Paper elevation={2} className="col-span-12">
        <MaterialTable<any>
          columns={columns}
          data={[
            {
              line: 1,
              articule: 'Laptops',
              in: 500,
              out: 250
            },
            {
              line: 2,
              articule: 'Becas',
              in: 350,
              out: 100
            },
            {
              line: 3,
              articule: 'Laptops',
              in: 650,
              out: 325
            },
            {
              line: 4,
              articule: 'Material de Estudio',
              in: 1250,
              out: 600
            },
          ]}
          pagination={pagination}
          rowCount={0}
          onPaginationChange={setPagination}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          // onActionRefreshTable={() => refetch()}
          isLoading={false}
          isGenerate={true}
          isError={false}
        />
      </Paper>
      <Box component="article" className="col-span-12">
        <Box component="div" padding={2} className="flex gap-4 overflow-auto container-scroll">
          {
            employeeData?.map((item, index) => (
              <CardCollapse<any>
                key={uuid()}
                sx={{ width: 300, minWidth: 300 }}
                button="card"
                direction="vertical"
                image={{
                  title: 'Nicaragua',
                  url: 'https://source.unsplash.com/random/300×300/?abstract-geometry',
                  sx: { height: 300 }
                }}
                data={{
                  title: 'Nicaragua',
                  subtitle: 'Filial',
                  body: '',
                  optionData: {}
                }}
                onClick={(data) => {
                  onClick(data);
                  onTopPage();
                }}
              />
            ))
          }
        </Box>
      </Box>
    </Box>
  );
};

export default MetricsPage;