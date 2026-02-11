import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { MapPin, Globe, Signal, Wifi, Building2, MapPinned, Clock } from 'lucide-react';
import { HolographicGlobe } from './HolographicGlobe';
import { GeolocationData, GeolocationStatus } from '../types/geolocation';
import { fetchGeolocation } from '../services/geolocationService';

export function GeoPanel() {
  const [locationData, setLocationData] = useState<GeolocationData | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGeolocationData = async () => {
      try {
        setStatus('loading');
        const data = await fetchGeolocation();
        setLocationData(data);
        setStatus('success');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setStatus('error');
      }
    };

    loadGeolocationData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen bg-black flex items-center justify-center p-4"
    >
      <div className="w-full max-w-7xl">
        {/* Cabeçalho */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-green-400 mb-2" style={{ 
            textShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
            letterSpacing: '0.15em'
          }}>
            KOMPAS
          </h1>
          <p className="text-green-500 font-mono text-sm tracking-widest">
            {status === 'success' ? 'GEOLOCATION SYSTEM ONLINE' : 
             status === 'loading' ? 'INITIALIZING SYSTEMS...' : 
             'SYSTEM ERROR'}
          </p>
        </motion.div>

        {/* Painel Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Globo 3D */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-lg overflow-hidden border-2 border-green-500/30"
            style={{
              background: 'radial-gradient(circle at center, rgba(4, 120, 87, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)',
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.2), inset 0 0 40px rgba(34, 197, 94, 0.1)',
            }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
            
            {/* Cantos holográficos */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
              <div
                key={corner}
                className={`absolute w-8 h-8 ${corner.includes('top') ? 'top-4' : 'bottom-4'} ${corner.includes('left') ? 'left-4' : 'right-4'}`}
                style={{
                  borderTop: corner.includes('top') ? '2px solid #22c55e' : 'none',
                  borderBottom: corner.includes('bottom') ? '2px solid #22c55e' : 'none',
                  borderLeft: corner.includes('left') ? '2px solid #22c55e' : 'none',
                  borderRight: corner.includes('right') ? '2px solid #22c55e' : 'none',
                  boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
                }}
              />
            ))}

            {locationData && (
              <HolographicGlobe
                latitude={locationData.lat}
                longitude={locationData.lon}
              />
            )}
          </motion.div>

          {/* Painel de Dados */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            {/* Status */}
            <div className="bg-gradient-to-br from-green-950/50 to-black border-2 border-green-500/30 rounded-lg p-6"
              style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Signal className="text-green-400 w-6 h-6" />
                <h2 className="text-xl font-bold text-green-400">SYSTEM STATUS</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full"
                  style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)' }}
                />
                <span className="text-green-300 font-mono text-sm">
                  {status === 'loading' && 'ACQUIRING DATA...'}
                  {status === 'success' && locationData && `SIGNAL ACQUIRED - ${locationData.status.toUpperCase()}`}
                  {status === 'error' && `ERROR: ${error}`}
                </span>
              </div>
            </div>

            {locationData && status === 'success' && (
              <>
                {/* Localização */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-br from-green-950/50 to-black border-2 border-green-500/30 rounded-lg p-6"
                  style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="text-green-400 w-6 h-6" />
                    <h2 className="text-xl font-bold text-green-400">LOCATION</h2>
                  </div>
                  
                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-500">City:</span>
                      <span className="text-green-300">{locationData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-500">Region:</span>
                      <span className="text-green-300">{locationData.regionName} ({locationData.region})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-500">Country:</span>
                      <span className="text-green-300">{locationData.country} ({locationData.countryCode})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-500">ZIP Code:</span>
                      <span className="text-green-300">{locationData.zip}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Coordenadas */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-br from-green-950/50 to-black border-2 border-green-500/30 rounded-lg p-6"
                  style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPinned className="text-green-400 w-6 h-6" />
                    <h2 className="text-xl font-bold text-green-400">COORDINATES</h2>
                  </div>
                  
                  <div className="space-y-3 font-mono">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-green-500 mb-1">LATITUDE</div>
                        <div className="text-2xl text-green-300">{locationData.lat.toFixed(4)}°</div>
                      </div>
                      <div>
                        <div className="text-xs text-green-500 mb-1">LONGITUDE</div>
                        <div className="text-2xl text-green-300">{locationData.lon.toFixed(4)}°</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Rede e ISP */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-gradient-to-br from-green-950/50 to-black border-2 border-green-500/30 rounded-lg p-6"
                  style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Wifi className="text-green-400 w-6 h-6" />
                    <h2 className="text-xl font-bold text-green-400">NETWORK INFO</h2>
                  </div>
                  
                  <div className="space-y-2 font-mono text-sm">
                    <div>
                      <div className="text-xs text-green-500 mb-1">IP ADDRESS</div>
                      <div className="text-green-300">{locationData.query}</div>
                    </div>
                    <div>
                      <div className="text-xs text-green-500 mb-1">ISP</div>
                      <div className="text-green-300">{locationData.isp}</div>
                    </div>
                    <div>
                      <div className="text-xs text-green-500 mb-1">ORGANIZATION</div>
                      <div className="text-green-300">{locationData.org}</div>
                    </div>
                    <div>
                      <div className="text-xs text-green-500 mb-1">AS</div>
                      <div className="text-green-300">{locationData.as}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Timezone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-gradient-to-br from-green-950/50 to-black border-2 border-green-500/30 rounded-lg p-6"
                  style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-green-400 w-6 h-6" />
                    <h2 className="text-xl font-bold text-green-400">TIME ZONE</h2>
                  </div>
                  
                  <div className="font-mono">
                    <div className="text-xs text-green-500 mb-1">TIMEZONE</div>
                    <div className="text-lg text-green-300">{locationData.timezone}</div>
                    <div className="text-xs text-green-500 mt-3 mb-1">LOCAL TIME</div>
                    <div className="text-lg text-green-300">
                      {new Date().toLocaleString('en-US', { 
                        timeZone: locationData.timezone,
                        dateStyle: 'medium',
                        timeStyle: 'medium'
                      })}
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {/* Linha de scan */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
              animate={{
                opacity: [0.2, 1, 0.2],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)' }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}