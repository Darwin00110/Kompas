import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { TechEye } from './components/TechEye';
import { GeoPanel } from './components/GeoPanel';

export default function App() {
  const [showPanel, setShowPanel] = useState(false);

  const handleEyeComplete = () => {
    setShowPanel(true);
  };

  return (
    <div className="size-full">
      <AnimatePresence mode="wait">
        {!showPanel ? (
          <TechEye key="eye" onAnimationComplete={handleEyeComplete} />
        ) : (
          <GeoPanel key="panel" />
        )}
      </AnimatePresence>
    </div>
  );
}
