import React, { useState } from "react";
import { redirect, useNavigate, Link } from "react-router-dom";
import { PGTitle } from "./Home";
import { useAuthContext } from "../Hooks";
import { axiosInstance } from "./OldFiles/Tasks";
import { Tabs, Tab } from "react-bootstrap/";
import { toast } from "react-toastify";

export const AuthTab = () => {
  return (
    <section id="Auth" className="authPage">
      <PGTitle title="Auth" />
      <div className="bg-white col-md-8 offset-md-2 col-lg-6 offset-lg-3 my-5">
        <div className="container authContainer" data-aos="fade-up" data-aos-duration="1000">
          <Tabs defaultActiveKey="Login" className="mb-4" fill>
            <Tab eventKey="Login" title="Login">
              <Login />
            </Tab>
            <Tab eventKey="Register" title="Register">
              <div className="register" id="Register">
                <Register />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export const Login = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    // console.log({ email, password });
    setisLoading(true);

    try {
      const response = await axiosInstance.post("/users/login", data);
      const json = response.data;
      // console.log(response.data);
      setisLoading(false);
      setFormData(initialState);
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      const { dispatch } = useAuthContext();
      dispatch({ type: "LOGIN", payload: json });

      // redirect
      return toast.success(`Welcome, ${json.user.name}`), redirect("/");
    } catch {
      (err) => setError(err);
    }
  };
  return (
    <form className=" g-3 needs-validation" novalidate onSubmit={handleSubmit}>
      <div className="mb-2">
        <label for="Your Email" className="form-label">
          Email
        </label>
        <div className="input-group has-validation">
          <span className="input-group-text" id="inputGroupPrepend">
            @
          </span>
          <input type="email" name="email" className="form-control" value={email} onChange={onChange} id="yourUsername" required />
          <div className="invalid-feedback">Please enter your username.</div>
        </div>
      </div>

      <div className="mb-2">
        <label for="yourPassword" className="form-label">
          Password
        </label>
        <input type="password" name="password" value={password} onChange={onChange} className="form-control" id="yourPassword" required />
        <div className="invalid-feedback">Please enter your password!</div>
      </div>

      <button disabled={isLoading} className="btn btn-primary mb-2">
        Login
      </button>

      <div className="mb-2">
        <p className="small mb-0">
          Don't have account? <Link to={{ hash: "#Register" }}>Try Register !</Link>
        </p>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
    </form>
  );
};

export const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initialState = { name: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password, name };
    setisLoading(true);
    console.log(data);
    try {
      const response = await axiosInstance.post("/users/signup", data);
      const json = response.data;
      // console.log(response.data);
      if (json) {
        setisLoading(false);
        setFormData(initialState);
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // update the auth context
        const { dispatch } = useAuthContext();
        dispatch({ type: "SIGNUP", payload: json });

        const navigate = useNavigate();
        navigate("/");
      }
    } catch {
      (err) => setError(err);
    }
  };
  return (
    <form className="row g-3 needs-validation" novalidate onSubmit={handleSubmit}>
      <div className="mb-2">
        <label for="yourName" className="form-label">
          Your Name
        </label>
        <input value={name} onChange={onChange} type="text" name="name" className="form-control" id="yourName" required />
        <div className="invalid-feedback">Please, enter your name!</div>
      </div>

      <div className="mb-2">
        <label for="email" className="form-label">
          Your Email
        </label>
        <div className="input-group has-validation">
          <span className="input-group-text" id="inputGroupPrepend">
            @
          </span>
          <input value={email} onChange={onChange} type="email" name="email" className="form-control" id="email" required />
          <div className="invalid-feedback">Please choose a username.</div>
        </div>
      </div>

      <div className="mb-2">
        <label for="Password" className="form-label">
          Password
        </label>
        <input value={password} onChange={onChange} type="password" name="password" className="form-control" id="Password" required />
        <div className="invalid-feedback">Please enter your password!</div>
      </div>

      <div className="mb-2">
        <div className="form-check">
          <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required />
          <label className="form-check-label" for="acceptTerms">
            I agree and accept the <Link to="#">terms and conditions</Link>
          </label>
          <div className="invalid-feedback">You must agree before submitting.</div>
        </div>
      </div>
      <div className="mb-2">
        <button className="btn btn-primary">Create Account</button>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
    </form>
  );
};
