import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';
import React from 'react';
import { useMemo } from 'react';
import twColors from 'tailwindcss/colors';

interface Props extends ButtonProps {
  colorName?: TailwindColorName;
}

const SecondaryButton = ({ className, colorName = 'slate', ...muiButtonProps }: Props) => {
  const color = twColors[colorName];

  const StyledButton = useMemo(
    () =>
      styled(Button)(() => ({
        color: color[500],
        border: `0.125rem solid ${color[400]}`,
        '&:hover': {
          borderColor: color[600],
          color: color[700],
        },
      })),
    [color],
  );

  return (
    <StyledButton
      className={classNames(
        className,
        'py-2 !text-base font-semibold transition-colors duration-500 sm:!text-lg',
      )}
      variant="outlined"
      {...muiButtonProps}
    />
  );
};

export default SecondaryButton;
