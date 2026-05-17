import MenuNav from "../components/Menu";
import { Outlet, Link, NavLink } from "react-router-dom";
import Login from "../components/Login-Register";
import "../CSS/AppMenu.css";

function AppMenu() {
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Saltar al contingut principal
      </a>
      <header>
        <nav className="site-nav" aria-label="Navegació principal">
          <Link to="/" className="site-nav__brand">
            <span className="site-nav__brand-icon" aria-hidden="true">♻</span>
            EcoShare
          </Link>
          <div className="site-nav__links">
            <NavLink to="/" className="site-nav__link" end>
              Inici
            </NavLink>
            <MenuNav />
          </div>
          <div className="site-nav__actions">
            <Login />
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default AppMenu;
