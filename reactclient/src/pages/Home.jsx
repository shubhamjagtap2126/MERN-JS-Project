import { Outlet, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { SiteData } from "../SiteData";
import { Carousel } from "react-bootstrap";
import { useEffect } from "react";

export function PGTitle(props) {
  return (
    <Helmet>
      <title>{`${props.title} | MySite`}</title>
    </Helmet>
  );
}

export function Home() {
  return (
    <>
      <PGTitle title="Home" />

      <div className="home">
        <div className="corousal" data-aos="fade-left" data-aos-duration="1000">
          <CustomCorousal data={SiteData.ComponentData.HomeCorousal} />
        </div>
      </div>
    </>
  );
}

export function About() {
  return (
    <div className="aboutpage">
      <PGTitle title="About" />
      <h1>About</h1>
      <Outlet />
    </div>
  );
}

export function FAQ() {
  return (
    <div>
      <PGTitle title="FAQ" />
      <h1 className="">FAQ</h1>

      <CustomAccordian data={SiteData.SocialMedia} />
    </div>
  );
}

// =========> Component =  Courosal <=========

export function CustomCorousal({ data }) {
  // console.log(SiteData.Corousal);

  return (
    <div>
      <Carousel variant="dark">
        {data &&
          data.map((item, index) => (
            <Carousel.Item key={index}>
              <Link to={item.link}>
                <img
                  className="d-block w-100"
                  src={item.image}
                  // src="https://www.jio.com/new-banner.png"
                  alt={`${item.text} - ${index}`}
                />
              </Link>
              <Carousel.Caption>
                <h5>{`${item.text} ${index}`}</h5>
                {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}

// =========> Component = CustomAccordian <=========
export function CustomAccordian({ data }) {
  return (
    <div className="accordion accordion-flush" id="accordion">
      {data &&
        data.map((item, index) => (
          <div className="accordion-item">
            <h2 className="accordion-header" id={`#heading${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              >
                {item.text}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#accordion"
            >
              <div className="accordion-body">{item.text}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
