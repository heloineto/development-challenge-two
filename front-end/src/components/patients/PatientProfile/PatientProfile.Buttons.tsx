import { NotePencil, Trash } from 'phosphor-react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import IconButton from '../../elements/buttons/IconButton';
import PrimaryButton from '../../elements/buttons/PrimaryButton';
import SecondaryButton from '../../elements/buttons/SecondaryButton';
import Dialog from '../../elements/other/Dialog';
import classNames from 'clsx';

interface Props extends ComponentProps<'div'> {
  toggleEdit: () => void;
  deletePatient: () => void;
  edit: boolean;
}

const PatientProfileButtons = ({
  toggleEdit,
  deletePatient,
  edit,
  className,
  ...divProps
}: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onDelete = () => setDeleteDialogOpen(true);

  useHotkeys('delete', onDelete);

  return (
    <>
      <div className={classNames(className, 'flex gap-x-2')} {...divProps}>
        <IconButton toolTip="Deletar" colorName="red" onClick={onDelete}>
          <Trash className="h-5 w-auto" weight="bold" />
        </IconButton>
        <IconButton toolTip={edit ? 'Deixar de editar' : 'Editar'}>
          <NotePencil className="h-5 w-auto" weight="bold" onClick={toggleEdit} />
        </IconButton>
      </div>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <div className="mt-2.5 mb-2 flex flex-col items-center justify-center gap-y-6">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold leading-6 text-slate-900">Remover cadastro</div>
            <p className="mt-2 text-lg text-slate-500">
              Tem certeza de que deseja remover esse cadastro?
            </p>
          </div>
          <div className="flex w-full gap-x-6">
            <PrimaryButton
              colorName="red"
              onClick={() => {
                deletePatient();
                setDeleteDialogOpen(false);
              }}
            >
              Deletar
            </PrimaryButton>
            <SecondaryButton onClick={() => setDeleteDialogOpen(false)}>Cancelar</SecondaryButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PatientProfileButtons;
