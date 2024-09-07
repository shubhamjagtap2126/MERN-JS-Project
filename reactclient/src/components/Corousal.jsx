import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

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
