import { GeolocationData } from '../types/geolocation';

/**
 * Serviço de Geolocalização
 * 
 * Este serviço é responsável por buscar dados de geolocalização.
 * Atualmente usa dados de demonstração devido a restrições de CORS/HTTPS.
 * 
 * PARA PRODUÇÃO: Substitua getMockGeolocationData() por uma chamada ao seu backend
 */

// URL do seu backend (substitua quando estiver pronto)
const API_ENDPOINT = '/api/geolocation';

/**
 * Dados de demonstração baseados no exemplo fornecido
 * Em produção, isso virá do seu backend
 */
function getMockGeolocationData(ip?: string): GeolocationData {
  // Diferentes dados mock baseados no IP para demonstração
  const mockData: Record<string, GeolocationData> = {
    '24.48.0.1': {
      status: "success",
      country: "Canada",
      countryCode: "CA",
      region: "QC",
      regionName: "Quebec",
      city: "Montreal",
      zip: "H1K",
      lat: 45.6085,
      lon: -73.5493,
      timezone: "America/Toronto",
      isp: "Le Groupe Videotron Ltee",
      org: "Videotron Ltee",
      as: "AS5769 Videotron Ltee",
      query: "24.48.0.1"
    },
    '8.8.8.8': {
      status: "success",
      country: "United States",
      countryCode: "US",
      region: "CA",
      regionName: "California",
      city: "Mountain View",
      zip: "94035",
      lat: 37.386,
      lon: -122.0838,
      timezone: "America/Los_Angeles",
      isp: "Google LLC",
      org: "Google Public DNS",
      as: "AS15169 Google LLC",
      query: "8.8.8.8"
    },
    '1.1.1.1': {
      status: "success",
      country: "Australia",
      countryCode: "AU",
      region: "QLD",
      regionName: "Queensland",
      city: "Brisbane",
      zip: "4000",
      lat: -27.4679,
      lon: 153.0281,
      timezone: "Australia/Brisbane",
      isp: "Cloudflare, Inc.",
      org: "APNIC Research and Development",
      as: "AS13335 Cloudflare, Inc.",
      query: "1.1.1.1"
    },
    '200.160.2.3': {
      status: "success",
      country: "Brazil",
      countryCode: "BR",
      region: "SP",
      regionName: "São Paulo",
      city: "São Paulo",
      zip: "01000",
      lat: -23.5505,
      lon: -46.6333,
      timezone: "America/Sao_Paulo",
      isp: "Telefonica Brasil S.A",
      org: "Telefonica Brasil S.A",
      as: "AS18881 Telefonica Brasil S.A",
      query: "200.160.2.3"
    }
  };
  
  // Se o IP estiver no mock data, retorna
  if (ip && mockData[ip]) {
    return mockData[ip];
  }
  
  // Caso contrário, retorna dados padrão (Montreal)
  return mockData['24.48.0.1'];
}

/**
 * Busca dados de geolocalização
 * 
 * IMPLEMENTAÇÃO ATUAL: Retorna dados mock para demonstração
 * 
 * PARA PRODUÇÃO: Implemente a chamada real ao backend:
 * 
 * @example
 * ```typescript
 * const response = await fetch(`${API_ENDPOINT}/${ip || ''}`, {
 *   method: 'GET',
 *   headers: {
 *     'Authorization': `Bearer ${token}`,
 *     'Content-Type': 'application/json'
 *   }
 * });
 * 
 * if (!response.ok) {
 *   throw new Error(`HTTP error! status: ${response.status}`);
 * }
 * 
 * const data: GeolocationData = await response.json();
 * return data;
 * ```
 * 
 * @param ip - Endereço IP (opcional). Se não fornecido, usa o IP do cliente
 * @returns Promise com os dados de geolocalização
 */
export async function fetchGeolocation(ip?: string): Promise<GeolocationData> {
  try {
    // Simula um pequeno delay para parecer uma chamada de API real
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // TEMPORÁRIO: Retorna dados mock
    const data = getMockGeolocationData(ip);
    
    // TODO: Quando o backend estiver pronto, descomente o código abaixo e remova getMockGeolocationData()
    /*
    const url = ip ? `${API_ENDPOINT}/${ip}` : API_ENDPOINT;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Se usar cookies para autenticação
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GeolocationData = await response.json();

    if (data.status !== 'success') {
      throw new Error('Failed to fetch geolocation data');
    }

    return data;
    */
    
    return data;
  } catch (error) {
    console.error('Geolocation fetch error:', error);
    throw error;
  }
}

/**
 * Salva dados de geolocalização (preparado para backend futuro)
 * 
 * @param data - Dados de geolocalização para salvar
 * @returns Promise com confirmação
 * 
 * @example
 * ```typescript
 * const response = await fetch(`${API_ENDPOINT}/save`, {
 *   method: 'POST',
 *   headers: {
 *     'Authorization': `Bearer ${token}`,
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify(data)
 * });
 * return response.ok;
 * ```
 */
export async function saveGeolocationData(data: GeolocationData): Promise<boolean> {
  try {
    // TODO: Implementar quando o backend estiver pronto
    console.log('Save geolocation data (not implemented yet):', data);
    return true;
  } catch (error) {
    console.error('Save geolocation error:', error);
    return false;
  }
}

/**
 * Busca histórico de geolocalizações (preparado para backend futuro)
 * 
 * @returns Promise com array de dados históricos
 * 
 * @example
 * ```typescript
 * const response = await fetch(`${API_ENDPOINT}/history`, {
 *   method: 'GET',
 *   headers: {
 *     'Authorization': `Bearer ${token}`,
 *     'Content-Type': 'application/json'
 *   }
 * });
 * 
 * if (!response.ok) {
 *   throw new Error(`HTTP error! status: ${response.status}`);
 * }
 * 
 * return await response.json();
 * ```
 */
export async function fetchGeolocationHistory(): Promise<GeolocationData[]> {
  try {
    // TODO: Implementar quando o backend estiver pronto
    console.log('Fetch history (not implemented yet)');
    return [];
  } catch (error) {
    console.error('Fetch history error:', error);
    return [];
  }
}