/* eslint-disable */
import React, { useMemo, useState } from 'react';
import {
  TextField as MuiTextField,
  TextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import SecondaryButton from '../../buttons/SecondaryButton';
import PrimaryButton from '../../buttons/PrimaryButton';
import Dialog from '../../other/Dialog';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import cep, { CEP } from 'cep-promise';
import { isEmpty } from 'lodash';

export const parseZipCode = (value: string) => {
  if (!value) return value;

  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 5) return onlyNums;
  return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 8)}`;
};

export const parseAddress = (value: Address | undefined) => {
  if (!value || isEmpty(value)) return '';

  const { street, streetNumber, neighborhood, city, state, zipCode } = value;

  return `${street ?? ''}, ${streetNumber ?? ''} - ${neighborhood ?? ''}, ${city ?? ''} - ${
    state ?? ''
  }, CEP ${zipCode ?? ''}`;
};

interface Props extends Omit<MuiTextFieldProps, 'value' | 'onChange'> {
  value: Address | undefined;
  onChange: (address: Address) => void;
}

const AddressForm = ({ value, onChange, disabled, ...muiTextFieldProps }: Props) => {
  const [open, setOpen] = useState(false);
  const initialValues = value;
  const addressStr = useMemo(() => parseAddress(value), [value]);
  const { control, handleSubmit, setValue } = useForm<Address>();

  const onSubmit: SubmitHandler<Address> = (values: Address) => {
    setOpen(false);
    onChange(values);
  };

  const onChangeZipCode = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const zipCode = parseZipCode(e.target.value);
    if (!zipCode || zipCode.length !== 9) return zipCode;

    console.log({ zipCode });

    try {
      cep(zipCode, {}).then(({ state, city, street, neighborhood }: CEP) => {
        setValue('state', state);
        setValue('city', city);
        setValue('street', street);
        setValue('neighborhood', neighborhood);
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.error(error);
    }

    return zipCode;
  };

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
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 py-2">
          <div>
            <div className="-mx-6 -mt-6 mb-4 border-b border-slate-200 pt-8 pb-6 text-center text-3xl font-bold leading-6 text-slate-800">
              Endereço
            </div>
            <div className="flex flex-col gap-y-10">
              <Controller
                name="zipCode"
                control={control}
                rules={{ required: 'Forneca um CEP' }}
                defaultValue={initialValues?.['zipCode'] ?? ''}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={(e) => onChange(onChangeZipCode(e))}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="CEP*"
                  />
                )}
              />

              {/* <TextField label="CEP" name="zipCode" fieldProps={{ parse: parseZipCode }} required /> */}
              <div className="flex gap-x-5">
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: 'Forneca um Estado' }}
                  defaultValue={initialValues?.['state'] ?? ''}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      label="Estado*"
                    />
                  )}
                />
                {/* <TextField label="Estado" name="state" required /> */}
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: 'Forneca uma Cidade' }}
                  defaultValue={initialValues?.['city'] ?? ''}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      label="Cidade*"
                    />
                  )}
                />
                {/* <TextField label="Cidade" name="city" required /> */}
              </div>
              <Controller
                name="neighborhood"
                control={control}
                rules={{ required: 'Forneca um Bairro' }}
                defaultValue={initialValues?.['neighborhood'] ?? ''}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Bairro*"
                  />
                )}
              />
              {/* <TextField label="Bairro" name="neighborhood" required /> */}
              <div className="flex gap-x-5">
                <Controller
                  name="street"
                  control={control}
                  rules={{ required: 'Forneca uma Rua' }}
                  defaultValue={initialValues?.['street'] ?? ''}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      label="Rua*"
                    />
                  )}
                />
                {/* <TextField label="Rua" name="street" required /> */}
                <Controller
                  name="streetNumber"
                  control={control}
                  rules={{ required: 'Forneca um Número' }}
                  defaultValue={initialValues?.['streetNumber'] ?? ''}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      label="Número*"
                    />
                  )}
                />
                {/* <TextField label="Número" name="streetNumber" required /> */}
              </div>
              <Controller
                name="complement"
                control={control}
                defaultValue={initialValues?.['complement'] ?? ''}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Complemento*"
                  />
                )}
              />
              {/* <TextField label="Complemento" name="complement" /> */}
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse gap-y-2.5 gap-x-5 md:flex-row">
            <SecondaryButton onClick={() => setOpen(false)}>Cancelar</SecondaryButton>
            <PrimaryButton type="submit">Salvar</PrimaryButton>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AddressForm;
