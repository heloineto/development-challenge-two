import React, { useEffect, useMemo, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { IconButton as MuiIconButton, Slider } from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from 'phosphor-react';
import SecondaryButton from '../../buttons/SecondaryButton';
import PrimaryButton from '../../buttons/PrimaryButton';

interface PictureEditorProps {
  image: File | string;
  onClose: () => void;
  onSave: (value: string) => void;
}

const PictureEditor = ({ image, onClose, onSave }: PictureEditorProps) => {
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [rotate, setRotate] = useState(0);
  const maxScale = useMemo(() => 4, []);
  const editorRef = useRef<AvatarEditor>(null);
  const { enqueueSnackbar } = useSnackbar();
  const border = 20;
  const divRef = useRef<HTMLDivElement>(null);

  const getPicture = () => {
    if (!editorRef?.current) {
      enqueueSnackbar('Não foi possível salvar a imagem', { variant: 'error' });
      return;
    }

    const canvasScaled = editorRef.current.getImageScaledToCanvas();

    const url = canvasScaled.toDataURL('image/jpeg', 0.75);
    const base64 = url.split(',')[1];
    const picture = base64;

    return picture;
  };

  useEffect(() => {
    const handleZoom = (e: WheelEvent) => {
      e.preventDefault();

      setScale((currScale) => {
        return Math.min(Math.max(1, currScale + e.deltaY * -0.001), maxScale);
      });
    };

    if (!divRef?.current) return;

    const divElem = divRef.current;
    const { width, height } = divElem.getBoundingClientRect();

    setSize({
      width: Math.max(width - border * 2, 0),
      height: Math.max(height - border * 2, 0),
    });

    divElem.addEventListener('wheel', handleZoom);

    return () => divElem.removeEventListener('wheel', handleZoom);
  }, [maxScale, divRef]);

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="grid h-full w-full overflow-hidden bg-slate-100">
        <div
          className="m-auto flex max-h-full w-full flex-col overflow-hidden"
          style={{ aspectRatio: '1 / 1' }}
          ref={divRef}
        >
          <AvatarEditor
            className="h-full w-full"
            style={{ aspectRatio: '1' }}
            width={size.width}
            height={size.height}
            ref={editorRef}
            scale={scale}
            border={border}
            position={position}
            onPositionChange={(newPosition) => setPosition(newPosition)}
            image={image}
            onLoadSuccess={() => {
              setPosition({ x: 0.5, y: 0.5 });
              setScale(1);
            }}
            rotate={rotate}
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between px-4 pt-2 lg:flex-row">
        <div className="hidden xl:block xl:w-80"></div>
        <div className="flex justify-center gap-x-4">
          <div className="flex">
            <MuiIconButton
              className="!text-slate-800 hover:!text-blue-600"
              onClick={() =>
                setRotate((value) => {
                  const newValue = value + 90;
                  return newValue >= 360 ? 0 : newValue;
                })
              }
            >
              <ArrowCounterClockwise className="h-5 w-5" />
            </MuiIconButton>
            <MuiIconButton
              className="!text-slate-800 hover:!text-blue-600"
              onClick={() =>
                setRotate((value) => {
                  const newValue = value - 90;
                  return newValue <= -360 ? 0 : newValue;
                })
              }
            >
              <ArrowClockwise className="h-5 w-5" />
            </MuiIconButton>
          </div>
          <div className="flex items-center gap-x-2">
            <MuiIconButton
              className="!text-slate-800 hover:!text-blue-600"
              onClick={() => setScale((value) => Math.max(value - 0.5, 1))}
            >
              <MagnifyingGlassMinus className="h-5 w-5" />
            </MuiIconButton>
            <Slider
              className="!w-40"
              aria-label="zoom"
              value={scale}
              min={1}
              max={maxScale}
              onChange={(event, newValue) => typeof newValue === 'number' && setScale(newValue)}
              step={0.1}
            />
            <MuiIconButton
              className="!text-slate-800 hover:!text-blue-600"
              onClick={() => setScale((value) => Math.min(value + 0.5, maxScale))}
            >
              <MagnifyingGlassPlus className="h-5 w-5" />
            </MuiIconButton>
          </div>
        </div>
        <div className="flex w-full gap-x-2.5 sm:w-96 md:w-80">
          <SecondaryButton className="!h-10 lg:!w-3/5" size="small" onClick={onClose}>
            Cancelar
          </SecondaryButton>
          <PrimaryButton
            className="!h-10 w-full lg:!w-3/5"
            size="small"
            onClick={() => {
              const picture = getPicture();
              if (!picture) return;

              onSave(picture);
            }}
          >
            Salvar
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PictureEditor;
