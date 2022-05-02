import React, { useCallback, useState } from 'react';
import PictureDialog from './Picture.Dialog';
import PictureView from './Picture.View';

interface Props {
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

const Picture = ({ value, onChange, disabled }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = useCallback(() => (!disabled ? setDialogOpen(true) : undefined), [disabled]);

  return (
    <>
      <PictureView picture={value} openDialog={openDialog} disabled={disabled} />

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
