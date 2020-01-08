import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField } from "formik-material-ui";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    borderRadius: "15px",
    //   marginTop: "10%",
    width: "100%",
    //   height: "50vh",
    padding: 40,
    paddingTop: 80,
    paddingBottom: 80,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "left"
  },
  input: {
    marginBottom: 20,
    paddingTop: 10,
    width: "100%"
  },
  title: {
    color: "#000",
    fontSize: "1.4rem",
    fontWeight: 700
  },
  signup: {
    color: "#7932FF"
  },
  signin: {
    marginTop: 10,
    borderRadius: "15px"
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "flex-end"
  },
  singleField: {
    width: 470
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7932FF"
    }
  }
});

const SignInForm = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div style={{ width: "86%" }}>
        <Typography className={classes.title}>Sign In</Typography>
        <p style={{ fontSize: ".8rem" }}>
          New User?{" "}
          <Link to="/signup" className={classes.signup}>
            Create an account
          </Link>
        </p>
      </div>
      <Form>
        <ThemeProvider theme={theme}>
          <div className={classes.input}>
            <Field
              type="email"
              color="primary"
              name="email"
              label="Email Address"
              component={TextField}
              InputLabelProps={{ shrink: true }}
              fullWidth
              className={classes.singleField}
            />
          </div>
          <div className={classes.input}>
            <Field
              type="password"
              color="primary"
              name="password"
              label="Password"
              InputLabelProps={{ shrink: true }}
              component={TextField}
              className={classes.singleField}
            />
          </div>
          <div className={classes.buttonDiv}>
            <Button
              className={classes.signin}
              type="submit"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </div>
        </ThemeProvider>
      </Form>
    </Card>
  );
};

const FormikSignInForm = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required(),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required()
  }),
  handleSubmit(values, { resetForm, setStatus, setSubmitting }) {
    axios
      .post("https://bw-essentialism.herokuapp.com/api/auth/login", values)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        setStatus(res.data);
        resetForm();
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
        setSubmitting(false);
      });
  }
})(SignInForm);

export default FormikSignInForm;
