import { Link } from "react-router-dom";
import { SiteData } from "../features/SiteData";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import { useAuthContext } from "../Hooks";
import { axiosInstance } from "../features/AppSlices";
export const NavMenus = ({ data, Brand = false }) => {
  // const { user } = useAuthContext();
  const users = useSelector(usersState).users;
  return (
    <nav className="navbar navbar-expand-md navbar-dark sticky-top" style={{ backgroundColor: "#7532FA" }}>
      <div className="d-flex align-items-center justify-content-between">
        {Brand ? (
          <>
            <p className="navbar-brand">
              <Link className="navbar-brand" to="/">
                <i className="bi bi-house-door-fill"></i>
                {SiteData.title}
              </Link>
            </p>
          </>
        ) : (
          ""
        )}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            {data.map((item, index) => (
              <li key={index} className={`nav-item ${item.submenu ? "dropdown" : ""}`}>
                <Link
                  className={`nav-link ${item.submenu ? "dropdown-toggle" : ""} ${item.class ? item.class : ""} `}
                  role={`${item.submenu ? "button" : ""}`}
                  data-bs-toggle={`${item.submenu ? "dropdown" : ""}`}
                  to={item.link}
                  // onClick={item.action ? item.action : ""}
                >
                  {/* <i className={`bi ${item.icon}`}></i> */}
                  {item.text}
                </Link>
                {item.submenu && (
                  <ul className="dropdown-menu">
                    {item.submenu.map((subitem, j) => (
                      <li key={j}>
                        <Link
                          to={subitem.link}
                          className="dropdown-item"
                          // onClick={subitem.action ? subitem.action : ""}
                        >
                          {subitem.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {users ? (
            <div className="d-flex ms-auto">
              <button onClick={() => LogoutAction()} className="btn btn-info btn-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex ms-auto">
              <Link to="/auth" className="btn bg-white mx-3">
                <span>Join Now</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

import { Container, Navbar, Nav, NavDropdown, Offcanvas } from "react-bootstrap/";

export const MakeNavItems = ({ data }) => {
  // const { user } = useAuthContext();
  const users = useSelector(usersState).users;
  const expand = "md";
  return (
    <div>
      <Navbar collapseOnSelect expand={expand} bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className="navbar-brand" to="/">
              <i className="bi bi-house-door-fill"></i>
              SJSite
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {/* Nav Collapse */}
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <Link className="navbar-brand" to="/">
                  <i className="bi bi-house-door-fill"></i>
                  SJSite
                </Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {/* 1st side */}
              {data.map((item, index) => (
                <Nav className="me-auto">
                  {item.submenu ? (
                    <NavDropdown key={index} title={item.text} id="collasible-nav-dropdown">
                      {item.submenu.map((item, index) => (
                        <NavDropdown.Item key={index}>
                          <Link className="nav-link text-dark" to={item.link}>
                            {item.text}
                          </Link>
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link " key={index} to={item.link}>
                      {item.text}
                    </Link>
                  )}
                </Nav>
              ))}

              {/* 2nd side */}
              {users ? (
                <div className="d-flex ms-auto">
                  <UserProfile user={users} />
                </div>
              ) : (
                <Nav>
                  <Link className="btn btn-light" to="/signup">
                    SignUp
                  </Link>
                </Nav>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, usersState } from "../pages/AuthPage";
export const UserProfile = ({ user }) => {
  const users = useSelector(usersState).users;
  // console.log(users);
  const dispatch = useDispatch();

  return (
    <div>
      {/* <h1>UserProfile</h1> */}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" drop="start">
          <img />
          {users.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item className="justify-content-center">
            <h4>{users.name}</h4>
            <p>{users.name}</p>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Another action</Dropdown.Item>
          <Dropdown.Divider />

          <button onClick={() => dispatch(logout())} className="btn btn-primary mx-3">
            Logout
          </button>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

{
  /*  */
}
