import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer";
// import MenuList from "../components/MenuList";

const MainNav = () => {
  // const [mainMenu, setmainMenu] = useState([
  //   { path: "/", title: "Home" },
  //   { path: "/register", title: "register" },
  //   { path: "/login", title: "login" },
  //   { path: "/posts", title: "posts" },
  // ]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <div className="container">
          <NavLink exact className="navbar-brand" to="/" exact>
            App
          </NavLink>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="register" exact>
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="login" exact>
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
            {/* <MenuList menus={mainMenu} /> */}
          {/* </div> */}
        </div>
      </nav>

      <Outlet />

      <Footer />
    </>
  );
};

export default MainNav;
