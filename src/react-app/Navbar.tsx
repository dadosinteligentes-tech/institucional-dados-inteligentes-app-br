import logo from "./assets/logo-marca-dadosinteligentes.svg";

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

function Navbar({ onNavigate }: NavbarProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    const element = document.getElementById(sectionId);
    if (element) {
      // Se o elemento existe, rola até ele
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (onNavigate) {
        onNavigate(sectionId);
      }
    } else {
      // Se o elemento não existe (estamos no formulário), volta para a home
      if (onNavigate) {
        onNavigate(sectionId);
      }
    }
  };

  const navItems = [
    { id: 'hero', label: 'Início' },
    { id: 'transformation', label: 'Transformação' },
    { id: 'services', label: 'Serviços' },
    { id: 'products', label: 'Produtos' },
    { id: 'journey', label: 'Jornada' },
    { id: 'case-study', label: 'Case' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="#hero" className="navbar-logo" onClick={(e) => handleNavClick(e, 'hero')}>
          <img src={logo} alt="Dados Inteligentes" />
        </a>

        <nav className="navbar-nav">
          <ul className="navbar-menu">
            {navItems.map((item) => (
              <li key={item.id} className="navbar-item">
                <a
                  href={`#${item.id}`}
                  className="navbar-link"
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="navbar-item">
              <a
                href="#cta"
                className="navbar-link navbar-link-diagnostic"
                onClick={(e) => handleNavClick(e, 'cta')}
              >
                Diagnóstico
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
