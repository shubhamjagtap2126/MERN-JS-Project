import { NavLink, Outlet, useLocation } from "react-router-dom";

const TabsMenu = () => {
  const location = useLocation();
  // console.log(location);
  return (
    <>
      <div classNameName="nav" id="myTab" role="tablist">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" to="posts/sd">
              Active
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Separated link
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default TabsMenu;
