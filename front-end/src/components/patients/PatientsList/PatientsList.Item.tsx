import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import classNames from 'clsx';

interface Props extends ComponentProps<'li'> {
  patient: Patient;
  muiButtonProps?: ButtonProps;
  selected?: boolean;
}

const PatientsListItem = ({ patient, muiButtonProps, selected, ...liProps }: Props) => {
  const { fullName, email } = patient;

  return (
    <li {...liProps}>
      <Button
        className={classNames(
          selected && 'ring-primary-500 ring-2 ring-offset-2',
          'group flex h-20 w-full items-center justify-start gap-x-3 border !border-slate-300 bg-white px-4 shadow-sm hover:border-slate-400',
        )}
        variant="outlined"
        {...muiButtonProps}
      >
        {/* <Avatar
          className="h-12 w-12"
          alt={`${fullName}'s profile picture`}
          src={profilePicture?.url}
        /> */}
        <div className="flex flex-col items-start">
          <p className="text-left text-sm font-medium text-slate-900">{fullName}</p>
          <p className="text-sm text-slate-500">{email}</p>
        </div>
      </Button>
    </li>
  );
};

export default PatientsListItem;
