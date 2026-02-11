import { useRef, useEffect } from 'react';

interface GlobeProps {
  latitude: number;
  longitude: number;
}

export function HolographicGlobe({ latitude, longitude }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    let rotation = 0;
    let markerPulse = 0;

    // Converter lat/long para posição 2D na projeção
    const latLongTo2D = (lat: number, long: number, rot: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (long + rot) * (Math.PI / 180);
      
      const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
      const y = centerY - radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      return { x, y, z, visible: z > -radius * 0.3 };
    };

    const drawGlobe = () => {
      ctx.clearRect(0, 0, width, height);

      // Fundo com gradiente
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5);
      gradient.addColorStop(0, 'rgba(4, 120, 87, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Círculo base do globo
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 78, 59, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Grid de latitude (horizontais)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
      ctx.lineWidth = 1;
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let firstPoint = true;
        for (let long = -180; long <= 180; long += 5) {
          const point = latLongTo2D(lat, long, rotation);
          if (point.visible) {
            if (firstPoint) {
              ctx.moveTo(point.x, point.y);
              firstPoint = false;
            } else {
              ctx.lineTo(point.x, point.y);
            }
          } else {
            firstPoint = true;
          }
        }
        ctx.stroke();
      }

      // Grid de longitude (verticais)
      for (let long = -180; long <= 180; long += 20) {
        ctx.beginPath();
        let firstPoint = true;
        for (let lat = -90; lat <= 90; lat += 5) {
          const point = latLongTo2D(lat, long, rotation);
          if (point.visible) {
            if (firstPoint) {
              ctx.moveTo(point.x, point.y);
              firstPoint = false;
            } else {
              ctx.lineTo(point.x, point.y);
            }
          } else {
            firstPoint = true;
          }
        }
        ctx.stroke();
      }

      // Marcador de localização
      const marker = latLongTo2D(latitude, longitude, rotation);
      if (marker.visible) {
        const pulseSize = 8 + Math.sin(markerPulse) * 3;
        
        // Anel externo pulsante
        ctx.beginPath();
        ctx.arc(marker.x, marker.y, pulseSize * 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74, 222, 128, ${0.3 + Math.sin(markerPulse) * 0.2})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Ponto central
        ctx.beginPath();
        ctx.arc(marker.x, marker.y, pulseSize, 0, Math.PI * 2);
        const markerGradient = ctx.createRadialGradient(marker.x, marker.y, 0, marker.x, marker.y, pulseSize);
        markerGradient.addColorStop(0, '#4ade80');
        markerGradient.addColorStop(1, '#22c55e');
        ctx.fillStyle = markerGradient;
        ctx.fill();

        // Glow
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Círculo externo com glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      rotation += 0.2;
      markerPulse += 0.1;
    };

    const animate = () => {
      drawGlobe();
      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [latitude, longitude]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={800}
      className="w-full h-full"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
}