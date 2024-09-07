import { Outlet } from "react-router-dom";
import { SiteData } from "../features/SiteData";
import { PGTitle } from "./Home";
import { CustomAccordian } from "../components/Accordian";
import { TabsMenu } from "../components/Tabs";
import { Tab, Tabs } from "react-bootstrap";

export function About() {
  return (
    <div className="aboutpage">
      <PGTitle title="About" />
      <h1>About</h1>
      <Outlet />
    </div>
  );
}

export function Contact() {
  return (
    <div className="contactpage">
      <PGTitle title="Contact" />
      <h1>Contact</h1>
      <Outlet />
    </div>
  );
}

export function FAQ() {
  return (
    <div className="FAQ">
      <PGTitle title="FAQ" />
      <section className="my-2 container ">
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="home" title="Home">
            <div className="my-4">
              <CustomAccordian data={SiteData.SocialMedia} />
            </div>
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <div className="my-4">
              <CustomAccordian data={SiteData.SocialMedia} />
            </div>
          </Tab>
          <Tab eventKey="contact" title="Contact">
            <div className="my-4">
              <CustomAccordian data={SiteData.SocialMedia} />
            </div>
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
