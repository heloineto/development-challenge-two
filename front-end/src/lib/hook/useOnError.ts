import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

const useOnError = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onError = useCallback((message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  }, []);

  return onError;
};

export default useOnError;
