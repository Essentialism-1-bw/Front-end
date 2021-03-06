import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7932FF"
    }
  }
});

const useStyles = makeStyles({
  nav: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    position: "fixed",
    top: 0,
    zIndex: 999
  },
  leftCont: {
    display: "flex",
    width: "50%"
  },
  logo: {
    width: 50,
    height: 50
  },
  mainTitle: {
    color: "white",
    marginLeft: "10%"
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: 700,
    display: "flex",
    alignItems: "center"
  }
});

const NavBar = () => {
  const classes = useStyles();

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }


  return (
    <nav className={classes.nav}>
      <div className={classes.leftCont}>
        <Link className={classes.link} to="/welcome">
          <img
            className={classes.logo}
            src={require("../logo.png")}
            alt="logo"
          />
        </Link>
        <Link className={classes.link} to="/welcome">
          <h1 className={classes.mainTitle}>Essentialism</h1>
        </Link>
      </div>
      <Link className={classes.link} to="/welcome">
        Home
      </Link>
      {/* <Link className={classes.link} to="/">
        Sign In
      </Link> */}
      {localStorage.getItem("token") ? <Link className={classes.link} to="/" onClick={() => signOut()}>Sign Out</Link> : <Link className={classes.link} to="/">
        Sign In
      </Link>}
      <Link className={classes.link} to="/dashboard">
        <ThemeProvider theme={theme}>
          <Button
            className={classes.link}
            style={{ borderRadius: "15px", height: "35px" }}
            variant="contained"
            color="primary"
          >
            Dashboard
          </Button>
        </ThemeProvider>
      </Link>
    </nav>
  );
};

export default NavBar;
