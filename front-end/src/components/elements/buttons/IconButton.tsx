import React from 'react';
import { Button as MuiButton, ButtonProps, Tooltip, TooltipProps } from '@mui/material';
import { motion } from 'framer-motion';
import classNames from 'clsx';
import twColors from 'tailwindcss/colors';
import { useMemo } from 'react';
import { styled } from '@mui/material/styles';

interface Props extends ButtonProps {
  toolTip: string;
  colorName?: TailwindColorName;
  toolTipProps?: Partial<Omit<TooltipProps, 'children'>>;
  motionDivProps?: ComponentProps<typeof motion.div>;
}

const IconButton = ({
  toolTip,
  toolTipProps,
  colorName = 'sky',
  className,
  children,
  motionDivProps,
  ...muiButtonProps
}: Props) => {
  const color = twColors[colorName];

  const StyledIconButton = useMemo(() => {
    return styled(MuiButton)(() => ({
      backgroundColor: `${color[300]} !important`,
      border: `0.125rem solid ${color[400]} !important`,
      borderRadius: 8,
      color: color[50],
      '&:hover': {
        backgroundColor: `${color[500]} !important`,
        '--tw-shadow-color': `${color[500]}80`,
        '--tw-shadow': 'var(--tw-shadow-colored) !important',
      },
    }));
  }, [color]);

  return (
    <motion.div
      className="rounded-full text-gray-400 hover:text-gray-500"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...motionDivProps}
    >
      <Tooltip arrow title={toolTip} {...toolTipProps}>
        <StyledIconButton
          className={classNames(
            className,
            '!h-10 !w-10 !min-w-0 border-2 border-solid !p-0 text-white !shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm hover:!shadow-[0_0_8px_0.5px_rgba(0,0,0,1)] hover:backdrop-blur-[1px]',
          )}
          {...muiButtonProps}
        >
          <span className="sr-only">{toolTip}</span>
          {children}
        </StyledIconButton>
      </Tooltip>
    </motion.div>
  );
};

export default IconButton;
