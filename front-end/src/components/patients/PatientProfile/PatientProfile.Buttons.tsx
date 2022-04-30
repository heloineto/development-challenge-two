import { NotePencil, Trash } from 'phosphor-react';
import React, { useCallback, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import IconButton from '../../elements/buttons/IconButton';
import PrimaryButton from '../../elements/buttons/PrimaryButton';
import SecondaryButton from '../../elements/buttons/SecondaryButton';
import Dialog from '../../elements/other/Dialog';
import classNames from 'clsx';

type Props = ComponentProps<'div'>;

const PatientProfileButtons = ({ className, ...divProps }: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const onEdit = useCallback(() => null, []);

  const onDelete = useCallback(() => {
    setDeleteDialogOpen(true);
  }, [setDeleteDialogOpen]);

  useHotkeys('delete', onDelete);

  return (
    <>
      <div className={classNames(className, 'flex gap-x-2')} {...divProps}>
        <IconButton toolTip="Deletar" colorName="red" onClick={onDelete}>
          <Trash className="h-5 w-auto" weight="bold" />
        </IconButton>
        <IconButton toolTip="Editar">
          <NotePencil className="h-5 w-auto" weight="bold" onClick={onEdit} />
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
            <PrimaryButton colorName="red">Deletar</PrimaryButton>
            <SecondaryButton onClick={() => setDeleteDialogOpen(false)}>Cancelar</SecondaryButton>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PatientProfileButtons;
