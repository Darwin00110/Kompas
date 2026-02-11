/**
 * Interface para dados de geolocalização retornados pela API
 * Baseado no formato da API ip-api.com
 */
export interface GeolocationData {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

/**
 * Estado da API de geolocalização
 */
export type GeolocationStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Resposta da API com tratamento de erros
 */
export interface GeolocationResponse {
  status: GeolocationStatus;
  data: GeolocationData | null;
  error: string | null;
}
