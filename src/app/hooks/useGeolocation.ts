import { useCallback, useEffect, useState } from 'react';
import { GeolocationData, GeolocationStatus } from '../types/geolocation';
import { fetchGeolocation, fetchGeolocationByIp } from '../services/geolocationService';

export function useGeolocation(apiKey: string) {
  const [data, setData] = useState<GeolocationData | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (ip?: string) => {
      try {
        setStatus('loading');
        const geoData = await fetchGeolocation(apiKey, ip);
        setData(geoData);
        setError(null);
        setStatus('success');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setStatus('error');
      }
    },
    [apiKey]
  );

  const lookup = useCallback(
    async (ip: string) => {
      try {
        setStatus('loading');
        const geoData = await fetchGeolocationByIp(ip, apiKey);
        setData(geoData);
        setError(null);
        setStatus('success');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setStatus('error');
      }
    },
    [apiKey]
  );

  useEffect(() => {
    load();
  }, [load]);

  return { data, status, error, load, lookup };
}
