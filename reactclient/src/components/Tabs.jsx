import { NavLink, Outlet } from "react-router-dom";
import { useWindowDimensions } from "../Hooks";
import { PGTitle } from "../pages/Home";

export function TabsMenu({ tabData }) {
  return (
    <>
      <ul
        className="d-flex nav nav-tabs justify-content-center"
        id="myTab"
        role="tablist"
      >
        {tabData.map((item, index) => (
          <li key={index} className="nav-item" role="presentation">
            <NavLink className="nav-link" to={item.link}>
              <i className={`bi ${item.icon}`}></i> {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
