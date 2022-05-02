import React, { useContext, useEffect, useState } from 'react';
import { Form, FormSpy } from 'react-final-form';
import { DatePicker, makeValidate, TextField } from 'mui-rff';
import patientSchema from '../../../lib/schemas/patientSchema';
import PrimaryButton from '../../elements/buttons/PrimaryButton';
import { Calendar, PaintBrushHousehold } from 'phosphor-react';
import AddressField from '../../elements/fields/AddressField';
import api from '../../../lib/api';
import PictureField from '../../elements/fields/PictureField';
import PatientProfileButtons from './PatientProfile.Buttons';
import PatientsContext from '../../../lib/contexts/PatientsContext';
import { useSnackbar } from 'notistack';
import PatientProfileCache from './PatientProfile.Cache';
import useLocalStorage from '../../../lib/hook/useLocalStorage';
import IconButton from '../../elements/buttons/IconButton';
import { AxiosResponse } from 'axios';

type PatientFormValues = {
  fullName: string;
  birthdate?: Date;
  email?: string;
  address?: Partial<Address>;
  picture?: string;
};

type Props = ComponentProps<'form'>;

const PatientProfileForm = ({ ...formProps }: Props) => {
  const { selectedPatient, setSelectedPatient, getPatients } = useContext(PatientsContext);
  const [edit, setEdit] = useState(!selectedPatient);
  const [initialValues, setInitialValues] = useState<any>({});
  const [cache, setCache] = useLocalStorage('form-cache', {});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setEdit(!selectedPatient);
  }, [selectedPatient]);

  useEffect(() => {
    if (selectedPatient) setInitialValues(selectedPatient);
    else if (cache) setInitialValues(cache);
  }, [selectedPatient, cache]);

  const onError = (message: string, error: any) => {
    enqueueSnackbar(message, { variant: 'error' });
    if (process.env.NODE_ENV === 'development') console.error(error);
  };

  const onSubmit = async (values: PatientFormValues) => {
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

  return (
    <div className="relative h-full">
      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={makeValidate<Partial<PatientFormValues>>(patientSchema)}
      >
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit} className="flex h-full flex-col" {...formProps}>
            <div className="flex items-center gap-x-4 px-4 py-7">
              <TextField
                label="Nome completo"
                name="fullName"
                size="medium"
                required
                disabled={!edit}
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
                  <PictureField name="picture" disabled={!edit} />
                </div>
                <div className="flex flex-col gap-10 md:w-2/3">
                  <DatePicker
                    name="birthdate"
                    label="Data de nascimento"
                    inputFormat="dd/MM/yyyy"
                    components={{
                      OpenPickerIcon: () =>
                        edit ? <Calendar className="text-slate-500" weight="duotone" /> : null,
                    }}
                    disableFuture
                    disabled={!edit}
                  />
                  <TextField label="Email" name="email" disabled={!edit} />
                </div>
              </div>
              <AddressField name="address" disabled={!edit} />
            </div>
            <pre className="hidden">{JSON.stringify(values, null, 2)}</pre>
            <div className="mt-auto border-t border-slate-200 px-4 pt-5 pb-4">
              <PrimaryButton type="submit">Salvar</PrimaryButton>
            </div>
            {!selectedPatient && (
              <FormSpy
                subscription={{ values: true }}
                component={({ values }) => (
                  <PatientProfileCache values={values} setCache={setCache} />
                )}
              />
            )}
          </form>
        )}
      </Form>
    </div>
  );
};

export default PatientProfileForm;
