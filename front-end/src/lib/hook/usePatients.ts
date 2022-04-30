import axios from 'axios';
import { useEffect, useState } from 'react';

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPatients = async () => {
      // const response = await api.get('');
      const response = await axios.get(
        'https://dl0v9p4cid.execute-api.sa-east-1.amazonaws.com/Prod/patients',
      );

      console.log(response);

      // setPatients(response.body);
      setLoading(false);
    };

    getPatients();
  }, []);

  return { patients, loading };
};

export default usePatients;
