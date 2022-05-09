import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

const MESSAGES = {
  POST: {
    loading: 'Salvando...',
    success: 'Salvo!',
    error: 'Erro ao salvar',
  },
  DELETE: {
    loading: 'Deletando...',
    success: 'Deletado!',
    error: 'Erro ao deletar',
  },
};

const useStatusSnackbars = (
  status: 'error' | 'loading' | 'idle' | 'success',
  method: 'POST' | 'DELETE',
) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    switch (status) {
      case 'loading': {
        enqueueSnackbar(MESSAGES[method][status], {
          key: 'status-loading',
          variant: 'info',
          // transitionDuration: { exit: 0 },
          persist: true,
        });
        return;
      }
      case 'success': {
        closeSnackbar('status-loading');

        enqueueSnackbar(MESSAGES[method][status], {
          key: 'status-success',
          variant: 'success',
          autoHideDuration: 1000,
        });
        return;
      }
      case 'error': {
        closeSnackbar('status-loading');

        enqueueSnackbar(MESSAGES[method][status], {
          key: 'status-error',
          variant: 'error',
          autoHideDuration: 1000,
        });
        return;
      }
    }
  }, [status]);
};

export default useStatusSnackbars;
