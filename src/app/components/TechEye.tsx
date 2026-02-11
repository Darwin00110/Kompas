import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface TechEyeProps {
  onAnimationComplete: () => void;
}

export function TechEye({ onAnimationComplete }: TechEyeProps) {
  const [eyePosition, setEyePosition] = useState<'center' | 'left' | 'right'>('center');
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      // Aguarda 500ms
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Olha para a esquerda
      setEyePosition('left');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Retorna ao centro
      setEyePosition('center');
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Olha para a direita
      setEyePosition('right');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Retorna ao centro
      setEyePosition('center');
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Marca como completo
      setScanComplete(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Chama callback
      onAnimationComplete();
    };

    sequence();
  }, [onAnimationComplete]);

  const pupilX = eyePosition === 'left' ? -15 : eyePosition === 'right' ? 15 : 0;

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Logo/Título */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h1 className="text-6xl font-bold text-green-400" style={{ 
          textShadow: '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
          letterSpacing: '0.1em'
        }}>
          KOMPAS
        </h1>
      </motion.div>

      {/* Olho Tecnológico */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        className="relative"
      >
        <svg width="300" height="200" viewBox="0 0 300 200" className="drop-shadow-2xl">
          {/* Glow externo */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="eyeGradient">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </radialGradient>
          </defs>

          {/* Contorno externo do olho */}
          <motion.ellipse
            cx="150"
            cy="100"
            rx="140"
            ry="90"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Linhas de scan horizontais */}
          {[40, 60, 80, 100, 120, 140, 160].map((y, i) => (
            <motion.line
              key={i}
              x1="20"
              y1={y}
              x2="280"
              y2={y}
              stroke="#10b981"
              strokeWidth="1"
              opacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ 
                duration: 2, 
                delay: 0.6 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}

          {/* Esclera (branco do olho) */}
          <ellipse
            cx="150"
            cy="100"
            rx="130"
            ry="80"
            fill="#0a0a0a"
            stroke="#22c55e"
            strokeWidth="2"
          />

          {/* Íris */}
          <motion.g
            animate={{ x: pupilX }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <circle
              cx="150"
              cy="100"
              r="50"
              fill="url(#eyeGradient)"
              filter="url(#glow)"
            />
            
            {/* Padrão tecnológico na íris */}
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="150"
                y1="100"
                x2={150 + Math.cos((i * Math.PI * 2) / 8) * 50}
                y2={100 + Math.sin((i * Math.PI * 2) / 8) * 50}
                stroke="#065f46"
                strokeWidth="1"
                opacity="0.5"
              />
            ))}

            {/* Pupila */}
            <circle
              cx="150"
              cy="100"
              r="20"
              fill="#000000"
            />

            {/* Reflexo de luz */}
            <circle
              cx="160"
              cy="90"
              r="8"
              fill="#86efac"
              opacity="0.8"
            />
          </motion.g>

          {/* Grid de scan */}
          <motion.circle
            cx="150"
            cy="100"
            r="60"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.3"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </motion.div>

      {/* Status de scan */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <div className="flex items-center gap-2 text-green-400">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-green-400 rounded-full"
            style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)' }}
          />
          <span className="font-mono text-sm tracking-wider">
            {scanComplete ? 'SCAN COMPLETE' : 'SCANNING ENVIRONMENT...'}
          </span>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-64 h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-400"
            initial={{ width: '0%' }}
            animate={{ width: scanComplete ? '100%' : '70%' }}
            transition={{ duration: 2 }}
            style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
