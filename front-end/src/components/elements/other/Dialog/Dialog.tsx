import { DialogProps, Dialog as MuiDialog } from '@mui/material';
import React from 'react';
import useBreakpoint from '../../../../lib/hook/useBreakpoint';

type Props = DialogProps;

const Dialog = ({ ...muiDialogProps }: Props) => {
  const mobile = useBreakpoint('md');

  return (
    <MuiDialog
      fullScreen={mobile}
      fullWidth
      maxWidth="sm"
      classes={{
        paper: 'bg-white px-4 py-3 md:border-2 md:border-gray-300 md:!rounded-xl gap-y-3',
      }}
      {...muiDialogProps}
    />
  );
};

export default Dialog;
