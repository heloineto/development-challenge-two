import React from 'react';
import classNames from 'clsx';
import PatientProfileForm from './PatientProfile.Form';

type Props = ComponentProps<'div'>;

const PatientProfile = ({ className, ...divProps }: Props) => {
  return (
    <div
      className={classNames(
        'flex h-full w-full flex-col overflow-y-hidden rounded-lg bg-white shadow',
        className,
      )}
      {...divProps}
    >
      <PatientProfileForm />
    </div>
  );
};

export default PatientProfile;
