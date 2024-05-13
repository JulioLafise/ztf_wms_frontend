import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import router from '@wms/routes';
import { useUI } from '@wms/hooks';
import themePallete from '@wms/styles/themes/themes';
import { SpinnerDoom } from '@wms/components';
import { MonitorProvider } from '@wms/utils';

const queryClient = new QueryClient();

const App = () => {
  const { theme } = useUI();
  const themes = themePallete(theme);
  return (
    <ThemeProvider theme={themes}>
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={<SpinnerDoom />}>
          <MonitorProvider>
            <RouterProvider router={router} />
            <Toaster />
          </MonitorProvider>
        </React.Suspense>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;