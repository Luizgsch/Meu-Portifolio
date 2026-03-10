import { useRef, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import './styles.css';

// Configurações do grid para um visual mais "espalhado" e orgânico
const GRID_SIZE_X = 22; 
const GRID_SIZE_Y = 12;
const DOT_SPACING = 35; // Aumentado para espalhar mais as bolinhas

export const ParticleGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Valores do mouse relativos ao centro
  const mouseX = useMotionValue(-5000); 
  const mouseY = useMotionValue(-5000);
  const time = useMotionValue(0);

  // Animação contínua para o efeito de "respiração"
  useAnimationFrame((t) => {
    time.set(t / 1000);
  });

  // Configuração de mola mais reativa e precisa (menos delay)
  const springConfig = { damping: 40, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    mouseX.set(e.clientX - rect.left - centerX);
    mouseY.set(e.clientY - rect.top - centerY);
  };

  const handleMouseLeave = () => {
    // Em vez de pular, movemos o "destino" para longe suavemente
    mouseX.set(-3000);
    mouseY.set(-3000);
  };

  // Gerar partículas com "jitter" (desvio aleatório) para não parecer um grid quadrado
  const particles = useMemo(() => {
    const list = [];
    const totalWidth = (GRID_SIZE_X - 1) * DOT_SPACING;
    const totalHeight = (GRID_SIZE_Y - 1) * DOT_SPACING;
    
    for (let i = 0; i < GRID_SIZE_X; i++) {
      for (let j = 0; j < GRID_SIZE_Y; j++) {
        // Adiciona um pequeno desvio aleatório para quebrar a rigidez do grid
        const jitterX = (Math.random() - 0.5) * 15;
        const jitterY = (Math.random() - 0.5) * 15;
        
        list.push({ 
          id: `${i}-${j}`, 
          x: i * DOT_SPACING - totalWidth / 2 + jitterX, 
          y: j * DOT_SPACING - totalHeight / 2 + jitterY,
          baseScale: 0.6 + Math.random() * 0.4, // Escala inicial variada
          baseOpacity: 0.1 + Math.random() * 0.2 // Opacidade inicial variada
        });
      }
    }
    return list;
  }, []);

  return (
    <div 
      ref={containerRef}
      className="particle-grid-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="particle-grid-wrapper">
        {particles.map((p) => (
          <Particle 
            key={p.id} 
            x={p.x} 
            y={p.y} 
            baseScale={p.baseScale}
            baseOpacity={p.baseOpacity}
            mouseX={smoothMouseX} 
            mouseY={smoothMouseY}
            time={time}
          />
        ))}
      </div>
    </div>
  );
};

interface ParticleProps {
  x: number;
  y: number;
  baseScale: number;
  baseOpacity: number;
  mouseX: any;
  mouseY: any;
  time: any;
}

const Particle = ({ x, y, baseScale, baseOpacity, mouseX, mouseY, time }: ParticleProps) => {
  const distance = useTransform([mouseX, mouseY], ([latestX, latestY]: any[]) => {
    const dx = latestX - x;
    const dy = latestY - y;
    return Math.sqrt(dx * dx + dy * dy);
  });

  // Onda interativa mais profunda e suave
  const mouseWaveY = useTransform(distance, [0, 150, 300], [-50, -10, 0]);
  
  // Onda orgânica (respiração)
  const organicWaveY = useTransform(time, (t: number) => {
    return Math.sin(t + (x + y) * 0.015) * 10;
  });

  const translateY = useTransform([mouseWaveY, organicWaveY], ([mw, ow]: any[]) => mw + ow);
  
  // Escala e opacidade reagem à distância de forma mais orgânica
  const scale = useTransform(distance, [0, 150, 300], [baseScale * 2.5, baseScale, baseScale * 0.8]);
  const opacity = useTransform(distance, [0, 150, 300], [0.8, baseOpacity * 1.5, baseOpacity]);

  return (
    <motion.div
      className="grid-dot"
      style={{
        x,
        y,
        translateY,
        scale,
        opacity,
      }}
    />
  );
};



