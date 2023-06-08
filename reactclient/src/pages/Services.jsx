import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { TabsMenu } from "../components/Tabs";
import { SiteData } from "../SiteData";
import { PGTitle, CustomCorousal } from "./Home";
import { LocalStorageLoader, waait } from "../Helper";

// =========>  =  <=========

export function Services() {
  return (
    <div>
      <PGTitle title="Services" />
      <section className="my-2 d-flex justify-content-center  ">
        <TabsMenu tabData={SiteData.PrivateMenus.ServiceTabMenu} />
      </section>

      <Outlet />
    </div>
  );
}

// =========> Loader = Services <=========

// =========> Page = Discover <=========
export function Discover() {
  return (
    <div>
      <div className="services">
        <div className="corousal" data-aos="fade-left" data-aos-duration="1000">
          <CustomCorousal data={SiteData.ComponentData.Corousal} />
        </div>
        <section data-aos="fade-up" data-aos-duration="1000">
          <div className="row align-items-center my-5">
            <div className="col-md-4">
              <img width="400px" className="img-fluid" src="https://jep-asset.akamaized.net/jiostaticresources/v05/images/jppp-masthead-desk.png" alt="" />
            </div>
            <div className="col-md-8">
              <h1 className="font-weight-light">Service</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </section>
        <section></section>
      </div>
    </div>
  );
}

export function Prepaid() {
  return (
    <div>
      <section id="menu" className="menu">
        <div className="container">
          <div className="tab-content" data-aos="fade-right">
            <h1>Prepaid</h1>
          </div>
        </div>
      </section>
    </div>
  );
}

export function Recharge() {
  return (
    <div>
      <section id="featured-services" className="featured-services">
        <div className="container">
          <div className="row gy-4">
            <div className="col-xl-3 col-md-6 d-flex aos-init aos-animate" data-aos="zoom-out">
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-activity icon"></i>
                </div>
                <h4>
                  <a href="" className="stretched-link">
                    Lorem Ipsum
                  </a>
                </h4>
                <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 d-flex aos-init aos-animate" data-aos="zoom-out" data-aos-delay="200">
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-bounding-box-circles icon"></i>
                </div>
                <h4>
                  <a href="" className="stretched-link">
                    Sed ut perspici
                  </a>
                </h4>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 d-flex aos-init aos-animate" data-aos="zoom-out" data-aos-delay="400">
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-calendar4-week icon"></i>
                </div>
                <h4>
                  <a href="" className="stretched-link">
                    Magni Dolores
                  </a>
                </h4>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 d-flex aos-init aos-animate" data-aos="zoom-out" data-aos-delay="600">
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="bi bi-broadcast icon"></i>
                </div>
                <h4>
                  <a href="" className="stretched-link">
                    Nemo Enim
                  </a>
                </h4>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="cta">
        <div className="container aos-init aos-animate" data-aos="zoom-out">
          <div className="row g-5">
            <div className="col-lg-8 col-md-6 content d-flex flex-column justify-content-center order-last order-md-first">
              <h3>
                Alias sunt quas <em>Cupiditate</em> oluptas hic minima
              </h3>
              <p>
                {" "}
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <a className="cta-btn align-self-start" href="#">
                Call To Action
              </a>
            </div>

            <div className="col-lg-4 col-md-6 order-first order-md-last d-flex align-items-center">
              <div className="img">
                <img src="https://www.jio.com/new-banner.png" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="hero-animated" className="hero-animated d-flex align-items-center">
        <div className="container d-flex flex-column justify-content-center align-items-center text-center position-relative aos-init aos-animate" data-aos="zoom-out">
          <img width={400} src="https://bootstrapmade.com/demo/templates/HeroBiz/assets/img/hero-carousel/hero-carousel-3.svg" className="img-fluid animated" />
          <h2>
            Welcome to <span>HeroBiz</span>
          </h2>
          <p>Et voluptate esse accusantium accusamus natus reiciendis quidem voluptates similique aut.</p>
          <div className="d-flex">
            <Link to="" className="btn btn-primary scrollto mx-2">
              Get Started
            </Link>
            <Link to="" className="mx-2 glightbox btn btn-secondary d-flex align-items-center">
              <i className="bi bi-play-circle"></i>
              <span>Watch Video</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function Paybills() {
  return <div>Paybills</div>;
}
