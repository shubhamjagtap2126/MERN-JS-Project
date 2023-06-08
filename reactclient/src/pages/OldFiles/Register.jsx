import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { PGTitle } from "../Home";

const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password, name };
    setisLoading(true);
    console.log(data);

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = fetch("api/users/signup", reqOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setisLoading(false);
      })
      .catch((e) => console.log(e.error));
  };

  return (
    <>
      <PGTitle title="Register" />
      <div className="card container mt-5">
        <img
          className="card-img-left ml-0"
          src="https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?h=400"
        />
        <div className="card-body">
          <form className="container" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                  value={email}
                  onChange={onChange}
                />
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                  />

                  <label className="form-lable">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            {/* <div className="form-group">
              <label for="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity" />
              </div>
              <div className="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" className="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" className="form-control" id="inputZip" />
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label className="form-check-label" for="gridCheck">
                  Check me out
                </label>
              </div>
            </div> */}
            <button className="btn btn-primary">SignUp</button>
            <div>
              Already signUp.
              <Link to="/Login">Try Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
