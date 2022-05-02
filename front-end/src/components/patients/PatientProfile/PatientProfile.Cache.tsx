import { useEffect } from 'react';
import { debounce, isEmpty } from 'lodash';

interface Props<T> {
  values: T;
  setCache: SetState<T>;
}

const PatientProfileCache = ({ values, setCache }: Props<any>) => {
  useEffect(() => {
    cacheData(values, setCache);
  }, [values]);

  return null;
};

export default PatientProfileCache;

const cacheData = debounce((values, setCache) => {
  if (isEmpty(values)) return;

  console.log('CACHING', values);

  setCache(values);
}, 500);
