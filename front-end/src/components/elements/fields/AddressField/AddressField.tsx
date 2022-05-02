import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import AddressForm from '../../forms/AddressForm';

type Props = ComponentProps<typeof Field>;

const AddressFieldAdapter = ({
  input: { onChange, value },
  ...rest
}: FieldRenderProps<unknown, HTMLElement, Address | undefined>) => {
  return <AddressForm value={value} onChange={onChange} {...rest} />;
};

const AddressField = ({ ...rffFieldProps }: Props) => {
  return <Field {...rffFieldProps} component={AddressFieldAdapter}></Field>;
};

export default AddressField;
