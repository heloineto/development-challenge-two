import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

const useBreakpoint = (key: number | Breakpoint) => {
  const { breakpoints } = useTheme();
  const down = useMediaQuery(breakpoints.down(key));

  return down;
};

export default useBreakpoint;
