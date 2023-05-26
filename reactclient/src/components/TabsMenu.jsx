import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

export function TabsMenu() {
  return (
    <>
      <div className="nav" id="myTab" role="tablist">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink to="posts/sd">Active</NavLink>
          </li>
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              to="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="#">
                Action
              </Link>
              <Link className="dropdown-item" to="#">
                Another action
              </Link>
              <Link className="dropdown-item" to="#">
                Something else here
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="#">
                Separated link
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              Link
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
