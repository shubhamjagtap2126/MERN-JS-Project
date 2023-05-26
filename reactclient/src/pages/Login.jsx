import React, { useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import { PGTitle } from "./Home";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  // const [isAuthUser, setisAuthUser] = useState(false);

  useEffect(() => {
    function isAuthUser() {
      if (!localStorage.getItem("token")) {
        console.log(localStorage.getItem("token"));
        return true;
      }
      return false;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = { email, password };
    setisLoading(true);
    console.log({ email, password });

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (!response.ok) {
        setisLoading(false);
        setError(json.error);
      }
      if (response.ok) {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));
        // update the auth context
        // const dispatch = useDispatch();
        // dispatch({ type: "LOGIN", payload: json });
        // update loading state
        setisLoading(false);
      }
      if (localStorage.getItem) {
        Navigate("/");
      }
      return { isLoading, error };
    } catch (error) {
      // console.log(error.error);
      setError(error.error);
    }
  };

  return (
    <>
      <PGTitle title="Login" />
      {/* <div>Login</div> */}
      <div className="card col-md-8 col-lg-6 my-5">
        <div className="card-body">
          <form className="container mt-5 mb-5" onSubmit={handleSubmit}>
            <label className="form-lable">Email</label>
            <input
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
