import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateFormData } from "../Helpers/loginValidation";
import { loginFields } from "../Helpers/loginFeilds";
import input from "../Components/input"
import { AuthContext } from "./Authentication";

// import "../style/login.css";

function Login() {
  //! STATES

  let [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  let [formErrors, setformErrors] = useState({});
  let [successMsg, setSuccessMsg] = useState("");
  let [errorMsg, setErrorMsg] = useState("");
  let navigateToHome = useNavigate();
  let {Login}=useContext(AuthContext)

  //! FUCTION TO GET INPUT DATA

  let getData = ({ target: { value, name } }) => {
    setLoginData({ ...loginData, [name]: value });
  };

  //! FUNCTION TO POST DATA
  let postLoginData = async (e) => {
    e.preventDefault();
    setformErrors(validateFormData(loginData));
    let fdataLength = Object.keys(validateFormData(loginData)).length;
    if (fdataLength === 0) {
      try {
        let { data } = await axios.post(
          `http://localhost:3000/api/login`,
          loginData
        );

        let tokenExpiry = new Date().getTime() + 3600 * 1000;
        Login(data.token, tokenExpiry);
        setLoginData(data);
        setSuccessMsg(data.message);
        setTimeout(() => {
          setSuccessMsg("");
          navigateToHome("/events");
        }, 2000);
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
    }
  };
  //! JSX
  return (
    <section className="login-form">
      {(successMsg && <p className="popup">{successMsg}</p>) ||
        (errorMsg && <p className="popuperror">{errorMsg}</p>)}
      <div className="form-div">
        <h1>Login Form</h1>
        <form>
          {loginFields.map(({ id, type, value, placeholder, name }) => {
            return (
              <input
              key={id}
              type={type}
              value={value}
              name={name}
              placeholder={placeholder}
              onchange={getData}
              errMsg={formErrors[name]}
              />
            );
          })}
          <button className="loginbtn" onClick={postLoginData}>
            Login
          </button>
        </form>
        <a href="./signup">Don't have account? Signup</a>
      </div>
    </section>
  );
}

export default Login;