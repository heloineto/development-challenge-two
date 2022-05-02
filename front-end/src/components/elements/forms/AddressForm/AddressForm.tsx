import React, { useMemo, useState } from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import SecondaryButton from '../../buttons/SecondaryButton';
import PrimaryButton from '../../buttons/PrimaryButton';
import { makeValidate, TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import addressSchema from '../../../../lib/schemas/addressSchema';
import { addressDecorator } from './lib/decorators';
import { parseAddress, parseZipCode } from './lib/parsers';
import Dialog from '../../other/Dialog';

interface Props extends Omit<MuiTextFieldProps, 'value' | 'onChange'> {
  value: Address | undefined;
  onChange: (address: Address) => void;
}

const AddressForm = ({ value, onChange, disabled, ...muiTextFieldProps }: Props) => {
  const [open, setOpen] = useState(false);
  const initialValues = value;
  const addressStr = useMemo(() => parseAddress(value), [value]);

  return (
    <>
      <MuiTextField
        label="Endereço"
        multiline
        maxRows={2}
        value={addressStr}
        onClick={() => {
          if (!disabled) setOpen(true);
        }}
        disabled={disabled}
        {...muiTextFieldProps}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Form
          onSubmit={(values: Address) => {
            setOpen(false);
            onChange(values);
          }}
          validate={makeValidate<Partial<Address>>(addressSchema)}
          initialValues={initialValues}
          decorators={[addressDecorator] as any}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="px-2 py-2">
              <div>
                <div className="-mx-6 -mt-6 mb-4 border-b border-slate-200 pt-8 pb-6 text-center text-3xl font-bold leading-6 text-slate-800">
                  Endereço
                </div>
                <div className="flex flex-col gap-y-10">
                  <TextField
                    label="CEP"
                    name="zipCode"
                    fieldProps={{ parse: parseZipCode }}
                    required
                  />
                  <div className="flex gap-x-5">
                    <TextField label="Estado" name="state" required />
                    <TextField label="Cidade" name="city" required />
                  </div>
                  <TextField label="Bairro" name="neighborhood" required />
                  <div className="flex gap-x-5">
                    <TextField label="Rua" name="street" required />
                    <TextField label="Número" name="streetNumber" required />
                  </div>
                  <TextField label="Complemento" name="complement" />
                </div>
              </div>
              <div className="mt-6 flex flex-col-reverse gap-y-2.5 gap-x-5 md:flex-row">
                <SecondaryButton onClick={() => setOpen(false)}>Cancelar</SecondaryButton>
                <PrimaryButton type="submit">Salvar</PrimaryButton>
              </div>
            </form>
          )}
        </Form>
      </Dialog>
    </>
  );
};

export default AddressForm;
