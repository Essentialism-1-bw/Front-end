import React, { useState, createElement } from "react";
import SignInForm from "./SignInForm";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { axiosWithAuth } from "../../Authentication/axiosWithAuth";
import axios from "axios";

const useStyles = makeStyles({
  banner: {
    display: "flex",
    flexFlow: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "rgba(128, 128, 128, 0.1)"
  },
  box1: {
    padding: 30,
    display: "flex",
    flexFlow: "row", 
    flexWrap: "wrap",
    justifyContent: "center",
  },
  box2: {
    display: "flex",
    justifyContent: "center",
  },
  leftCont: {
    display: "flex",
    width: "100%",
    fontSize: "1.7rem"
  },
  logo: {
    width: "50%",
  },
  mainTitle: {
    color: "white",
    margin: 20,
    width: "100%",
  },
  link: {
    textDecoration: "none",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const SignIn = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axios
      .post("/auth/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  const classes = useStyles();

  return (
    <div className="BannerBG2">
      <div className={classes.banner}>
        <div className={classes.box1}>
          <div className={classes.leftCont}>
            <Link className={classes.link} to="/">
              <img
                className={classes.logo}
                src={require("../img/logo.png")}
                alt="logo"
              />
            </Link>
            <Link className={classes.link} to="/">
              <h1 className={classes.mainTitle}>Essentialism</h1>
            </Link>
          </div>
        </div>
        <div className={classes.box2}>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
