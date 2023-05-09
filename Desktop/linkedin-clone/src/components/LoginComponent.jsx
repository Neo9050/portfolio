import React, { useState } from "react";
import { LoginAPI, GoogleSignInAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import GoogleButton from "react-google-button";
import "../Sass/LoginComponent.scss";

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {  
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };



  //The response variable is not being used in the google sign in function,
  // so it's unclear what this function is actually doing with the Google sign-in. 
  // Additionally, there is no error handling in case the Google sign-in fails. 
  // -------below code-----
  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    navigate("/home");
  };

  // const googleSignIn = async () => {
  //   try {
  //     let response = await GoogleSignAPI();
  //     toast.success("Signed in with Google!");
  //     localStorage.setItem("userEmail", response.user.email);
  //     navigate("/home");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Google sign-in failed. Please try again.");
  //   }
  // };
  
  //---above code--
  //updated version of the googleSignIn function that includes error handling and 
  //uses the response variable to store the user's Google sign-in information.

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
            
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
        
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
        </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn}/>

        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}
