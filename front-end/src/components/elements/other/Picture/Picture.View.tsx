import React, { useState } from 'react';
import { NotePencil, PlusCircle, XCircle } from 'phosphor-react';
import { Button } from '@mui/material';

interface Props {
  picture: string | null;
  openDialog: () => void;
}

const PictureView = ({ picture, openDialog }: Props) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-red-300 bg-red-100"
        onClick={openDialog}
      >
        <XCircle className="h-9 w-auto text-red-600" weight="bold" />
        <div className="text-base text-red-700">Erro na imagem</div>
      </div>
    );
  }

  if (!picture) {
    return (
      <Button
        className="h-full w-full rounded-md !border-2 !border-dashed !border-slate-400 !bg-slate-200 hover:!bg-slate-300"
        onClick={openDialog}
        color="inherit"
      >
        <div className="flex flex-col justify-center">
          <PlusCircle className="h-9 w-auto text-slate-600" weight="bold" />
          <div className="text-base text-slate-700">Adicionar Foto</div>
        </div>
      </Button>
    );
  }

  return (
    <div onClick={openDialog} className="h-full w-full select-none overflow-hidden rounded-md">
      <img
        className="relative min-h-full min-w-full object-cover"
        src={picture}
        alt="Profile picture"
        onError={() => setImageError(true)}
      />
      <div className="absolute top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-25 opacity-0 hover:opacity-100">
        <NotePencil className="h-9 w-auto text-slate-400" weight="bold" />
      </div>
    </div>
  );
};

export default PictureView;
