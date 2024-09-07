import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PGTitle } from "./Home";
// import { useAuthContext } from "../Hooks";
import { axiosInstance } from "../features/AppSlices";
import { Tabs, Tab } from "react-bootstrap/";
import { toast } from "react-toastify";
import { HashLink } from "react-router-hash-link";
import { createSlice } from "@reduxjs/toolkit";

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
            <Tab eventKey="Register" title="Register" id="Register">
              <Register />
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

// =========>  =  <=========
// run inside the console
export const usersData = {
  _id: "648b278b2e7491798833d314",
  name: "Raju John",
  email: "john@gmail.com",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGIyNzhiMmU3NDkxNzk4ODMzZDMxNCIsImlhdCI6MTcxNjIyMzEzMSwiZXhwIjoxNzE4ODE1MTMxfQ.VySc5dn83DypX4vUPcm_u60n0YEgGoRi4QFbSpMm2cQ",
};
// localStorage.setItem("users", JSON.stringify(usersData));

// =========> UsersAuth  = Slice <=========
export const authSlice = createSlice({
  name: "users",
  initialState: {
    users: usersData ? usersData : [],
    loading: true,
    error: "",
  },
  reducers: {
    login: (state) => {
      state.users.users = usersData;
    },
    logout: (state) => {
      state.users.users = null;
    },
    // addUser (state, action) => { state.users = action.payload },
    authLoading: (state) => {
      return { ...state, loading: true };
    },
    authError: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
  // extraReducers: {}
});
// Action creators are generated for each case reducer function
export const { login, logout, authLoading, authError } = authSlice.actions;
export const usersState = (state) => state.users;

// Login Page
export const Login = () => {
  // Navigate after login
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Form all fields UseState mapping
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
      setUser(json ? json : userAuthData);
      localStorage.setItem("user", JSON.stringify(json));
      toast.success(`Welcome, ${json.user.name}`);
      navigate("/", { replace: true });

      // update the auth context
      // const { dispatch } = useAuthContext();
      // dispatch({ type: "LOGIN", payload: json });
    } catch {
      (error) => setError(error);
    }
  };

  return (
    <form className=" g-3 needs-validation" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="Your Email" className="form-label">
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
        <label htmlFor="yourPassword" className="form-label">
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
          Don't have account? <HashLink to={"#Register"}>Try Register !</HashLink>
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

// Register Page
export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
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
    console.log(error);
    try {
      const response = await axiosInstance.post("/users/signup", data);
      const json = response.data;
      // console.log(response.data);
      setisLoading(false);
      setFormData(initialState);
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      toast.success(`Welcome, ${json.user.name}`);

      // Navigate after login
      navigate("/", { replace: true });

      // update the auth context
      // const { dispatch } = useAuthContext();
      // dispatch({ type: "SIGNUP", payload: json });
    } catch {
      (error) => setError(error);
    }
  };
  return (
    <form id="Register" className="row g-3 needs-validation" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label htmlFor="yourName" className="form-label">
          Your Name
        </label>
        <input value={name} onChange={onChange} type="text" name="name" className="form-control" id="yourName" required />
        <div className="invalid-feedback">Please, enter your name!</div>
      </div>

      <div className="mb-2">
        <label htmlFor="email" className="form-label">
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
        <label htmlFor="Password" className="form-label">
          Password
        </label>
        <input value={password} onChange={onChange} type="password" name="password" className="form-control" id="Password" required />
        <div className="invalid-feedback">Please enter your password!</div>
      </div>

      <div className="mb-2">
        <div className="form-check">
          <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required />
          <label className="form-check-label" htmlFor="acceptTerms">
            I agree and accept the <Link to="#">terms and conditions</Link>
          </label>
          <div className="invalid-feedback">You must agree before submitting.</div>
        </div>
      </div>
      <div className="mb-2">
        <button
          // disabled={isLoading}
          className="btn btn-primary"
        >
          Create Account
        </button>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
    </form>
  );
};








