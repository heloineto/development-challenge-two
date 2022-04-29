import API_URL from '../constants/API_URL';
import { useEffect, useState } from 'react';

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatients = async () => {
      const response = await fetch(API_URL);

      // setPatients(response.body);
      // setLoading(false);
    };

    getPatients();
  }, []);

  return { patients, loading };
};

export default usePatients;
