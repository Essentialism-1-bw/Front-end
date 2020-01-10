import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider, withTheme } from '@material-ui/core/styles'; 
import DataValueForm from './DataValueForm'
import ValuesPopup from '../ValuesPopup'
import Popup from 'reactjs-popup'

// ------------- Styling Start -------------- //
// ========================================== //

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

// ========================================== //
// -------------- Styling End --------------- //



const ValueFiled = (props) => {

// -------------- Varable declaration useEffect & Axios call to backend Start --------------- //

  const [dataValues, setDataValues] = useState(); 

  const [submitStatus, setSubmitStatus] = useState(true)

  const [errorText, setErrorText] = useState('')
 
  // --------- Functionalities for database values [Active] ------//
  // Axios useEffect and validation useEffect combined into 1 

  // useEffect(() => {
  //   axios
  //   .get(`https://bw-essentialism.herokuapp.com/api/values/`)
  //   .then(response => {
  //     setDataValues(response.data)
  //   })
  //   .catch(error => console.log(`Error: ${error}`)); 
  // }, []);

  // useEffect(() => {
  //   if(dataValues.length < 5) {
  //       setSubmitStatus(false)
  //       setErrorText("Must have at least 5 values.")
  //   } else if(dataValues.length > 5) {
  //       setSubmitStatus(false)
  //       setErrorText("No more than 5 values.")
  //   } else {
  //       setSubmitStatus(true)
  //   }
  // }, [dataValues.length])

  useEffect(() => {
    // Axios call to backend data 
    axios
    .get(`https://bw-essentialism.herokuapp.com/api/values/`)
    .then(response => {
      setDataValues(response.data)
    })
    .catch(error => console.log(`Error: ${error}`)); 

    // Data validation maximum 5 values
    if(dataValues.length < 5) {
      setSubmitStatus(false)
      setErrorText("Must have at least 5 values.")
    } else if(dataValues.length > 5) {
      setSubmitStatus(false)
      setErrorText("No more than 5 values.")
    } else {
      setSubmitStatus(true)
    } 
  }, [dataValues.length]);

// -------------- Varable declaration useEffect & Axios call to backend End --------------- //


// -------------- Add Remove Reset Functions Start --------------- //

  const addValue = (value) => {
    setDataValues([...dataValues, value])
  }

  const resetValues = () => {
    setDataValues([])
  }

  const removeValue = (id) => {
    let newValues = dataValues.filter(value => {
      return value.id !== id;
    })
    setDataValues(newValues)
  }

  // -------------- Add Remove Reset Functions End --------------- //

  const classes = useStyles();

  return (
    <div className={classes.mainroot}>
      <h2 className={classes.mainTitle}>The first step is to select your 5 favorite values</h2>
      <Card className={classes.card}>
        <DataValueForm 
          dataValues = {dataValues}
          addValue = {addValue}
          resetValues = {resetValues}
        />

        <ThemeProvider theme={theme}>
          <div>
            {dataValues !== undefined ? dataValues.map(value => {
              return (
                <Card className={classes.valueList} key={dataValues.id}>
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
                      <ValuesPopup dataValues={dataValues} addValue={addValue} resetValues={resetValues} removeValue={removeValue} close={close}/>
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
  
  mapPropsToValues({valueIteam}) {
    return {
      valueIteam: valueIteam || "", 
    };
  },

  validationSchema: Yup.object().shape({
    valueIteam: Yup
    .string()
    .required("Please select a value"),
  }),

  handleSubmit(dataValues, {setStatus, resetForm}) {
    axios
      .post("https://reqres.in/api/users", dataValues)
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
