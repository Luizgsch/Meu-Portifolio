import './styles.css';

export const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">LUIZ.</div>
      <nav>
        <ul className="nav-links">
          <li><a href="#works">Works</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};
