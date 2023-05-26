import React from "react";
import { Link } from "react-router-dom";
import { SiteData } from "../SiteData";

export default function Footer() {
  // console.log(SiteData.footerLinks[1]);
  return (
    <div className="footer">
      <section className="flex-row">
        <nav className="align-center bg-dark py-3 mt-auto">
          <ul className="container navbar-nav">
            {SiteData.footerLinks.map((item, index) => (
              <li key={index} className="nav-item">
                <Link to={item.link} className="text-white font-weight-light">
                  <b>{item.text}</b>
                </Link>
                {item.submenu && (
                  <ul>
                    {item.submenu.map((subitem, index) => (
                      <li key={index}>
                        <Link
                          to={subitem.link}
                          className="text-white font-weight-light"
                        >
                          <b>{subitem.text}</b>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </section>
      {/* <hr /> */}
      <section className="flex-row">
        <div className="align-center bg-dark py-3 mt-3 fixed-bottom">
          <span className="m-3 text-white">{`© ${new Date().getFullYear()} Company, Inc`}</span>
          {/* <i class="bi bi-youtube text-white">Yotube</i> */}

          <ul className="justify-content-end">
            {SiteData.SocialMedia.map((i, index) => {
              <li className="m-3" key={index}>
                <Link to={i.link}>
                  <i className={`fas ${i.class} text-white`}>{i.text}</i>
                </Link>
              </li>;
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
