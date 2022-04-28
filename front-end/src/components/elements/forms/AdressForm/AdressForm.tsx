import React, { useMemo, useState } from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import SecondaryButton from '../../buttons/SecondaryButton';
import PrimaryButton from '../../buttons/PrimaryButton';
import { makeValidate, TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import adressSchema from '../../../../lib/schemas/adressSchema';
import { adressDecorator } from './lib/decorators';
import { parseAdress, parseZipCode } from './lib/parsers';
import Dialog from '../../other/Dialog';

interface Props {
  textFieldProps?: MuiTextFieldProps;
  value: Adress | undefined;
  onChange: (adress: Adress) => void;
}

const AdressForm = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const initialValues = value;
  const adressStr = useMemo(() => parseAdress(value), [value]);

  return (
    <>
      <MuiTextField
        label="Endereço"
        multiline
        maxRows={2}
        value={adressStr}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Form
          onSubmit={(values: Adress) => {
            setOpen(false);
            onChange(values);
          }}
          validate={makeValidate<Partial<Adress>>(adressSchema)}
          initialValues={initialValues}
          decorators={[adressDecorator] as any}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="px-2 py-2">
              <div>
                <div className="-mx-6 -mt-6 mb-4 border-b border-gray-200 pt-8 pb-6 text-center text-3xl font-bold leading-6 text-gray-800">
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
              <div className="mt-6 flex h-11 flex-col gap-5 md:flex-row">
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

export default AdressForm;
