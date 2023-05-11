import TabsMenu from "../components/TabsMenu";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="home">
        <div class="container">
          <TabsMenu />
          <div class="row align-items-center my-5">
            <div class="col-lg-7"></div>
            <div class="col-lg-5">
              <h1 class="font-weight-light">Home</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// import React, { useEffect, useState } from "react";

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
