import { Button } from '../../components/Button';
import { ParticleGrid } from './ParticleGrid';
import './styles.css';

export const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container-split">
        {/* Lado Esquerdo: Conteúdo de Texto */}
        <div className="hero-text">
          <p className="hero-detail">SOFTWARE DEVELOPER & DESIGNER — BASED IN BR</p>
          <h1 className="hero-title">
            Bringing high-fidelity <br /> digital experiences <br /> to life.
          </h1>
          <div className="hero-actions">
            <Button label="View Works" onClick={() => window.location.href = '#works'} />
            <Button label="Contact Me" variant="outline" onClick={() => window.location.href = '#contact'} />
          </div>
        </div>
        
        {/* Lado Direito: Grid de Partículas Interativo (Framer Motion) */}
        <div className="hero-visual">
          <ParticleGrid />
        </div>
      </div>
    </section>
  );
};





