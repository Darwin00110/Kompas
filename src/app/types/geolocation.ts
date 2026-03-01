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
  ip?: string;
  network?: string;
  version?: string;
  region_code?: string;
  country_name?: string;
  country_code?: string;
  country_code_iso3?: string;
  country_capital?: string;
  country_tld?: string;
  continent_code?: string;
  in_eu?: boolean;
  postal?: string;
  latitude?: number;
  longitude?: number;
  utc_offset?: string;
  country_calling_code?: string;
  currency?: string;
  currency_name?: string;
  languages?: string;
  country_area?: number | string;
  country_population?: number | string;
  asn?: string;
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
