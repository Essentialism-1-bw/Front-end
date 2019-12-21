import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; 
import { Link } from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
      primary: {
          main: "#7932FF"
      },
      secondary: {
        main: "#E33D3D"
    }
  }
})

const useStyles = makeStyles(theme => ({

  card: {
    borderRadius: '15px',
    width: "98.3%",
    padding: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: 'left', 
    background: '#1D1D1D',
  },

  valueiteam: {
    padding: 10,
    margin: 10,
    color: 'gray',
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexFlow: 'wrap',
  },

  mainButton: {
    marginTop: 30,
    borderRadius: '15px',
    width: '50%',
  },

  top3card: {
    margin: 30,
    width: '100%',
    padding: 10,
    paddingLeft: 30,
    marginBottom: 200,
    fontSize: '2rem',
    color: 'white',
    background: '#7932FF',
    display:'felx',
    textAlign: 'center', 
  },

  singleMenu: {
    width: 470,
  },

  duelMenu: {
    marginRight: theme.spacing(1),
    width: 500,
    marginTop: theme.spacing(2),
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center'
}

}));

function FormFiled({ touched, status }) {

  const [value, setValue] = useState([]);

    useEffect(() =>{
        if (status) {
            setValue([...value, status])
        }
    }, [status]);

    const classes = useStyles();

  return (
    <Card className={classes.card}>
        <Form>
        <ThemeProvider theme={theme}>

          <div className={classes.top3card}>
            <h2>Select your top 3 values from lists above</h2>
          </div>

        <div className={classes.buttonDiv}>

          <Button 
            className={classes.mainButton}
            type="reset" 
            name="submit" 
            variant="contained"
            color="secondary"
          >
            Reset Values
          </Button>
        </div>
        </ThemeProvider>
        
        <br/>
        <br/>
      </Form>
    </Card>
  ); 
}

const Values = withFormik({
  mapPropsToValues({valueIteam,}) {
    return {
      valueIteam: valueIteam || "", 
    };
  },

  validationSchema: Yup.object().shape({
    valueIteam: Yup
    .string()
    .required("Please select a value"),
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
})(FormFiled);

export default Values;
