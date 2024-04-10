import React, { useState } from "react";
import style from "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loader, setLoader] = useState(false);

  const onValueChangeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 10) {
      errors.password = "Password must be more than 10 characters";
    }
  
    return errors;
  };

  const SubmitHandler = () => {
    setLoader(true);

    const { username, password } = value;

    if (
      username.trim() === "" ||
      username.length === 0 ||
      username.length <= 4
    ) {
      setuserNameError(true);
      setLoader(false);
    } else if (password.length < 10) {
      setPasswordError(true);
      setLoader(false);
    } else {
      setLoader(false);
      setValue({ username: "", password: "" });
      setTimeout(() => {
        navigate("/main");
      }, 1000);

      toast("Login Success");
    }
  };

  return (
    <div>
      <div className="contain">
        <div className="nav-insta">
          {/* Your logo component */}
          <img src='logo192.png'></img>
        </div>
        <div id="body-1">
          <div className="formContainer">
            <h1>Sign in</h1>
            <p>Sign in to your Self Service Portal</p>

            <input
              type="text"
              id="input-user"
              placeholder="Username"
              name="username"
              value={value.username}
              onChange={onValueChangeHandler}
            />
            {userNameError ? <p>Username is required!</p> : ""}

            <br />
            <input
              type="password"
              id="input-pass"
              placeholder="Password"
              name="password"
              value={value.password}
              onChange={onValueChangeHandler}
            />
            {passwordError ? (
              <p>Password must be more than 10 characters</p>
            ) : (
              ""
            )}

            <br />
            <button disabled={loader} onClick={SubmitHandler}>
              {loader ? <Spin /> : "Log in"}
            </button>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;

