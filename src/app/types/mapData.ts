/**
 * Tipos para dados do mapa e marcadores
 */

/**
 * Coordenadas geográficas
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Marcador no mapa
 * Pode ser expandido para incluir mais informações vindas da API
 */
export interface MapMarker {
  id: string;
  position: Coordinates;
  title: string;
  description?: string;
  type?: 'current' | 'point-of-interest' | 'alert' | 'custom';
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Dados adicionais do mapa que podem vir da API
 */
export interface MapData {
  markers: MapMarker[];
  center: Coordinates;
  zoom?: number;
  layers?: MapLayer[];
}

/**
 * Camadas adicionais do mapa (para dados de API futuros)
 */
export interface MapLayer {
  id: string;
  name: string;
  type: 'heatmap' | 'route' | 'zone' | 'custom';
  data: unknown;
  visible: boolean;
}
