import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  FacebookRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
// import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { useContext, useState } from "react";
import { auth, provider } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");

  const navigate = useNavigate();

  // This is profile update starting here
  const { dispatch } = useContext(AuthContext);

  const handleToggle = (e) => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log(inputs);

  const handleLogin = (e) => {
    e.preventDefault();

    // This is profile update starting here
    dispatch({ type: "LOGIN_START" });

    try {
      signInWithEmailAndPassword(auth, inputs.email, inputs.password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;

          // This is profile update starting here
          dispatch({ type: "LOGIN_SUCCESS", payload: user });

          // console.log(user);
          navigate("/home");
        }
      );
    } catch (error) {
      // This is profile update starting here
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  // Add Google Login
  const signInWithGoogle = (e) => {
    dispatch({ type: "LOGIN_START" });
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        const user = result.user;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        navigate("/home");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };

  return (
    <div className="login">
      <form>
        <h2>Login</h2>
        <div className="formInput">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="formInput">
          <input
            type={inputType}
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <div className="eyeIcon" onClick={handleToggle}>
            {toggleEye ? <Visibility /> : <VisibilityOff />}
          </div>
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>

        <div className="formLink">
          <span>Don't have an account?</span>
          <Link
            to={"/register"}
            className="formSignUp"
            style={{ textDecoration: "none" }}
          >
            SignUp
          </Link>
        </div>
        <hr />
        <div className="line">
          <div className="media-options">
            <Link
              to="#"
              className="facebook"
              style={{ textDecoration: "none" }}
            >
              <FacebookRounded className="facebookIcon" />
              <span>Login with Facebook</span>
            </Link>
          </div>
          <div className="media-options">
            <Link
              to="#"
              className="facebook google"
              style={{ textDecoration: "none" }}
              onClick={signInWithGoogle}
            >
              <img
                src="../../../assets2/google.png"
                alt=""
                className="googleImg"
              />
              <span>Login with Google</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
