import { Link, Outlet } from "react-router-dom";
import { SiteData } from "../SiteData";

const MainNav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="d-inline-flex">
          <h2 className="navbar-brand">
            <Link className="navbar-brand" to="/">
              <i className="bi bi-house-door-fill"></i>
              {SiteData.title}
            </Link>
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mb-lg-0">
              {SiteData.menu.map((item, index) => (
                <div>
                  {/* <i className={`bi ${item.icon}`}></i> */}
                  <li key={index} className="nav-item dropdown mx-2">
                    <Link to={item.link}>{item.text}</Link>
                    {item.submenu && (
                      <ul
                        className="navbar-submenu nav-link d-inline-flex dropdown-toggle"
                        role="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {item.submenu.map((subitem, index) => (
                          <li
                            key={index}
                            className="navbar-subitem dropdown-menu"
                          >
                            <Link to={subitem.link} className="dropdown-item">
                              {subitem.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </div>
              ))}
            </ul>
            <div className="navbar-button aligh-items-right">
              <ul className="navbar-nav align-items-center">
                {SiteData.auth.map((item, index) => (
                  <li key={index} className={`nav-item mx-2 ${item.class}`}>
                    <Link to={item.link} onClick={item.action}>
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainNav;

{
  /* <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            App
          </NavLink>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="register">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="login">
                Login
              </NavLink>
            </li>
          </ul>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <div className="collapse navbar-collapse container" id="navbarNav">
            {/* <MenuList menus={mainMenu} /> 
      </div> 
      </div> 
      </nav> */
}
