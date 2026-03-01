import axios from 'axios';
import { GeolocationData } from '../types/geolocation';

interface IpifyResponse {
  ip: string;
}

interface IpGeolocationAsn {
  as_number?: string | number;
  organization?: string;
  country?: string;
  name?: string;
}

interface IpGeolocationLocation {
  continent_code?: string;
  continent_name?: string;
  country_code2?: string;
  country_code3?: string;
  country_name?: string;
  country_name_official?: string;
  country_capital?: string;
  state_prov?: string;
  state_code?: string;
  district?: string;
  city?: string;
  zipcode?: string;
  latitude?: string | number;
  longitude?: string | number;
  is_eu?: boolean;
}

interface IpGeolocationCountryMetadata {
  calling_code?: string;
  tld?: string;
  languages?: string[];
}

interface IpGeolocationCurrency {
  code?: string;
  name?: string;
  symbol?: string;
}

interface IpGeolocationTimeZone {
  name?: string;
  offset?: number;
  offset_with_dst?: number;
  current_time?: string;
  current_time_unix?: number;
}

interface IpGeolocationResponse {
  ip?: string;
  query?: string;
  location?: IpGeolocationLocation;
  country_metadata?: IpGeolocationCountryMetadata;
  currency?: IpGeolocationCurrency;
  asn?: IpGeolocationAsn;
  time_zone?: IpGeolocationTimeZone;
  status?: string;
}

function stringifyAs(asn?: string | IpGeolocationAsn): string {
  if (!asn) return '';
  if (typeof asn === 'string') return asn;
  const number = asn.as_number
    ? String(asn.as_number).startsWith('AS')
      ? String(asn.as_number)
      : `AS${asn.as_number}`
    : '';
  const org = asn.organization || asn.name || '';
  const parts = [number, org].filter(Boolean);
  return parts.join(' ').trim();
}

function normalizeGeoResponse(data: IpGeolocationResponse): GeolocationData {
  const location = data.location || {};
  const lat = Number(location.latitude ?? 0);
  const lon = Number(location.longitude ?? 0);
  const timeZoneName = data.time_zone?.name || '';

  return {
    status: data.status || 'success',
    country: location.country_name || '',
    countryCode: location.country_code2 || '',
    region: location.state_code || '',
    regionName: location.state_prov || '',
    city: location.city || '',
    zip: location.zipcode || '',
    lat,
    lon,
    timezone: timeZoneName,
    isp: '',
    org: data.asn?.organization || '',
    as: stringifyAs(data.asn),
    query: data.ip || data.query || '',
    // Campos extras para compatibilidade com os usos atuais
    ip: data.ip || '',
    network: '',
    version: '',
    region_code: location.state_code || '',
    country_name: location.country_name || '',
    country_code: location.country_code2 || '',
    country_code_iso3: location.country_code3 || '',
    country_capital: location.country_capital || '',
    country_tld: data.country_metadata?.tld || '',
    continent_code: location.continent_code || '',
    in_eu: location.is_eu || false,
    postal: location.zipcode || '',
    latitude: lat,
    longitude: lon,
    utc_offset:
      typeof data.time_zone?.offset === 'number' ? String(data.time_zone.offset) : '',
    country_calling_code: data.country_metadata?.calling_code || '',
    currency: data.currency?.code || '',
    currency_name: data.currency?.name || '',
    languages: data.country_metadata?.languages?.join(', ') || '',
    country_area: '',
    country_population: '',
    asn: stringifyAs(data.asn),
  };
}

const IPIFY_URL = 'https://api.ipify.org?format=json';

export function getGeoUrl(ip: string, apiKey: string) {
  return `https://api.ipgeolocation.io/v3/ipgeo?apiKey=${apiKey}&ip=${ip}`;
}

export async function fetchPublicIp(): Promise<string> {
  const response = await axios.get<IpifyResponse>(IPIFY_URL);
  return response.data.ip;
}

export async function fetchGeolocationByIp(
  ip: string,
  apiKey: string
): Promise<GeolocationData> {
  const response = await axios.get<IpGeolocationResponse>(getGeoUrl(ip, apiKey));
  return normalizeGeoResponse(response.data);
}

export async function fetchGeolocation(
  apiKey: string,
  ip?: string
): Promise<GeolocationData> {
  const targetIp = ip || (await fetchPublicIp());
  return fetchGeolocationByIp(targetIp, apiKey);
}
