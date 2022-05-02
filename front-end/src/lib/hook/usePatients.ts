import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import api from '../api';
import patientSchema from '../schemas/patientSchema';

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const getPatients = useCallback(async () => {
    const response = await api.get(`/patients`);

    const { data } = response;

    if (!Array.isArray(data)) {
      enqueueSnackbar(
        `Não foi possível carregar pacientes. API retornou ${typeof data} ao invés de um Array`,
        { variant: 'error' },
      );
      return;
    }

    const _patients: Patient[] = [];

    for (const each of data) {
      try {
        await patientSchema.validate(each);

        _patients.push(each);
      } catch (error) {
        enqueueSnackbar(`Erro de validação: Paciente formatado incorretamente`, {
          variant: 'error',
        });
      }
    }

    setPatients(_patients);
    setLoading(false);
  }, []);

  useEffect(() => {
    getPatients();
  }, []);

  return { patients, loading, selectedPatient, setSelectedPatient, getPatients };
};

export default usePatients;
