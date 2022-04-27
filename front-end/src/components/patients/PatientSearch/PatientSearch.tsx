import React, { useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import classNames from 'clsx';
import { MagnifyingGlass } from 'phosphor-react';
import Dialog from '../../elements/other/Dialog';

type Props = ButtonProps;

const PatientSearch = ({ className }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button
        className={classNames(
          className,
          'flex h-10 !justify-between !rounded-lg !text-base !text-slate-500',
        )}
        variant="outlined"
        onClick={() => setDialogOpen(true)}
      >
        <div className="flex items-center gap-x-2.5">
          <MagnifyingGlass className="h-5 w-5" weight="bold" />
          Pesquisar pacientes
        </div>
        <div className="rounded-md border border-gray-400 px-3">Ctrl+K</div>
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default PatientSearch;
