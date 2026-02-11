import { MapData, MapMarker, Coordinates } from '../types/mapData';

/**
 * Serviço de Mapa
 * 
 * Gerencia dados de mapa e marcadores que virão da API backend
 */

// URL da API de mapas (será substituída pela sua API)
const MAP_API_ENDPOINT = '/api/map';

/**
 * Busca dados do mapa para uma localização
 * 
 * @param coordinates - Coordenadas do centro do mapa
 * @param radius - Raio de busca em km (opcional)
 * @returns Promise com dados do mapa
 * 
 * PARA PRODUÇÃO: Substitua por chamada real ao backend
 * 
 * @example
 * ```typescript
 * const response = await fetch(`${MAP_API_ENDPOINT}/data`, {
 *   method: 'POST',
 *   headers: {
 *     'Authorization': `Bearer ${token}`,
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({ coordinates, radius })
 * });
 * 
 * return await response.json();
 * ```
 */
export async function fetchMapData(
  coordinates: Coordinates,
  radius?: number
): Promise<MapData> {
  try {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // TEMPORÁRIO: Retorna dados mock
    const mockData: MapData = {
      center: coordinates,
      zoom: 13,
      markers: [
        {
          id: '1',
          position: coordinates,
          title: 'Localização Atual',
          description: 'Sua localização baseada no IP',
          type: 'current',
          timestamp: new Date().toISOString()
        },
        // Adiciona alguns marcadores próximos para demonstração
        {
          id: '2',
          position: {
            lat: coordinates.lat + 0.01,
            lng: coordinates.lng + 0.01
          },
          title: 'Ponto de Interesse 1',
          description: 'Dados de exemplo da API',
          type: 'point-of-interest',
          timestamp: new Date().toISOString()
        },
        {
          id: '3',
          position: {
            lat: coordinates.lat - 0.01,
            lng: coordinates.lng + 0.015
          },
          title: 'Ponto de Interesse 2',
          description: 'Mais dados de exemplo',
          type: 'point-of-interest',
          timestamp: new Date().toISOString()
        }
      ],
      layers: []
    };
    
    // TODO: Quando o backend estiver pronto, descomente:
    /*
    const response = await fetch(`${MAP_API_ENDPOINT}/data`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        coordinates, 
        radius: radius || 5 
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MapData = await response.json();
    return data;
    */
    
    return mockData;
  } catch (error) {
    console.error('Map data fetch error:', error);
    throw error;
  }
}

/**
 * Adiciona um marcador ao mapa via API
 * 
 * @param marker - Dados do marcador
 * @returns Promise com o marcador criado
 */
export async function addMapMarker(marker: Omit<MapMarker, 'id'>): Promise<MapMarker> {
  try {
    // TODO: Implementar quando o backend estiver pronto
    /*
    const response = await fetch(`${MAP_API_ENDPOINT}/markers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(marker)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
    */
    
    console.log('Add marker (not implemented yet):', marker);
    return { ...marker, id: Date.now().toString() };
  } catch (error) {
    console.error('Add marker error:', error);
    throw error;
  }
}

/**
 * Busca marcadores em tempo real (WebSocket/Server-Sent Events)
 * 
 * @param coordinates - Coordenadas de referência
 * @param callback - Função chamada quando novos dados chegam
 * @returns Função para cancelar a inscrição
 */
export function subscribeToRealtimeMarkers(
  coordinates: Coordinates,
  callback: (markers: MapMarker[]) => void
): () => void {
  // TODO: Implementar WebSocket ou Server-Sent Events quando o backend estiver pronto
  /*
  const ws = new WebSocket(`wss://seu-backend.com/ws/markers`);
  
  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'subscribe', coordinates }));
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback(data.markers);
  };
  
  return () => {
    ws.close();
  };
  */
  
  console.log('Realtime subscription (not implemented yet):', coordinates);
  
  // Retorna função vazia para cancelar
  return () => {};
}
