import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import Picture from '../../other/Picture';

type Props = ComponentProps<typeof Field>;

const PictureFieldAdapter = ({
  input: { onChange, value },
  ...rest
}: FieldRenderProps<unknown, HTMLElement, string | null>) => {
  return <Picture value={value} onChange={onChange} {...rest} />;
};

const PictureField = ({ ...rffFieldProps }: Props) => {
  return <Field {...rffFieldProps} component={PictureFieldAdapter} />;
};

export default PictureField;
