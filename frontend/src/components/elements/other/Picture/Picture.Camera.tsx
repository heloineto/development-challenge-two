import { IconButton as MuiIconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useSnackbar } from 'notistack';
import { Camera, X } from 'phosphor-react';
import IconButton from '../../buttons/IconButton';

interface Props {
  onClose: () => void;
  onTakePicture: (image: string) => void;
}

const PictureCamera = ({ onClose, onTakePicture }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [size, setSize] = useState({ width: 1920, height: 1080 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const takePicture = () => {
    const canvasElem = canvasRef.current;
    const videoElem = videoRef.current;

    if (!canvasElem || !videoElem) {
      enqueueSnackbar('Não foi possível capturar a imagem', { variant: 'error' });
      return;
    }

    const canvas2dContext = canvasElem.getContext('2d');

    if (!canvas2dContext) {
      enqueueSnackbar('Não foi possível capturar a imagem', { variant: 'error' });
      return;
    }

    canvas2dContext.drawImage(videoElem, 0, 0, size.width, size.height);
    const image = canvasElem.toDataURL('image/jpeg');

    onTakePicture(image);
  };

  useEffect(() => {
    let stream: MediaStream | null;

    const getVideo = async () => {
      const videoElem = videoRef.current;

      if (!videoElem) {
        enqueueSnackbar('Não foi possível conectar a câmera', { variant: 'error' });
        return;
      }

      stream = await navigator.mediaDevices.getUserMedia({ video: true }).catch((error) => {
        if (process.env.NODE_ENV === 'development') console.error(error);
        return null;
      });

      if (!stream) {
        enqueueSnackbar('Não foi possível conectar a câmera', { variant: 'error' });
        return;
      }

      const { width, height } = stream.getTracks()[0].getSettings();
      if (width && height) setSize({ width, height });

      videoElem.srcObject = stream;
      videoElem.play();
    };

    const disposeVideo = () => {
      if (!stream) {
        enqueueSnackbar('Não foi possível desconectar a câmera', { variant: 'error' });
        return;
      }

      stream.getTracks().forEach((track) => track.stop());
    };

    getVideo();

    return () => disposeVideo();
  }, [videoRef, enqueueSnackbar]);

  return (
    <div className="relative h-screen w-screen bg-white">
      <canvas className="absolute hidden" width={size.width} height={size.height} ref={canvasRef} />
      <video className="h-full w-full object-contain" ref={videoRef} />
      <MuiIconButton
        className="!absolute !bottom-2 left-1/2 h-20 w-20 !-translate-x-1/2 border border-solid !border-slate-200 !bg-white !p-0 !shadow hover:!shadow-md"
        onClick={() => {
          takePicture();
          onClose();
        }}
      >
        <Camera className="h-10 w-auto" aria-hidden="true" />
      </MuiIconButton>
      <div className="absolute top-2 right-0 -translate-x-1/2">
        <IconButton colorName="slate" toolTip="Fechar" onClick={() => onClose()}>
          <X className="h-5 w-5" weight="bold" />
        </IconButton>
      </div>
    </div>
  );
};

export default PictureCamera;
