import React, { useEffect, useMemo, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from 'phosphor-react';
import SecondaryButton from '../../buttons/SecondaryButton';
import PrimaryButton from '../../buttons/PrimaryButton';
import IconButton from '../../buttons/IconButton';

interface PictureEditorProps {
  image: File | string;
  onClose: () => void;
  onSave: (value: string) => void;
}

const PictureEditor = ({ image, onClose, onSave }: PictureEditorProps) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
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

    const picture = canvasScaled.toDataURL('image/jpeg', 0.75);

    return picture;
  };

  useEffect(() => {
    const divElem = divRef.current;
    if (!divElem) return;

    const handleZoom = (e: WheelEvent) => {
      e.preventDefault();

      setScale((currScale) => {
        return Math.min(Math.max(1, currScale + e.deltaY * -0.001), maxScale);
      });
    };

    divElem.addEventListener('wheel', handleZoom);

    return () => divElem.removeEventListener('wheel', handleZoom);
  }, [maxScale]);

  useEffect(() => {
    const divElem = divRef.current;
    if (!divElem) return;

    const handleResize = () => {
      const { width, height } = divElem.getBoundingClientRect();

      setSize({
        width: Math.max(width - border * 2, 0),
        height: Math.max(height - border * 2, 0),
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="grid h-full w-full overflow-hidden bg-slate-100">
        <div
          className="m-auto flex aspect-square max-h-full w-full flex-col overflow-hidden"
          ref={divRef}
        >
          <AvatarEditor
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

      <div className="flex w-full flex-col items-center justify-between gap-x-4 gap-y-2 pt-2 lg:flex-row">
        <div className="flex w-full justify-between sm:w-2/3">
          <div className="flex">
            <IconButton
              className="!rounded-r-none"
              toolTip="Girar no sentido anti-horário"
              colorName="violet"
              onClick={() =>
                setRotate((value) => {
                  const newValue = value - 90;
                  return newValue <= -360 ? 0 : newValue;
                })
              }
            >
              <ArrowCounterClockwise className="h-5 w-5" />
            </IconButton>
            <IconButton
              className="!-ml-1 !rounded-l-none"
              toolTip="Girar no sentido horário"
              colorName="violet"
              onClick={() =>
                setRotate((value) => {
                  const newValue = value + 90;
                  return newValue >= 360 ? 0 : newValue;
                })
              }
            >
              <ArrowClockwise className="h-5 w-5" />
            </IconButton>
          </div>
          <div className="flex items-center gap-x-4">
            <IconButton
              toolTip="Menos zoom"
              colorName="blue"
              onClick={() => setScale((value) => Math.max(value - 0.5, 1))}
            >
              <MagnifyingGlassMinus className="h-5 w-5" />
            </IconButton>
            <Slider
              className="!w-40"
              aria-label="zoom"
              value={scale}
              min={1}
              max={maxScale}
              onChange={(event, newValue) => typeof newValue === 'number' && setScale(newValue)}
              step={0.1}
            />
            <IconButton
              toolTip="Mais zoom"
              colorName="blue"
              onClick={() => setScale((value) => Math.min(value + 0.5, maxScale))}
            >
              <MagnifyingGlassPlus className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
        <div className="flex w-full gap-x-2.5 sm:w-1/3">
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
