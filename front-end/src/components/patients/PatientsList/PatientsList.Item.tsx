import { Avatar, Button, ButtonProps } from '@mui/material';
import React from 'react';
import classNames from 'clsx';

interface Props extends ComponentProps<'li'> {
  patient: Patient;
  muiButtonProps?: ButtonProps;
  selected?: boolean;
}

const PatientsListItem = ({ patient, muiButtonProps, selected, ...liProps }: Props) => {
  const { fullName, email, picture } = patient;

  return (
    <li {...liProps}>
      <Button
        className={classNames(
          selected && '!ring-2 !ring-blue-500 !ring-offset-2',
          'h-20 !w-full !justify-start gap-x-3 overflow-hidden border !border-slate-300 bg-white !py-0 !px-4 shadow-sm hover:border-slate-400',
        )}
        variant="outlined"
        {...muiButtonProps}
      >
        <Avatar className="!h-14 !w-14" alt={`${fullName}'s profile picture`} src={picture} />
        <div className="flex flex-col items-start">
          <p className="text-left text-sm font-medium text-slate-900 sm:text-base lg:text-sm xl:text-base">
            {fullName}
          </p>
          <p className="text-ellipsis text-sm text-slate-500 sm:text-base lg:text-sm xl:text-base">
            {email}
          </p>
        </div>
      </Button>
    </li>
  );
};

export default PatientsListItem;
