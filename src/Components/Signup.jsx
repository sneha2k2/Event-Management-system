import React, { useState } from 'react'
import '../CSS/signup.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { inputData } from '../Helpers/signupFeilds';

function Signup() {
    //! STATES
  
    let [signupData, setsignupData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
    let [formErrors, setformErrors] = useState({});
    let [successMsg, setSuccessMsg] = useState("");
    let [errorMsg, setErrorMsg] = useState("");
  
    // console.log(successMsg);
  
    //! HOOK TO NAVIGATE
  
    let navigateToLogin = useNavigate();
  
    // let { user } = useSelector((state) => state.user);
    // console.log(user);
    // let dispatch = useDispatch();
  
    //! FUNCTION TO GET INPUT DATA
  
    let getData = ({ target: { value, name } }) => {
      setsignupData({ ...signupData, [name]: value });
      // dispatch(addSignupUser(signupData));
    };
  
    //! FUNCTION TO POST DATA AFTER VALIDATING
    let postSignupData = async (e) => {
      e.preventDefault();
  
      setformErrors(validateFormData(signupData));
      console.log(formErrors);
      let fdataLength = Object.keys(validateFormData(signupData)).length;
      console.log(fdataLength);
  
      if (fdataLength === 0) {
        try {
          let { data } = await axios.post(
            `http://localhost:3000/api/signup`,
            signupData
          );
          console.log(data);
          console.log(data.message);
          setSuccessMsg(data.message);
  
          setTimeout(() => {
            setSuccessMsg("");
            navigateToLogin("/login");
          }, 2000);
        } catch (error) {
          setErrorMsg(error.response.data.message);
        }
      }
    };
    //! JSX
    return (
      <section className="signup-form">
        {(successMsg && <p className="popup">{successMsg}</p>) ||
          (errorMsg && <p className="popuperror">{errorMsg}</p>)}
  
        <div className="formdiv">
          <h2>Create a new account</h2>
          <form>
            {inputData.map(({ id, type, placeholder, value, name, options }) => {
              if (type === "radio") {
                return (
                  <Fragment key={id}>
                    <div>
                      {formErrors[name] && (
                        <small
                          style={{ padding: "0px 0px 0px 5px", color: "black" }}
                        >
                          {formErrors[name]}
                        </small>
                      )}
                    </div>
                  </Fragment>
                );
              } else {
                return (
                  <input
                    key={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    option={options}
                    onchange={getData}
                    errMsg={formErrors[name]}
                  />
                );
              }
            })}
  
            <button className="signupbtn" onClick={postSignupData}>
              Register
            </button>
          </form>
          <a href="./Login">Already have a account?</a>
        </div>
      </section>
    );
  }
export default Signup