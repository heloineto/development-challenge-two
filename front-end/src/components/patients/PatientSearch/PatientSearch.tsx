import Dialog from '@components/elements/other/Dialog';
import { Button, ButtonProps } from '@mui/material';
import classNames from 'clsx';
import React from 'react';
import { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react';

type Props = ButtonProps;

const PatientSearch = ({ className }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button
        className={classNames(className, 'group')}
        variant="outlined"
        classes="flex justify-between text-gray-500"
        onClick={() => setDialogOpen(true)}
      >
        <div className="flex items-center justify-center gap-x-2">
          <MagnifyingGlass className="h-5 w-5" />
        </div>
        Pesquisar pacientes
        <div className="rounded-md border border-gray-400 px-3 text-base">Ctrl+K</div>
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default PatientSearch;
