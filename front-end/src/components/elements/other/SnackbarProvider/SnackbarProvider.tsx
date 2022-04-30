import React from 'react';
import { SnackbarProvider as NsSnackbarProvider } from 'notistack';
import { CheckCircle, Info, WarningCircle, XCircle } from 'phosphor-react';

type Props = ComponentProps<typeof NsSnackbarProvider>;

const SnackbarProvider = ({ ...nsSnackbarProviderProps }: Props) => {
  return (
    <NsSnackbarProvider
      maxSnack={3}
      iconVariant={{
        success: <CheckCircle className="mr-2 h-6 w-auto text-emerald-500" weight="fill" />,
        error: <XCircle className="mr-2 h-6 w-auto text-red-500" weight="fill" />,
        warning: <WarningCircle className="mr-2 h-6 w-auto text-orange-500" weight="fill" />,
        info: <Info className="mr-2 h-6 w-auto text-sky-500" weight="fill" />,
      }}
      classes={{
        variantSuccess:
          '!bg-emerald-200 !text-emerald-900 !shadow-lg border border-emerald-400 !rounded-md !font-medium',
        variantError:
          '!bg-red-200 !text-red-900 !shadow-lg border border-red-400 !rounded-md !font-medium',
        variantWarning:
          '!bg-orange-200 !text-orange-900 !shadow-lg border border-orange-400 !rounded-md !font-medium',
        variantInfo:
          '!bg-sky-200 !text-sky-900 !shadow-lg border border-sky-400 !rounded-md !font-medium',
      }}
      {...nsSnackbarProviderProps}
    />
  );
};

export default SnackbarProvider;
