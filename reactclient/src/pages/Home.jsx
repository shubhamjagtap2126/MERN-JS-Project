import { Helmet } from "react-helmet";
import { SiteData } from "../features/SiteData";
import { useEffect } from "react";
import { CustomCorousal } from "../components/Corousal";
import { Card1, Card2, Card3, Card4, IconCard1, PricingCard } from "../components/Card";

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
        <div className="container" data-aos="fade-right" data-aos-duration="2000">
          <Card1 title={false} />
        </div>
        <div className="container" data-aos="fade-up" data-aos-duration="3000">
          <Card2 title={false} />
        </div>
        <div className="container" data-aos="fade-left" data-aos-duration="4000">
          <IconCard1 title={false} />
        </div>
        <div className="container" data-aos="fade-left" data-aos-duration="5000">
          <div className="intro align-items-center">
            <h1>Popular mobile plans </h1>
            <p>Choose your connection type to find a plan as per your digital needs.</p>
          </div>
          <div className="d-flex row row-cols-2 row-cols-lg-3 row-cols-xl-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <PricingCard title={false} />
            ))}
          </div>
          <div className="container my-4" data-aos="fade-left" data-aos-duration="6000">
            <Card3 title={false} />
          </div>
          <div className="container my-4" data-aos="fade-left" data-aos-duration="7000">
            <Card4 title={false} />
          </div>
        </div>
      </div>
    </>
  );
}
