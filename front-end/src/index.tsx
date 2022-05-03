import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './lib/theme';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ptBR } from 'date-fns/esm/locale';
import 'tailwindcss/tailwind.css';
import SnackbarProvider from './components/elements/other/SnackbarProvider';

const container = document.getElementById('root');

/**
 * This is the new New root API
 * see: https://github.com/reactwg/react-18/discussions/5
 */
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <SnackbarProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </LocalizationProvider>
  </ThemeProvider>,
);
