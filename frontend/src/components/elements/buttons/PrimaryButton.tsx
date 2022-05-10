import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';
import classNames from 'clsx';
import { useMemo } from 'react';
import twColors from 'tailwindcss/colors';
import React from 'react';

interface Props extends ButtonProps {
  colorName?: TailwindColorName;
}

const PrimaryButton = ({ className, colorName = 'blue', ...muiButtonProps }: Props) => {
  const color = twColors[colorName];

  const StyledButton = useMemo(
    () =>
      styled(Button)(() => ({
        backgroundColor: `${color[500]} !important`,
        color: color[100],
        border: `0.125rem solid ${color[400]}`,
        '&:hover': {
          backgroundColor: `${color[600]} !important`,
          borderColor: color[800],
          color: color[50],
        },
      })),
    [color],
  );

  return (
    <StyledButton
      className={classNames(
        className,
        'border-2 border-solid py-2 !text-base font-semibold transition-colors duration-500 dark:border-none sm:!text-lg',
      )}
      variant="contained"
      {...muiButtonProps}
    />
  );
};

export default PrimaryButton;
