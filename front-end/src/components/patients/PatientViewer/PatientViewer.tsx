import React from 'react';
import classNames from 'clsx';

type Props = ComponentProps<'div'>;

const PatientViewer = ({ className, ...divProps }: Props) => {
  return (
    <div
      className={classNames(
        'flex h-full w-full flex-col overflow-y-hidden bg-white py-5 shadow sm:rounded-lg',
        className,
      )}
      {...divProps}
    ></div>
  );
};

export default PatientViewer;
