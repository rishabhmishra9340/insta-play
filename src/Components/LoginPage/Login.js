import LOGO from "../../images/logo.png";
import React, { useEffect, useState } from "react";
import style from "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate("");

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchingToken = async () => {
    const token = await axios.get(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=461182fa2668493a72758c55a1789c35"
    );
    localStorage.setItem("token", token.data.request_token);
  };

  const onValueChangeHandeler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const SubmitHandler = async () => {
    setLoader(true);
    setFormErrors(validate(formValues));
    

    const { username, password } = value;

    if (
      username.trim() === "" ||
      username.length === 0 ||
      username.length <= 4
    )
     {
      setuserNameError(true);
      setLoader(false);
    } else if (
     
      
      password.length < 10
    ) {
     
      setPasswordError(true);
      setLoader(false);
    } else {
      await fetchingToken();
      const checkToken = localStorage.getItem("token");

      const data = {
        username: value.username,
        password: value.password,
        request_token: checkToken,
      };

      console.log(data);

      const res = await axios.post(
        "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=461182fa2668493a72758c55a1789c35",
        data
      );
      setLoader(false);
      console.log(res.data);

      setValue({
        username: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/main");
      }, 1000);

      toast("Login Success");
    }
  };


  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  var errors = {
    username: "",
    password: "",
  };
  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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

  console.log(errors);

  return (
    <div>
      <div className="contain">
        <div className="nav-insta">
          <img src={LOGO}></img>
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
              onChange={onValueChangeHandeler}
            />
            {userNameError ? <p>{formErrors.username}</p> : ""}

            <br />
            <input
              type="password"
              id="input-pass"
              placeholder="Password"
              name="password"
              value={value.password}
              onChange={onValueChangeHandeler}
            />
            {passwordError ? (
              <p className="errorMessage">{formErrors.password}</p>
            ) : (
              ""
            )}

            <br />
            <button disabled={loader === true} onClick={SubmitHandler}>
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
