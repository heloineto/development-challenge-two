/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import PrimaryButton from '../../elements/buttons/PrimaryButton';
import { Calendar, PaintBrushHousehold } from 'phosphor-react';
import api, { deletePatient, getPatients, postPatient } from '../../../lib/api';
import PatientProfileButtons from './PatientProfile.Buttons';
import CurrentPatientContext from '../../../lib/contexts/PatientsContext';
import { useSnackbar } from 'notistack';
import PatientProfileCache from './PatientProfile.Cache';
import useLocalStorage from '../../../lib/hook/useLocalStorage';
import IconButton from '../../elements/buttons/IconButton';
import { AxiosResponse } from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import AddressForm from '../../elements/forms/AddressForm';
import Picture from '../../elements/other/Picture';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { isEmpty } from 'lodash';
import useStatusSnackbars from '../../../lib/hook/useStatusSnackbars';

type FormValues = {
  fullName: string;
  birthdate?: string;
  email?: string;
  address?: Address;
  picture?: string;
};

type Props = ComponentProps<'form'>;

const toDate = (dateSrt: string) => {
  const [years, months, days] = dateSrt.split('-').map((str) => Number(str));

  return new Date(years, months - 1, days);
};

const fromDate = (date: Date) => date?.toISOString().split('T')[0];

const PatientProfileForm = ({ ...formProps }: Props) => {
  const { currPatient } = useContext(CurrentPatientContext);
  const [edit, setEdit] = useState(!currPatient);
  const [initialValues, setInitialValues] = useState<Partial<Patient>>({});
  const [cache, setCache] = useLocalStorage('form-cache', {});
  const { control, handleSubmit } = useForm<FormValues>();

  const queryClient = useQueryClient();
  const { mutateAsync: postAsync, status: postStatus } = useMutation(postPatient, {
    onSuccess: () => queryClient.invalidateQueries('patients'),
  });
  const { mutateAsync: deleteAsync, status: deleteStatus } = useMutation(deletePatient, {
    onSuccess: () => queryClient.invalidateQueries('patients'),
  });
  useStatusSnackbars(postStatus, 'POST');
  useStatusSnackbars(deleteStatus, 'DELETE');

  useEffect(() => setEdit(!currPatient), [currPatient]);

  useEffect(() => {
    if (currPatient) setInitialValues(currPatient);
    else if (cache) setInitialValues(cache);
  }, [currPatient, cache]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const { birthdate, fullName, picture, email, address } = values;

    const newPatient = {
      id: currPatient?.id,
      fullName: fullName,
      birthdate: birthdate || undefined,
      picture: picture || undefined,
      email: email || undefined,
      address: !isEmpty(address) ? address : undefined,
    };

    void postAsync(newPatient);
  };

  const onDelete = async () => {
    if (!currPatient) return;

    void deleteAsync(currPatient.id);
  };

  return (
    <div className="relative h-full">
      <form
        id="patient-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col"
        {...formProps}
      >
        <div className="flex items-center gap-x-4 px-4 py-7">
          <Controller
            name="fullName"
            control={control}
            rules={{ required: 'Forneça o nome completo' }}
            defaultValue={initialValues['fullName'] ?? ''}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                label="Nome completo*"
                size="medium"
                disabled={!edit}
              />
            )}
          />

          {currPatient ? (
            <PatientProfileButtons
              edit={edit}
              toggleEdit={() => setEdit((value) => !value)}
              deletePatient={onDelete}
            />
          ) : (
            <IconButton toolTip="Limpar formulário" colorName="orange">
              <PaintBrushHousehold
                className="h-5 w-auto"
                weight="bold"
                onClick={() => {
                  setCache({});
                }}
              />
            </IconButton>
          )}
        </div>
        <div className="flex flex-grow flex-col gap-10 border-t border-slate-200 px-4 pt-7 pb-4">
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="aspect-square md:w-1/3">
              <Controller
                name="picture"
                control={control}
                defaultValue={initialValues['picture'] ?? ''}
                render={({ field: { onChange, value } }) => (
                  <Picture value={value ?? null} onChange={onChange} disabled={!edit} />
                )}
              />
            </div>
            <div className="flex flex-col gap-10 md:w-2/3">
              <Controller
                name="birthdate"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!value) return true;

                    const tomorrow = new Date();
                    tomorrow.setUTCHours(0, 0, 0, 0);
                    tomorrow.setDate(tomorrow.getDate() + 1);

                    const date = toDate(value);
                    if (date >= tomorrow) return false;
                  },
                }}
                defaultValue={initialValues?.['birthdate']}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <DatePicker
                    value={value ? toDate(value) : value}
                    onChange={(value) => onChange(value instanceof Date ? fromDate(value) : value)}
                    label="Data de nascimento"
                    inputFormat="dd/MM/yyyy"
                    components={{
                      OpenPickerIcon: () =>
                        edit ? <Calendar className="text-slate-500" weight="duotone" /> : null,
                    }}
                    disableFuture
                    disabled={!edit}
                    renderInput={(params) => (
                      <TextField
                        helperText={error ? error.message : null}
                        variant="standard"
                        margin="dense"
                        fullWidth
                        color="primary"
                        {...params}
                        error={!!error}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Forneça um e-mail válido',
                  },
                }}
                defaultValue={initialValues['email'] ?? ''}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Email"
                    size="medium"
                    disabled={!edit}
                  />
                )}
              />
            </div>
          </div>
          <Controller
            name="address"
            control={control}
            defaultValue={initialValues?.['address']}
            render={({ field: { onChange, value } }) => (
              <AddressForm value={value} onChange={onChange} name="address" disabled={!edit} />
            )}
          />
        </div>
        <div className="mt-auto border-t border-slate-200 px-4 pt-5 pb-4">
          <PrimaryButton form="patient-form" type="submit">
            Salvar
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default PatientProfileForm;
