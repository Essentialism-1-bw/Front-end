import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField } from 'formik-material-ui';
import { Select } from 'formik-material-ui';
import { Checkbox } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; 
import { Link } from 'react-router-dom'


const theme = createMuiTheme({
  palette: {
      primary: {
          main: "#7932FF"
      }
  }
})

const useStyles = makeStyles(theme => ({
  root: {
  
  },

  card: {
    borderRadius: '15px',
    width: "100%",
    padding: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: 'left'
  },

  signin: {
    marginTop: 30,
    borderRadius: '15px'
  },
  signup: {
    color: '#7932FF'
  },

  singleField: {
    width: 470,
    // '& label.Mui-focused': {
    //   color: 'gray',
    // },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: '#7932FF',
    // },
  },

  singleMenu: {
    width: 470,
  },

  duelField: {
    marginRight: theme.spacing(1),
    width: 230,
  },

  duelMenu: {
    marginRight: theme.spacing(1),
    width: 250,
    marginTop: theme.spacing(2),
  },

  triField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100,
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

}));



function FormTest({values, errors, touched, status}) {

  const [user, setUser] = useState([]);

    useEffect(() =>{
        if (status) {
            setUser([...user, status])
        }
    }, [status]);

    const classes = useStyles();

  return (
    <Card className={classes.card}>
        <Form>
        <h1>Create an account</h1>
        <p>Already have an account? <Link to="/login" className={classes.signup}>Sign In</Link> </p>
        <br/>
        <br/>
        <br/>

        <ThemeProvider theme={theme}>
        <Field 
          type="email" 
          name="email" 
          component={TextField}
          label="Email adress"
          color="primary"
          className={classes.singleField}
          InputLabelProps={{
            shrink: true,
          }}
        />
          {touched.email}
        <br/>
        <br/>
        <br/>

        <Field 
          type="firstName" 
          name="firstName" 
          component={TextField}  
          label="First name"
          color="primary"
          className={classes.duelField}
          InputLabelProps={{
            shrink: true,
          }}
        />
          {touched.firstName}

        <Field 
          type="lastName" 
          name="lastName" 
          component={TextField} 
          label="Last name"
          color="primary"
          className={classes.duelField}
          InputLabelProps={{
            shrink: true,
          }} 
        />
          {touched.lastName}
        <br/>
        <br/>
        <br/>

        <Field 
          type="password" 
          name="password" 
          placeholder="******" 
          component={TextField}
          label="Password"
          className={classes.singleField}
          InputLabelProps={{
            shrink: true,
          }}
        />
          {touched.password}
        <br/>
        <br/>
        <br/>

        <InputLabel shrink id="month">
          Date of birth
        </InputLabel>
        <br/>
        <br/>

        <InputLabel shrink id="month">
          Month
        </InputLabel>
        <Field 
          type="month" 
          name="month" 
          placeholder="Month" 
          color="primary"
          component={Select}
          className={classes.duelMenu}
        >
            <MenuItem value="" disabled>Choose a month</MenuItem>
            <MenuItem value={'January'}>January</MenuItem>
            <MenuItem value={'February'}>February</MenuItem>
            <MenuItem value={'March'}>March</MenuItem>
            <MenuItem value={'April'}>April</MenuItem>
            <MenuItem value={'May'}>May</MenuItem>
            <MenuItem value={'June'}>June</MenuItem>
            <MenuItem value={'July'}>July</MenuItem>
            <MenuItem value={'August'}>August</MenuItem>
            <MenuItem value={'September	'}>September</MenuItem>
            <MenuItem value={'October'}>October</MenuItem>
            <MenuItem value={'November'}>November</MenuItem>
            <MenuItem value={'December	'}>December	</MenuItem>
        </Field>
          {touched.month}
 
        <Field 
          type="number" 
          name="day" 
          component={TextField}
          className={classes.triField}
          label="Day"
          color="primary"
          className={classes.triField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {touched.day}

        <Field 
          type="number" 
          name="year" 
          component={TextField}
          label="Year"
          color="primary"
          className={classes.triField}
          InputLabelProps={{
            shrink: true,
          }}
        />
          {touched.year}
        <br/>
        <br/>
        <br/>

        <InputLabel shrink id="country">
          Country/Region
        </InputLabel>
        <Field 
          type="country" 
          name="country" 
          placeholder="country"
          color="primary" 
          component={Select}
          className={classes.singleMenu}
        >
            <MenuItem value="" disabled>Choose a Country</MenuItem>
            <MenuItem value={'United States'}>United States</MenuItem>
            <MenuItem value={'Canada'}>Canada</MenuItem>
            <MenuItem value={'Mexico'}>Mexico</MenuItem>
            <MenuItem value={'France'}>France</MenuItem>
            <MenuItem value={'Germany'}>Germany</MenuItem>
        </Field>
          {touched.country}
        <br/>
        <br/>
        <br/>
        <InputLabel shrink id="month">
          I Agree to Terms of Service
        </InputLabel>
        <Field 
          type="checkbox" 
          name="terms"
          // value="start"
          label="I Agree to Terms of Service" 
          component={Checkbox} 
        />
          {touched.terms}
        <br/>
        <br/>

          <div className={classes.buttonDiv}>
            <Button 
          className={classes.signin}
          type="submit" 
          name="submit" 
          variant="contained"
          color="primary"
        >
          Create account
        </Button>
          </div>
        </ThemeProvider>
        
        <br/>
        <br/>
      </Form>
    </Card>
  ); 
}

const FormData = withFormik({
  mapPropsToValues({firstName, lastName, email, password, month, day, year, terms}) {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      month: month || "", 
      day: day || "",
      year: year || "", 
      terms: terms || false
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup
      .string()
      .email()
      .min(3, "Email is not long enough")
      .max(50, "Email is too long")
      .required("Please enter Email addres"),
    firstName: Yup
      .string()
      .min(3, "First name is too short")
      .max(10, "First name is too long")
      .required("Please enter First Name"),
    lastName: Yup
      .string()
      .min(3, "Last name is too short")
      .max(10, "Last name is too long")
      .required("Please enter Last Name"),
    password: Yup
      .string()
      .min(8, "Password is too short minimum of 8 characters")
      .max(10, 'Password is long maximum of 10 characters')
      .required("Please enter your password"),
      month: Yup
      .string()
      .required("Please select a month"),
      day: Yup
      .number()
      .max(31)
      .required("Please enter date"),
      year: Yup
      .number()
      .max(2020)
      .required("Please enter year"),
      country: Yup
      .string()
      .required("Please select a country"),
      terms: Yup.boolean()
  }),

  handleSubmit(values, {setStatus, resetForm}) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        console.log(response);
        setStatus(response.data);
        resetForm();
      })
      .catch(err => {
        console.log('Error', err.response);
      });
  }
})(FormTest);

export default FormData;
