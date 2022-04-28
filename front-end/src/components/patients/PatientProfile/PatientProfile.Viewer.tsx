import React from 'react';

type Props = ComponentProps<'div'>;

const PatientViewer = ({ ...divProps }: Props) => {
  return <div {...divProps}></div>;
};

export default PatientViewer;
