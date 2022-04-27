import React from 'react';
import classNames from 'clsx';
import PatientSearch from '../PatientSearch';

type Props = ComponentProps<'div'>;

const PatientList = ({ className, ...divProps }: Props) => {
  return (
    <div
      className={classNames(
        'flex h-full w-full flex-col overflow-y-hidden rounded-lg bg-white py-4 shadow',
        className,
      )}
      {...divProps}
    >
      <div className="px-4">
        <PatientSearch />
      </div>
      <div className="mx-3 mt-2 h-full space-y-2.5 overflow-y-scroll bg-scroll pl-1 pr-2 pb-1 sm:ml-5 sm:mr-2">
        {/* <PatientListAddButton onClick={onCreateStart} />
        <PatientListHits onSelect={onSelect} selected={selected} /> */}
      </div>
    </div>
  );
};

export default PatientList;
