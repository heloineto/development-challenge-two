import React from 'react';
import classNames from 'clsx';
import PatientForm from './PatientProfile.Form';
import PatientProfileButtons from './PatientProfile.Buttons';

type Props = ComponentProps<'div'>;

const PatientProfile = ({ className, ...divProps }: Props) => {
  return (
    <div
      className={classNames(
        ' flex h-full w-full flex-col overflow-y-hidden rounded-lg bg-white p-4 shadow',
        className,
      )}
      {...divProps}
    >
      <div className="relative">
        <PatientProfileButtons className="absolute top-0 right-0" />
        <PatientForm />
      </div>
    </div>
  );
};

export default PatientProfile;
