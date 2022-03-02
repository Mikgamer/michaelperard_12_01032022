import { ReactComponent as Logo } from './resources/logo.svg';
import { ReactComponent as Icon1 } from './resources/icon1.svg';
import { ReactComponent as Icon2 } from './resources/icon2.svg';
import { ReactComponent as Icon3 } from './resources/icon3.svg';
import { ReactComponent as Icon4 } from './resources/icon4.svg';
import './styles/Nav.css';

function NavTop() {
  return (
    <header className='nav-t'>
      <Logo className='logo'/>
      <nav>
        <div className='nav-list'>
          <a href="" className='nav-list-item'>Accueil</a>
          <a href="" className='nav-list-item'>Profil</a>
          <a href="" className='nav-list-item'>Réglage</a>
          <a href="" className='nav-list-item'>Communauté</a>
        </div>
      </nav>
    </header>
  );
}

function NavLeft() {
  return (
    <aside className='nav-l'>
      <nav>
          <div className='nav-list'>
            <a href="" className='nav-list-icon'><Icon1 /></a>
            <a href="" className='nav-list-icon'><Icon2 /></a>
            <a href="" className='nav-list-icon'><Icon3 /></a>
            <a href="" className='nav-list-icon'><Icon4 /></a>
          </div>
          <p className='copyright'>Copiryght, SportSee 2020</p>
      </nav>
    </aside>
  );
}

export { NavTop, NavLeft };