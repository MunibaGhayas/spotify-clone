import React from "react";
import "./Login.css";
import {loginUrl } from "./spotify";
import logo from "./logo.webp";

function Login() {
  return (
    <div className="login">
      <img
        src={logo}
        alt=""
      />
      <a href={loginUrl}>LOGIN TO SPOTIFY</a>
    </div>
  );
}

export default Login;
