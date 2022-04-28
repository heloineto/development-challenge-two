import React from 'react';

type Props = ComponentProps<'div'>;

const PatientForm = ({ ...divProps }: Props) => {
  return <div {...divProps}></div>;
};

export default PatientForm;
