import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import './styles/global.css';

function App() {
  return (
    <div className="app-root">
      <Header />
      <Hero />
      
      {/* Seção de Projetos Placeholder */}
      <section id="works" style={{ height: '100vh', padding: '100px 8%', backgroundColor: '#0D0D0D' }}>
        <h2 style={{ fontSize: '3rem', color: '#fff' }}>Selected Works</h2>
        <p style={{ color: '#808080', marginTop: '20px' }}>Coming soon...</p>
      </section>

      {/* Seção de Contato Placeholder */}
      <section id="contact" style={{ height: '50vh', padding: '100px 8%', backgroundColor: '#0D0D0D' }}>
        <h2 style={{ fontSize: '3rem', color: '#fff' }}>Get in touch</h2>
        <p style={{ color: '#808080', marginTop: '20px' }}>hello@luiz.dev</p>
      </section>
    </div>
  );
}

export default App;
