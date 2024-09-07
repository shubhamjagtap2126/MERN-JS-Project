import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function PostCard({ post, comments, onDelete, onComment }) {
  const [commentText, setCommentText] = useState("");
  return (
    <Card>
      <Card.Body>
        {/* <Card.Title>{post.title}</Card.Title> */}
        <Card.Text>{post.content}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">{post.id}</Card.Subtitle>
        <Button variant="danger" onClick={() => onDelete(post.id)}>
          Delete
        </Button>
        <hr />
      </Card.Body>
    </Card>
  );
}

export function Card1({ title = true }) {
  return (
    <div className="my-4">
      {title ? <h1>Card1</h1> : <h1 hidden>Card1</h1>}
      <div className="card d-md-flex flex-md-row align-items-center">
        <img className="img-fluid rounded-start relative" style={{ width: "50%" }} src="https://jep-asset.akamaized.net/cms/assets/international-roaming/carousel-banner-V1.png" alt="..." />

        <div className="card-body">
          <h2>Hello</h2>
          <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eius labore impedit mollitia,</h5>
          <Link to="#" className="btn btn-lg btn-primary my-4">
            Go to somewhere
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Card2({ title = true }) {
  return (
    <div className="my-4">
      {title ? <h1>Card2</h1> : <h1 hidden>Card2</h1>}
      <div className="card d-md-flex flex-md-row align-items-center" style={{ borderWidth: "0px" }}>
        <img className="img-fluid rounded-start relative" style={{ width: "50%" }} src="https://jep-asset.akamaized.net/cms/assets/international-roaming/ir-sidebanner1.jpeg" alt="..." />

        <div className="card-body text-center">
          <h2>Hello</h2>
          <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eius labore impedit mollitia,</h5>
          <Link to="#" className="btn btn-lg btn-secondary my-4">
            Go to somewhere
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Card3({ title = true }) {
  return (
    <div>
      {title ? <h1>Card3</h1> : <h1 hidden>Card3</h1>}

      <Card className="cardshadow" style={{ width: "18rem" }}>
        <Card.Img variant="top" src="	https://www.jio.com/vertical.png" />
        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
          <Card.Title>Card Title</Card.Title>
          <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
          <Link to={"#"} className="btn btn-primary rounded-5">
            Go somewhere
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export function Card4({ item, title = true }) {
  // const { img } = item;
  return (
    <div>
      {title ? <h1>Card4 Overlay</h1> : <h1 hidden>Card4 Overlay</h1>}
      <Card className="cardshadow text-black" style={{ width: "18rem" }}>
        <Card.Img src="	https://www.jio.com/384x217.jpg" alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="badge bg-primary rounded-5">
            <span> new</span>
          </Card.Title>
        </Card.ImgOverlay>
        <div className="ms-3">Model</div>
        <div className="ms-3 mb-3">Cost</div>
      </Card>
    </div>
  );
}

export function IconCard1({ title = true }) {
  return (
    <div className="my-4">
      {title ? <h1>IconCard1</h1> : <h1 hidden>IconCard1</h1>}
      <div className="d-flex overflow-auto flex-row">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx}>
            <div className="card align-items-center" style={{ width: "18rem", borderWidth: "0px" }}>
              <div className="card-body text-center">
                <Link to="#" className="h1 my-4">
                  <i className="bi bi-0-circle"></i>
                </Link>
                <h2>Hello</h2>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro eius labore impedit mollitia,</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingCard({ title = true }) {
  return (
    <div>
      {title ? <h1>PricingCard</h1> : <h1 hidden>PricingCard</h1>}

      <Card className="pricingcard" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            <span className="badge bg-primary">Bess Selling</span>
          </Card.Title>
          <h3>Rs 200</h3>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <hr />
          <Card.Text className="d-flex flex-row justify-content-between">
            <div className="header">
              <span>data</span>
              <h5>data</h5>
            </div>
            <div className="footer">
              <span>Validity</span>
              <h5>Validity</h5>
            </div>
          </Card.Text>
          <div className="link">
            <Link className="btn btn-success mx-2" to="#">
              Click Me
            </Link>
            <Link className="btn btn-outline-primary" to="#">
              View Details
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}


