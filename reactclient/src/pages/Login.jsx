import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  // const [isAuthUser, setisAuthUser] = useState(false);

  // useEffect(() => {
  //   function isAuthUser() {
  //     if (!localStorage.getItem("token")) {
  //       console.log(localStorage.getItem("token"));
  //       return true;
  //     }
  //     return false;
  //   }
  // }, [isAuthUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = { email, password };
    setisLoading(true);
    console.log({ email, password });

    // const reqOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // };

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      axios
        .post(
          "api/users/login",
          { email, password }
          // { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          return res.json();
          //   // console.log(res.json());
        });
      // .then((data) => {
      //   console.log(data);
      //   setisLoading(false);
      //   // return data;
      //   // alert("Login  Successfully");
      // })
    } catch (error) {
      console.log(error.msg);
      setError(error.msg);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {/* <div>Login</div> */}
      <div className="card col-sm-3 mt-5 offset-md-4">
        <div className="card-body">
          <form className="container mt-5 mb-5" onSubmit={handleSubmit}>
            <label className="form-lable">Email</label>
            <input
              exact
              className="form-control"
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {/* {email} */}
            <label className="form-lable">Password</label>
            <input
              exact
              className="form-control"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            {/* {password} */}
            {!isLoading && (
              <button className="btn btn-primary mt-4">Login</button>
            )}
            {isLoading && (
              <button className="btn btn-disable mt-4">Signing...</button>
            )}
            {error && <div className="error">error</div>}
          </form>
        </div>
      </div>
    </>
  );
}
