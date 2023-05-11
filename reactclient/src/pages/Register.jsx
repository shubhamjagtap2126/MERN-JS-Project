import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [name, setName] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      .catch((e) => console.log(e.msg));
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="card container mt-5">
        <img
          className="card-img-left ml-0"
          src="https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?h=400"
        />
        <div className="card-body">
          <form className="container" onSubmit={handleSubmit}>
            <div classNameName="form-row">
              <div className="form-group">
                <label for="inputEmail4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <div className="form-group">
                  <label for="inputPassword4">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />

                  <label for="name form-lable">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
              <a to="register">Already signUp. Try Login</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
