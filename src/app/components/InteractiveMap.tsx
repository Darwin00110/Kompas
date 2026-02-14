import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, Navigation2, Layers, RefreshCw } from 'lucide-react';
import { MapData, Coordinates } from '../types/mapData';
import { fetchMapData } from '../services/mapService';
import { DataUser, type Data } from './GeoPanel'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para os ícones padrão do Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Componente para centralizar o mapa
function MapCenterController({ center }: { center: Coordinates }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom());
  }, [center, map]);
  
  return null;
}

interface InteractiveMapProps {
  isOpen: boolean;
  onClose: () => void;
  latitude: number;
  longitude: number;
  locationName?: string;
}

export function InteractiveMap({ 
  isOpen, 
  onClose, 
  latitude, 
  longitude,
  locationName = 'Localização'
}: InteractiveMapProps) {
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const coordinates: Coordinates = { lat: latitude, lng: longitude };

  // Carrega dados do mapa
  useEffect(() => {
    if (isOpen) {
      loadMapData();
    }
  }, [isOpen, latitude, longitude]);

  const loadMapData = async () => {
    try {
      setLoading(true);
      setError(null);
      coordinates.lat = Number(DataUser.latitude) || latitude;
      coordinates.lng = Number(DataUser.longitude) || longitude;
      const data = await fetchMapData(coordinates);
      setMapData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar mapa';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadMapData();
  };

  // Ícone customizado para localização atual
  const currentLocationIcon = new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative;">
        <div style="
          width: 20px;
          height: 20px;
          background: #22c55e;
          border: 3px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
          animation: pulse 2s infinite;
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 300
            }}
            className="relative w-full max-w-6xl h-[80vh] bg-gradient-to-br from-green-950/90 to-black border-2 border-green-500/50 rounded-lg overflow-hidden"
            style={{ boxShadow: '0 0 50px rgba(34, 197, 94, 0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/90 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Navigation2 className="text-green-400 w-6 h-6" />
                  <div>
                    <h2 className="text-xl font-bold text-green-400 tracking-wider">
                      MAPA INTERATIVO
                    </h2>
                    <p className="text-green-500 text-sm font-mono">
                      {locationName} - {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="p-2 bg-green-600/20 hover:bg-green-600/40 border border-green-500/30 rounded transition-colors"
                    style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.2)' }}
                  >
                    <RefreshCw className={`w-5 h-5 text-green-400 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="p-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cantos holográficos */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
              <div
                key={corner}
                className={`absolute w-12 h-12 ${corner.includes('top') ? 'top-4' : 'bottom-4'} ${corner.includes('left') ? 'left-4' : 'right-4'} pointer-events-none z-20`}
                style={{
                  borderTop: corner.includes('top') ? '2px solid #22c55e' : 'none',
                  borderBottom: corner.includes('bottom') ? '2px solid #22c55e' : 'none',
                  borderLeft: corner.includes('left') ? '2px solid #22c55e' : 'none',
                  borderRight: corner.includes('right') ? '2px solid #22c55e' : 'none',
                  boxShadow: '0 0 15px rgba(34, 197, 94, 0.5)',
                }}
              />
            ))}

            {/* Mapa */}
            <div className="w-full h-full">
              {loading && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-center">
                    <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" />
                    <p className="text-green-400 font-mono">CARREGANDO DADOS DO MAPA...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-red-400 font-mono mb-4">ERRO: {error}</p>
                    <button
                      onClick={handleRefresh}
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded transition-colors"
                    >
                      TENTAR NOVAMENTE
                    </button>
                  </div>
                </div>
              )}

              {!loading && !error && (
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={mapData?.zoom || 13}
                  className="w-full h-full"
                  style={{ filter: 'hue-rotate(-10deg) saturate(1.1)' }}
                  ref={mapRef}
                >
                  {/* Camada de tiles - OpenStreetMap */}
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Controlador de centro */}
                  <MapCenterController center={coordinates} />

                  {/* Marcadores */}
                  {mapData?.markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      position={[marker.position.lat, marker.position.lng]}
                      icon={marker.type === 'current' ? currentLocationIcon : new L.Icon.Default()}
                    >
                      <Popup>
                        <div className="font-mono">
                          <h3 className="font-bold text-green-700 mb-1">{marker.title}</h3>
                          {marker.description && (
                            <p className="text-sm text-gray-600 mb-2">{marker.description}</p>
                          )}
                          <div className="text-xs text-gray-500">
                            <div>Lat: {marker.position.lat.toFixed(6)}</div>
                            <div>Lng: {marker.position.lng.toFixed(6)}</div>
                            {marker.timestamp && (
                              <div className="mt-1">
                                {new Date(marker.timestamp).toLocaleString('pt-BR')}
                              </div>
                            )}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>

            {/* Legenda */}
            <div className="absolute bottom-4 left-4 z-10 bg-black/80 border border-green-500/30 rounded p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="text-green-400 w-4 h-4" />
                <span className="text-green-400 font-bold text-sm tracking-wider">LEGENDA</span>
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" 
                    style={{ boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)' }} 
                  />
                  <span className="text-green-300">Localização Atual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-green-300">Pontos de Interesse</span>
                </div>
              </div>
            </div>

            {/* Info: Preparado para API */}
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Adiciona keyframes para a animação de pulso
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.3);
      opacity: 0.7;
    }
  }
`;
document.head.appendChild(style);
