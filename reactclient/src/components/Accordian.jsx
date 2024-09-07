// =========> Component = CustomAccordian <=========

import { Accordion } from "react-bootstrap";

export function CustomAccordian({ data }) {
  return (
    <div className="accordion accordion-flush" id="accordion">
      {data &&
        data.map((item, index) => (
          <Accordion defaultActiveKey={0}>
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{item.text}</Accordion.Header>
              <Accordion.Body>{item.text}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
    </div>
  );
}
