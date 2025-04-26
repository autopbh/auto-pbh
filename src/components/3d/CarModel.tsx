
import { useState, useEffect, useRef } from "react";

interface CarModelProps {
  modelUrl?: string;
  fallbackImage: string;
  className?: string;
}

const CarModel = ({ modelUrl, fallbackImage, className = "w-full h-full" }: CarModelProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const rotationRef = useRef(0);

  // Simulate 3D model loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isLoaded) return;
    setIsRotating(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isRotating) return;
    const deltaX = e.clientX - startXRef.current;
    rotationRef.current += deltaX * 0.5;
    startXRef.current = e.clientX;

    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
  };

  const handleMouseUp = () => {
    setIsRotating(false);
  };

  return (
    <div
      className={`relative ${className} overflow-hidden`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {!isLoaded ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-autop-red border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm text-muted-foreground">Chargement du modèle 3D...</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="w-full h-full transition-transform duration-300"
            style={{ perspective: "1000px" }}
          >
            <div className="relative w-full h-full">
              <img
                src={fallbackImage}
                alt="Car model"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                Cliquez et faites glisser pour tourner
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarModel;
