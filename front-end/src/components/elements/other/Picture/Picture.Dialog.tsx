import React, { useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import classNames from 'clsx';
import IconButton from '../../buttons/IconButton';
import { Camera, ImageSquare, NotePencil, X } from 'phosphor-react';
import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import PictureEditor from './Picture.Editor';
import Dialog from '../Dialog';
import PictureCamera from './Picture.Camera';

interface Props {
  open: boolean;
  onClose: () => void;
  value: string | null;
  onChange: (value: string | null) => void;
}

const PictureDialog = ({ open, onClose, value, onChange }: Props) => {
  const [image, setImage] = useState<File | string | null>(value);
  const { enqueueSnackbar } = useSnackbar();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={!!image}
        classes={{
          paper: classNames(
            image ? 'mx-10 max-h-[90%]' : 'max-w-2xl max-h-[50%]',
            'bg-transparent rounded-xl',
          ),
        }}
      >
        <div className="flex h-full flex-col gap-y-5 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 py-5 px-6 text-center">
            <div className="w-10" />
            <div className="text-center text-2xl font-semibold text-slate-800">
              {value ? 'Atualizar Foto' : 'Adicionar Foto'}
            </div>
            <IconButton colorName="slate" toolTip="Fechar" onClick={onClose}>
              <X className="h-5 w-5" />
            </IconButton>
          </div>
          <div
            className={classNames(image ? 'flex-row' : 'flex-col', 'flex justify-end gap-2.5 px-6')}
          >
            <PrimaryButton
              endIcon={<ImageSquare className="h-6 w-auto" weight="bold" />}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                className="hidden"
                ref={fileInputRef}
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) {
                    enqueueSnackbar('Não foi possível carregar o arquivo', {
                      variant: 'error',
                    });
                    return;
                  }

                  setImage(file);
                  setEditorOpen(true);
                }}
              />
              Selecionar arquivo
            </PrimaryButton>
            <SecondaryButton
              endIcon={<Camera className="h-6 w-auto" weight="bold" />}
              onClick={() => setCameraOpen(true)}
            >
              Capturar da câmera
            </SecondaryButton>
            {image && (
              <SecondaryButton
                endIcon={<NotePencil className="h-6 w-auto" weight="bold" />}
                onClick={() => setEditorOpen(true)}
              >
                Editar Atual
              </SecondaryButton>
            )}
          </div>
          <div className="mx-auto mb-5 flex aspect-square h-full flex-col overflow-hidden">
            {image && (
              <img
                className="relative flex h-full w-full flex-col overflow-hidden rounded-lg object-cover"
                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                alt="saved picture"
              />
            )}
          </div>
        </div>
      </Dialog>
      <Dialog
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        fullScreen
        classes={{ paper: 'bg-transparent' }}
      >
        <PictureCamera
          onClose={() => setCameraOpen(false)}
          onTakePicture={(image) => {
            setImage(image);
            setEditorOpen(true);
          }}
        />
      </Dialog>
      {image && (
        <Dialog open={editorOpen} onClose={() => setEditorOpen(false)}>
          <PictureEditor
            onClose={() => setEditorOpen(false)}
            image={image}
            onSave={(picture) => {
              onChange?.(picture);
              onClose();
              setEditorOpen(false);
              setImage(null);
            }}
          />
        </Dialog>
      )}
    </>
  );
};

export default PictureDialog;
