import React from 'react';

type Props = ComponentProps<'div'>;

const PatientForm = ({ ...divProps }: Props) => {
  return <div {...divProps}>PatientForm</div>;
};

export default PatientForm;
