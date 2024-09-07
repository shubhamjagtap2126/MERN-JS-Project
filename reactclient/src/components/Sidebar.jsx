import { Link } from "react-router-dom";

export const Sidebar = ({ title = false }) => {
  return (
    <>
      {title ? <h1>sidebar</h1> : <h1 hidden>sidebar</h1>}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link collapsed" to="index.html">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          <li className="nav-item">
            <Link className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" to="#">
              <i className="bi bi-menu-button-wide"></i>
              <span>Components</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <Link to="components-alerts.html">
                  <i className="bi bi-circle"></i>
                  <span>Alerts</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* <!-- End Components Nav --> */}

          <li className="nav-heading">Pages</li>

          <li className="nav-item">
            <Link className="nav-link " to="users-profile.html">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </Link>
          </li>
          {/* <!-- End Profile Page Nav --> */}

          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-faq.html">
              <i className="bi bi-question-circle"></i>
              <span>F.A.Q</span>
            </Link>
          </li>
          {/* <!-- End F.A.Q Page Nav --> */}

          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-contact.html">
              <i className="bi bi-envelope"></i>
              <span>Contact</span>
            </Link>
          </li>
          {/* <!-- End Contact Page Nav --> */}

          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-register.html">
              <i className="bi bi-card-list"></i>
              <span>Register</span>
            </Link>
          </li>
          {/* <!-- End Register Page Nav --> */}

          <li className="nav-item">
            <Link className="nav-link collapsed" to="pages-login.html">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </Link>
          </li>
          {/* <!-- End Login Page Nav --> */}
        </ul>
      </aside>
    </>
  );
};
