import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Select } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider, withTheme } from '@material-ui/core/styles'; 
import ValuesList from '../ValuesList'
import TopThree from '../TopThree'
import ValueForm from './ValueForm'
import { Link } from 'react-router-dom'
import ValuesPopup from '../ValuesPopup'
import Popup from 'reactjs-popup'

const theme = createMuiTheme({
  palette: {
      primary: {
          main: "#7932FF",
          color: 'white'
      },
      secondary: {
        main: "#E33D3D"
    }
  }
})

const useStyles = makeStyles(theme => ({
  mainroot: {
    // border: '2px solid red',
    width: '100%',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  card: {
    borderRadius: '15px',
    width: "50%",
    margin: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: 'left', 
    background: '#F8F8F8',
  },
  valueList: {
    width: '100%',
    color: '#262626 ',
    background: '#FBFBFB ',
    padding: 10,
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20, 
  },
  valueiteam: {
    width: '100%',
    padding: 20,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: 'wrap',
  },
  buttonDiv: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "flex-end",
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  mainTitle: {
    color: 'white',
    background: 'black',
    width: '97.90%',
    padding: 30,
    margin: 0,
  },
}));



const ValueFiled = () => {

  const [values, setValues] = useState([]); 

  const [submitStatus, setSubmitStatus] = useState(true)

  const [errorText, setErrorText] = useState('')
 

  useEffect(() => {
    if(values.length < 5) {
        setSubmitStatus(false)
        setErrorText("Must have at least 5 values.")
    } else if(values.length > 5) {
        setSubmitStatus(false)
        setErrorText("No more than 5 values.")
    } else {
        setSubmitStatus(true)
    }
  }, [values.length])

  const addValue = (value) => {
    setValues([...values, value])
  }

  const resetValues = () => {
    setValues([])
  }

  const removeValue = (id) => {
    let newValues = values.filter(value => {
      return value.id !== id;
    })
    setValues(newValues)
  }


    const classes = useStyles();

  return (
    <div className={classes.mainroot}>
      <h2 className={classes.mainTitle}>1. The first step is to select your 5 favorite values</h2>
      <Card className={classes.card}>
        <ValueForm addValue={addValue} values={values} resetValues={resetValues}/>

        <ThemeProvider theme={theme}>
          <div>
            {values !== undefined ? values.map(value => {
              return (
                <Card className={classes.valueList} key={values.id}>
                  <div className={classes.valueiteam}>
                    <p>{value.valueIteam}</p>
                  </div>
                  <div className={classes.buttonDiv}>
                    <Button 
                      className={classes.remove}
                      name="remove" 
                      variant="contained"
                      color="secondary"
                      onClick={() => removeValue(value.id)}
                      >
                      &times;
                    </Button>
                  </div> 
                </Card>
              )
            }) : null}
          </div>
          <div style={{margin: '3%'}}>
          {submitStatus === true ? 
            <div>
              <ThemeProvider theme={theme}>
                  <Popup 
                      trigger={
                          <Button 
                          variant="contained" 
                          color="primary" 
                          style={{margin: '3%'}}
                          >
                          Submit
                          </Button>
                      }
                  modal 
                  closeOnDocumentClick={false} 
                  style={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                      {close => {
                      return (
                      <ValuesPopup addValue={addValue} values={values} resetValues={resetValues} removeValue={removeValue} close={close}/>
                      )
                      }}
                  </Popup>
              </ThemeProvider>
            </div>  
            : errorText}
          </div>
        </ThemeProvider>
      </Card>    
    </div>
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
})(ValueFiled);

export default Values;
