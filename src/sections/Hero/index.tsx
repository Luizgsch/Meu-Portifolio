import { useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import { Button } from '../../components/common/Button';
import { ParticleGrid } from './components/ParticleGrid';
import './styles.css';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Valores do mouse relativos ao centro do grid (para alinhamento preciso)
  const mouseX = useMotionValue(-5000);
  const mouseY = useMotionValue(-5000);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!visualRef.current) return;

    // Pegamos o retângulo do container do visual (lado direito)
    const rect = visualRef.current.getBoundingClientRect();

    // O centro do grid é o centro desse retângulo
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // O valor do mouse agora é a distância do ponteiro até o centro exato do grid
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(-5000);
    mouseY.set(-5000);
  };

  return (
    <section
      ref={heroRef}
      className="hero-section"
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-container-split">
        {/* Lado Esquerdo: Conteúdo de Texto */}
        <div className="hero-text">
          <p className="hero-detail">DESENVOLVEDOR FULLSTACK — JAVA</p>
          <h1 className="hero-title">
            Trazendo performace <br /> e qualidade <br /> para o seu software.
          </h1>
          <div className="hero-actions">
            <Button 
              label="Ver Projetos" 
              onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })} 
            />
            <Button 
              label="Fale Comigo" 
              variant="outline" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
            />
          </div>
        </div>

        {/* Lado Direito: Grid de Partículas Interativo (Framer Motion) */}
        <div className="hero-visual" ref={visualRef}>
          <ParticleGrid sectionMouseX={mouseX} sectionMouseY={mouseY} />
        </div>
      </div>
    </section>
  );
};





