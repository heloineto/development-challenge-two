import { createTheme, ThemeOptions } from '@mui/material';
import twColors from 'tailwindcss/colors';

const theme: ThemeOptions = {
  breakpoints: {
    values: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    } as any,
  },
  palette: {
    primary: {
      light: twColors.blue[500],
      main: twColors.blue[600],
      dark: twColors.blue[700],
      contrastText: '#FFF',
    },
    secondary: {
      light: twColors.blue[400],
      main: twColors.blue[500],
      dark: twColors.blue[600],
      contrastText: '#FFF',
    },
    error: {
      light: twColors.red[400],
      main: twColors.red[500],
      dark: twColors.red[600],
    },
    warning: {
      light: twColors.yellow[400],
      main: twColors.yellow[500],
      dark: twColors.yellow[600],
    },
    info: {
      light: twColors.blue[400],
      main: twColors.blue[500],
      dark: twColors.blue[600],
    },
    success: {
      light: twColors.green[400],
      main: twColors.green[500],
      dark: twColors.green[600],
    },
    grey: {
      50: twColors.slate[50],
      100: twColors.slate[100],
      200: twColors.slate[200],
      300: twColors.slate[300],
      400: twColors.slate[400],
      500: twColors.slate[500],
      600: twColors.slate[600],
      700: twColors.slate[700],
      800: twColors.slate[800],
      900: twColors.slate[900],
    },
  },
  typography: {
    fontFamily:
      'Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
    fontSize: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        container: {
          backdropFilter: 'blur(2px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '100%',
          textTransform: 'none',
          fontWeight: '500',
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
          boxShadow: '0 0 0 #0000',
          ':hover': {
            boxShadow: '0 0 0 #0000',
          },
        },
      },
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      },
    },
  },
};

export default createTheme(theme);
