import { SiteData } from "../SiteData";
import { TabsMenu } from "../components/Tabs";
import { Outlet, Link } from "react-router-dom";
import { PGTitle } from "./Home";

export const ECommerce = () => {
  return (
    <div>
      <PGTitle title={"eCommerce"} />
      <section className="container my-2 d-flex justify-content-center ">
        <TabsMenu tabData={SiteData.PrivateMenus.ECommerceTabMenu} />
      </section>
      <Outlet />
    </div>
  );
};

export const TrendingECommerce = () => {
  return (
    <div>
      <h1>TrendingECommerce</h1>
    </div>
  );
};

export const Food = () => {
  return (
    <div>
      <section id="menu" className="menu">
        <div className="container tab-content" data-aos="fade-up">
          <div className="tab-header text-center">
            <h3>Starters</h3>
          </div>
          <MenuItem1 data={SiteData.ComponentData.FoodMenu} />
        </div>
      </section>
    </div>
  );
};

export const Sports = () => {
  return (
    <div>
      <h1>Sports</h1>
    </div>
  );
};

export const ITsepcs = () => {
  return (
    <div>
      <h1>ITsepcs</h1>
    </div>
  );
};

export const MenuItem1 = ({ data, width = "200" }) => {
  // console.log(data);

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {data.map((item, index) => (
        <div className="card" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration={`${index * 500}`}>
          <Link to="#" className="glightbox">
            <img
              width={width}
              // {`${width}`}
              src={item.src}
              className="card-img-top"
              alt=""
            />
          </Link>
          <div className="card-body">
            <h4 className="card-title">{item.title}</h4>
            <p className="card-text">{item.text}</p>
            <p className="card-subtitle">$5.95</p>
          </div>
        </div>
      ))}
    </div>
  );
};
