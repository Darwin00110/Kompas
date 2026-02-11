import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { MapPin, Signal, Wifi, Clock, Search, Loader2, Navigation } from 'lucide-react';
import { HolographicGlobe } from './HolographicGlobe';
import { GeolocationData, GeolocationStatus } from '../types/geolocation';
import { fetchGeolocation } from '../services/geolocationService';
import { isValidIP, getIPErrorMessage } from '../utils/ipValidator';

export function GeoPanel() {
  const [locationData, setLocationData] = useState<GeolocationData | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [ipInput, setIpInput] = useState('');
  const [ipError, setIpError] = useState<string | null>(null);

  // Carrega dados iniciais
  useEffect(() => {
    loadGeolocationData();
  }, []);

  const loadGeolocationData = async (ip?: string) => {
    try {
      setStatus('loading');
      setError(null);
      const data = await fetchGeolocation(ip);
      setLocationData(data);
      setStatus('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setStatus('error');
    }
  };

  const handleSearch = () => {
    const trimmedIp = ipInput.trim();
    
    // Valida o IP
    if (!isValidIP(trimmedIp)) {
      setIpError(getIPErrorMessage(trimmedIp));
      return;
    }
    
    // Limpa erro e faz a busca
    setIpError(null);
    loadGeolocationData(trimmedIp);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIpInput(e.target.value);
    if (ipError) setIpError(null); // Limpa erro ao digitar
  };

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

        {/* Barra de Pesquisa de IP */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-green-950/50 to-black border-2 border-green-500/30 rounded-lg p-4"
            style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Search className="text-green-400 w-5 h-5" />
              <h3 className="text-sm font-bold text-green-400 tracking-wider">IP LOOKUP</h3>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={ipInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite um endereço IP (ex: 8.8.8.8)"
                  className="w-full bg-black/50 border-2 border-green-500/30 rounded px-4 py-2 text-green-300 placeholder-green-700 font-mono text-sm focus:outline-none focus:border-green-500 transition-colors"
                  style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)' }}
                />
                {ipError && (
                  <p className="text-red-400 text-xs mt-2 font-mono">{ipError}</p>
                )}
              </div>
              <button
                onClick={handleSearch}
                disabled={status === 'loading'}
                className="bg-green-600 hover:bg-green-500 disabled:bg-green-900 disabled:cursor-not-allowed text-black font-bold px-6 py-2 rounded transition-colors font-mono"
                style={{ 
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
                  textShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
                }}
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'SEARCH'
                )}
              </button>
            </div>

            {/* IPs de exemplo */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-green-500">Exemplos:</span>
              {['24.48.0.1', '8.8.8.8', '1.1.1.1', '200.160.2.3'].map((ip) => (
                <button
                  key={ip}
                  onClick={() => {
                    setIpInput(ip);
                    setIpError(null);
                    loadGeolocationData(ip);
                  }}
                  className="text-xs text-green-400 hover:text-green-300 underline font-mono transition-colors"
                >
                  {ip}
                </button>
              ))}
            </div>
          </div>
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
                    <MapPin className="text-green-400 w-6 h-6" />
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