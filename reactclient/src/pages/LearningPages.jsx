import { useEffect, useRef, useState } from "react";
import { SiteData } from "../SiteData";
import { TabsMenu } from "../components/Tabs";
import { Outlet, Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

export const LearningPages = () => {
  return (
    <div>
      <PGTitle title={"Learning"} />
      <section className="container my-2 ">
        <TabsMenu tabData={SiteData.PrivateMenus.LearningTabMenu} />
      </section>

      <Outlet />
    </div>
  );
};

export function LearningHome() {
  return (
    <div>
      <h1>Home</h1>
      <HScrollTab data={SiteData.SocialMedia} title={false} />
      <div className="container">
        <YTCardThumb />

        <HScrollCard />
        <Marquee pauseOnHover="true">
          <HScrollCard />
        </Marquee>
      </div>
    </div>
  );
}

export function Channel() {
  return (
    <div>
      <h1>Channel</h1>
    </div>
  );
}

export function Trending() {
  const unique = [...new Set(SiteData.ComponentData.YTVids.map((item) => item.Category))].map((o) => ({ text: o }));

  // console.log(unique);

  return (
    <div>
      {/* <h1>Trending</h1> */}
      <div className="container">
        <HScrollCard data={SiteData.ComponentData.YTVids} title={false} />
        <HScrollTab data={unique} title={false} />
        <YTCardThumb data={SiteData.ComponentData.YTVids} />
      </div>
    </div>
  );
}

export function Gaming() {
  return (
    <div>
      <h1>Gaming</h1>
    </div>
  );
}

export function Music() {
  return (
    <div>
      <h1>Music</h1>
    </div>
  );
}

// =========> Card =  <=========    {Array.from({ length: 10 }).map((_, idx) => (
import { Card } from "react-bootstrap";
import { PGTitle } from "./Home";
export function YTCardThumb({ data }) {
  // console.log(data);

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
      {data ? (
        data.map((item, index) => (
          <Link to={item.VideoLink} className="nav-item">
            <Card style={{ width: "15rem", width: "100%" }} className="d-block" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration={`${index * 500}`}>
              {item.Thumb ? <img style={{ width: "100%" }} src={item.Thumb} /> : <SVGHolder w={"100%"} />}
              <Card.Body>
                <div className="d-flex">
                  <div className="h1">
                    <i className="bi bi-person-circle"></i>
                  </div>

                  <div className="d-block ms-3">
                    <p className="mb-0">
                      <strong>{item.Title.substring(0, 25)}</strong>
                    </p>
                    <small>{item.User}</small>
                    <Card.Text>
                      <p className="card-text mb-0">Lorem ipsum dolor sit amet consectetur</p>
                      <small>
                        <span>Views .</span>
                        <span> DateUploaded</span>
                      </small>
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Link>
        ))
      ) : (
        <Card
          style={{ width: "20rem" }}
          className="d-block"
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          // data-aos-duration={`${2 * 500}`}
        >
          <SVGHolder w={"20rem"} />
          <Card.Body>
            <div className="d-flex">
              <div className="h1">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="d-block ms-3">
                <h5 className="mb-0">Card title</h5>
                <small>ChannelName</small>
                <Card.Text>
                  <p className="card-text mb-0">Lorem ipsum dolor sit amet consectetur</p>
                  <small>
                    <span>Views .</span>
                    <span> DateUploaded</span>
                  </small>
                </Card.Text>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export const HScrollTab = ({ data, title = true }) => {
  // console.log(data);

  const [tab, selectedTab] = useState("");

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <div className="my-3 mx-auto justify-content-center">
      {title ? <h1>HScrollTab</h1> : <h1 hidden>HScrollTab</h1>}
      <ul className="d-flex overflow-auto" style={{ listStyle: "none" }}>
        {data.map((item, index) => (
          <li onClick={(e) => selectedTab(e.target.innerText)} className="mx-2 px-2 py-1 btn btn-outline-primary" key={index}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const HScrollCard = ({ data = Array.from({ length: 10 }), title = true }) => {
  // const data = Array.from({ length: 10 });
  return (
    <div className="my-3 mx-auto justify-content-center">
      {/* {Array.from({ length: 10 }).map((_, idx) => ( */}
      {title ? <h1>HScrollCard</h1> : <h1 hidden>HScrollCard</h1>}

      <ul className="d-flex overflow-auto" style={{ listStyle: "none", scrollbarWidth: "none" }}>
        {data.map((item, index) => (
          <li data-aos="fade-left" data-aos-easing="ease-in-out" onClick={(e) => selectedTab(e.target.innerText)} className="p-1" key={index}>
            <YTCardThumb />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const SVGHolder = ({ w = 200, h = 200, c = "#20c997" }) => {
  return (
    <svg className="bd-placeholder-img card-img-top" width={w} height={h} xmlns="http://www.w3.org/2000/svg">
      <rect width={w} height={h} fill={c}></rect>
    </svg>
  );
};
