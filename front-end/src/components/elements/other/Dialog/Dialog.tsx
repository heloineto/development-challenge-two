import useBreakpoint from '@lib/hook/useBreakpoint';
import { DialogProps } from '@mui/material';
import React from 'react';

type Props = DialogProps;

const Dialog = ({ ...muiDialogProps }: Props) => {
  const mobile = useBreakpoint('md');

  return (
    <Dialog
      fullScreen={mobile}
      fullWidth
      maxWidth="sm"
      classes={{ paper: 'bg-white px-4 py-3 border-2 border-gray-300 gap-y-3 sm:h-3/4' }}
      {...muiDialogProps}
    />
  );
};

export default Dialog;
