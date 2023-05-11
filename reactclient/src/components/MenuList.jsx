import { NavLink, useLocation } from "react-router-dom";

const MenuList = (props) => {
  const menus = props.menus;
  const location = useLocation();
  // console.log(props, props.menus);
  // console.log(location);
  return (
    // <div className="nav">
    <ul className="navbar-nav">
      {menus.map((menu) => {
        <li className="nav-item" key={menu.title}>
          <NavLink className="nav-link" to={menu.path}>
            {menu.title}
          </NavLink>
        </li>;
      })}
    </ul>
    // </div>
  );
};

export default MenuList;
