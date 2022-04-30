import React from 'react';
import { Button as MuiButton, ButtonProps, Tooltip, TooltipProps } from '@mui/material';
import classNames from 'clsx';
import twColors from 'tailwindcss/colors';
import { useMemo } from 'react';
import { styled } from '@mui/material/styles';

interface Props extends ButtonProps {
  toolTip: string;
  colorName?: TailwindColorName;
  toolTipProps?: Partial<Omit<TooltipProps, 'children'>>;
}

const IconButton = ({
  toolTip,
  toolTipProps,
  colorName = 'sky',
  className,
  children,
  ...muiButtonProps
}: Props) => {
  const color = twColors[colorName];

  const StyledIconButton = useMemo(() => {
    return styled(MuiButton)(() => ({
      backgroundColor: `${color[200]} !important`,
      border: `0.125rem solid ${color[400]} !important`,
      borderRadius: 8,
      color: color[500],
      '&:hover': {
        backgroundColor: `${color[300]} !important`,
        color: color[700],
        '--tw-shadow-color': `${color[500]}80`,
        '--tw-shadow': 'var(--tw-shadow-colored) !important',
      },
    }));
  }, [color]);

  return (
    <Tooltip arrow title={toolTip} {...toolTipProps}>
      <StyledIconButton
        className={classNames(
          className,
          '!h-10 !w-10 !min-w-0 rounded-full border-2 border-solid !p-0 !shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm hover:text-slate-500 hover:!shadow-[0_0_8px_0.5px_rgba(0,0,0,1)] hover:backdrop-blur-[1px]',
        )}
        {...muiButtonProps}
      >
        <span className="sr-only">{toolTip}</span>
        {children}
      </StyledIconButton>
    </Tooltip>
  );
};

export default IconButton;
