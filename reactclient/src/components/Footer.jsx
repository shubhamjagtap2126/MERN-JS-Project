import { Link } from "react-router-dom";
import { SiteData } from "../SiteData";

export default function Footer() {
  // console.log(SiteData.footerLinks[0].text);
  return (
    <div className="footer" id="footer">
      {/* <section className="flex-row"> */}
      <div className="bg-dark py-3">
        <ul className="container navbar-nav">
          {SiteData.footerLinks.map((item, index) => (
            <li key={index} className="nav-item">
              <Link to={item.link} className="text-white font-weight-light">
                <b>{item.text}</b>
              </Link>
              {item.submenu && (
                <ul className="d-flex flex-row">
                  {item.submenu.map((subitem, index) => (
                    <li key={index} className="d-inline-flex  align-items-center mr-2">
                      <Link to={subitem.link} className="text-white font-weight-light">
                        <b>{subitem.text}</b>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* </section> */}
      {/* <hr /> */}
      {/* <section className="flex-row"> */}
      <div className="d-flex bg-dark py-3 ">
        <div className="container align-items-center">
          <span className="m-3 text-white">{`© ${new Date().getFullYear()} Company, Inc`}</span>

          <span className="d-flex justify-content-end">
            {SiteData.SocialMedia.map((i, index) => (
              <span className="m-3" key={index}>
                <Link to={i.link}>
                  {/* <p>{i.text}</p> */}
                  <i className={`h4 fas ${i.icon} text-white`}></i>
                </Link>
              </span>
            ))}
          </span>
        </div>
      </div>
      {/* </section> */}
    </div>
  );
}
