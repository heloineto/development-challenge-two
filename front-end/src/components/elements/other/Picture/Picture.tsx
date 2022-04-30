import React, { useCallback, useState } from 'react';
import PictureDialog from './Picture.Dialog';
import PictureView from './Picture.View';

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
}

const Picture = ({ value, onChange }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = useCallback(() => setDialogOpen(true), []);

  return (
    <>
      <PictureView picture={value} openDialog={openDialog} />

      <PictureDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default Picture;
