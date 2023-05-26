import { Outlet } from "react-router-dom";
import { TabsMenu } from "../components/TabsMenu";
import { Helmet } from "react-helmet";

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
        <div className="">
          <section>
            <img
              className="col-xs-8"
              src="https://jep-asset.akamaized.net/jiostaticresources/v05/images/jppp-masthead-desk.png"
              alt=""
            />
          </section>

          <section>
            <div className="row align-items-center my-5">
              <div className="col-lg-7"></div>
              <div className="col-lg-5">
                <h1 className="font-weight-light">Home</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </section>
          <section className="container">
            <TabsMenu />
          </section>
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

      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is
              shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or
              overriding our default variables. It's also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Accordion Item #2
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is
              hidden by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or
              overriding our default variables. It's also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Accordion Item #3
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <strong>This is the third item's accordion body.</strong> It is
              hidden by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or
              overriding our default variables. It's also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const Home = () => {
//   const [data, setData] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("api/users/me");
//       const resData = await response.json();
//       // console.log(resData.length);
//       if (resData.length) {
//         setData(resData);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="container">
//       {/* <div>home</div> */}
//       <div>{data && data.map((df) => <p key={df._id}>{df.name}</p>)}</div>
//     </div>
//   );
// };

// export default Home;
