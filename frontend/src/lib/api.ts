import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tjridck02j.execute-api.sa-east-1.amazonaws.com/Prod/',
});

export const getPatients = () => api.get(`/patients`).then(({ data }) => data);
export const postPatient = (newPatient: Optional<Patient, 'id'>) =>
  api.post('patients', JSON.stringify(newPatient));
export const deletePatient = (id: string) => api.delete(`patients/${id}`);

export default api;
