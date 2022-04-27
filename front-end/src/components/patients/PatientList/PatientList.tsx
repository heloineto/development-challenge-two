import React from 'react';
import classNames from 'clsx';
// import PatientSearch from '@components/patients/PatientSearch';

type Props = ComponentProps<'div'>;

const PatientList = ({ className, ...divProps }: Props) => {
  return (
    <div
      className={classNames(
        'flex h-full w-full flex-col overflow-y-hidden bg-white py-5 shadow sm:rounded-lg',
        className,
      )}
      {...divProps}
    >
      <div className="px-3 sm:px-6">{/* <PatientSearch className="w-full" /> */}</div>
      <div className="mx-3 mt-2 h-full space-y-2.5 overflow-y-scroll bg-scroll pl-1 pr-2 pb-1 sm:ml-5 sm:mr-2">
        {/* <PatientListAddButton onClick={onCreateStart} />
        <PatientListHits onSelect={onSelect} selected={selected} /> */}
      </div>
    </div>
  );
};

export default PatientList;
