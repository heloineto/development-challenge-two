// import axios from 'axios';
import axios from 'axios';
import { useEffect, useState } from 'react';
import patientSchema from '../schemas/patientSchema';
import useOnError from './useOnError';

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const onError = useOnError();

  useEffect(() => {
    const getPatients = async () => {
      const response = await axios.get(
        'https://3fbmy904ja.execute-api.sa-east-1.amazonaws.com/Prod/patients',
      );

      const { data } = response;

      if (!Array.isArray(data)) {
        onError(
          `Não foi possível carregar pacientes. API retornou ${typeof data} ao invés de um Array`,
        );
        return;
      }

      for (const each of data) {
        try {
          await patientSchema.validate(each);
        } catch (error) {
          setError(error);
          return;
        }
      }

      setPatients(data as Patient[]);
      setLoading(false);
    };

    getPatients();
  }, []);

  return { patients, loading, error };
};

export default usePatients;
