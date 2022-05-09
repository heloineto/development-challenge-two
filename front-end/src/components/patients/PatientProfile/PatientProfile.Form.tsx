import React, { useContext, useEffect, useState } from 'react';
import PrimaryButton from '../../elements/buttons/PrimaryButton';
import { Calendar, PaintBrushHousehold } from 'phosphor-react';
import api from '../../../lib/api';
import PatientProfileButtons from './PatientProfile.Buttons';
import PatientsContext from '../../../lib/contexts/PatientsContext';
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

type FormValues = {
  fullName: string;
  birthdate?: Date;
  email?: string;
  address?: Address;
  picture?: string;
};

type Props = ComponentProps<'form'>;

const PatientProfileForm = ({ ...formProps }: Props) => {
  const { selectedPatient, setSelectedPatient, getPatients } = useContext(PatientsContext);
  const [edit, setEdit] = useState(!selectedPatient);
  const [initialValues, setInitialValues] = useState<any>({});
  const [cache, setCache] = useLocalStorage('form-cache', {});
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<FormValues>();

  useEffect(() => setEdit(!selectedPatient), [selectedPatient]);

  useEffect(() => {
    if (selectedPatient) setInitialValues(selectedPatient);
    else if (cache) setInitialValues(cache);
  }, [selectedPatient, cache]);

  const onError = (message: string, error: any) => {
    enqueueSnackbar(message, { variant: 'error' });
    if (process.env.NODE_ENV === 'development') console.error(error);
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const newPatient = { id: selectedPatient?.id, ...values };

    let response: AxiosResponse<any, any> | undefined;

    try {
      response = await api.post('patients', JSON.stringify(newPatient));
    } catch (error) {
      onError('Erro ao salvar paciente', error);
      return;
    }

    if (response?.status === 200) {
      enqueueSnackbar('Paciente salvo', { variant: 'success' });

      setCache({});
      getPatients?.();
      return;
    }

    onError('Erro ao salvar paciente', response);
  };

  const onDelete = async () => {
    if (!selectedPatient) return;

    let response: AxiosResponse<any, any> | undefined;

    try {
      response = await api.delete(`patients/${selectedPatient.id}`);
    } catch (error) {
      onError('Erro ao deletar paciente', error);
      return;
    }

    if (response?.status === 200) {
      enqueueSnackbar('Paciente deletado', { variant: 'success' });
      getPatients?.();
      setSelectedPatient?.(null);
      return;
    }

    onError('Erro ao deletar paciente', response);
  };

  console.log(initialValues['fullName']);

  return (
    <div className="relative h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col" {...formProps}>
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

          {selectedPatient ? (
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
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Picture value={value ?? null} onChange={onChange} disabled={!edit} />
                )}
              />
            </div>
            <div className="flex flex-col gap-10 md:w-2/3">
              <Controller
                name="birthdate"
                control={control}
                defaultValue={initialValues['birthdate'] ?? ''}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <DatePicker
                    value={value}
                    onChange={onChange}
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
                        error={!!error}
                        helperText={error ? error.message : null}
                        id="dateOfBirth"
                        variant="standard"
                        margin="dense"
                        fullWidth
                        color="primary"
                        autoComplete="bday"
                        {...params}
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
            defaultValue={initialValues['address'] ?? ''}
            render={({ field: { onChange, value } }) => (
              <AddressForm value={value} onChange={onChange} name="address" disabled={!edit} />
            )}
          />
        </div>
        {/* <pre className="hidden">{JSON.stringify(values, null, 2)}</pre> */}
        <div className="mt-auto border-t border-slate-200 px-4 pt-5 pb-4">
          <PrimaryButton type="submit">Salvar</PrimaryButton>
        </div>
        {/* {!selectedPatient && (
          <FormSpy
            subscription={{ values: true }}
            component={({ values }) => <PatientProfileCache values={values} setCache={setCache} />}
          />
        )} */}
      </form>
    </div>
  );
};

export default PatientProfileForm;
