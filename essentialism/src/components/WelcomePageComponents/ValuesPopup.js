import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import { Select } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; 
import ValuesPopupForm from '../WelcomePageComponents/ValuesPopupForm'
import Popup from 'reactjs-popup'

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

const useStyles = makeStyles({
  popup: {
    display: 'flex', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    flexDirection: 'column', 
    overflowY: 'auto', 
    // width: '100vw', 
    height: '85vh', 
    padding: "2%"
  },
  card: {
      borderRadius: '15px',
      width: "80%",
      padding: 40,
      paddingTop: 80,
      paddingBottom: 80,
      display: "flex",
      flexDirection: "row",
      flexWrap: 'wrap',
      justifyContent: "space-evenly",
      alignItems: "center",
      background: '#F8F8F8',
    },
    root: {
      width: '100%',
      display: 'flex', 
      flexDirection: 'row',
      padding: 20, 
    },
    valueList: {
      width: '100%',
      color: '#262626 ',
      background: '#FBFBFB ',
      padding: 6,
      margin: 10,
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    valueiteam: {
      width: '100%',
      padding: 6,
      margin: 30,
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      flexWrap: 'wrap',
    },
  projectCard: {
      borderRadius: '15px',
      width: "50%",
      marginTop: '2%',
      minWidth: '100px',
      padding: '10px 50px',
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexDirection: "column",
      textAlign: 'left'
    },
  close: {
      cursor: 'pointer',
      position: 'absolute',
      display: 'block',
      padding: '2px 5px',
      lineHeight: '20px',
      right: '-10px',
      top: '-10px',
      fontSize: '24px',
      background: '#ffffff',
      borderRadius: '50%',
      border: '1px solid #cfcece'
  },
  buttonDiv: {
    // border: '2px solid green',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "flex-end",
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  mainButton: {
    borderRadius: '15px',
    width: '40%',
    margin: 10,
  },
  menuDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '60%',
    padding: 50,
  }, 
  duelMenu: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: '100%',
  },
  mainTitle: {
    color: 'white',
    background: 'black',
    width: '97.90%',
    padding: 30,
    margin: 0,
    textAlign: 'center',
  },
})



const Top3FormFiled = ({ status, values, removeValue, resetValues, close }) => {

  let [topThree, setTopThree] = useState([])

  // setTopThree(values); 
  console.log(values);

  const [submitStatus, setSubmitStatus] = useState(true)

  const [errorText, setErrorText] = useState('')

  useEffect(() => {
      if(topThree.length < 3) {
          setSubmitStatus(false)
          setErrorText("Must have at least 3 projects.")
      } else if(topThree.length > 3) {
          setSubmitStatus(false)
          setErrorText("No more than 3 projects.")
      } else {
          setSubmitStatus(true)
      }
      console.log(topThree);
  }, [topThree.length])

  const addValue = (value) => {
    setTopThree([...topThree, value])
  }

  const classes = useStyles()

  return (
      <div className={classes.popup}>
          <button className={classes.close} style={{ zIndex: '000' }} onClick={close}>&times;</button>
          <h3 className={classes.mainTitle}>2. Now select your top 3 favorite values from the 5 you choes previously</h3>
          <Card className={classes.card}>
              <h1>Your top 5 values:</h1> 
              <ValuesPopupForm addValue={addValue} topThree={topThree} resetValues={resetValues}/>

              {topThree && topThree.map(topThree => {
                return (
                  <Card className={classes.valueList} key={topThree.id}>
                  <div className={classes.Top3valueIteam}>
                    <p>{topThree.Top3valueIteam}</p>
                  </div>
                  <div className={classes.buttonDiv}>
                    <Button 
                      className={classes.remove}
                      name="remove" 
                      variant="contained"
                      color="secondary"
                      onClick={() => removeValue(topThree.id)}
                      >
                      &times;
                    </Button>
                  </div> 
                </Card>
                )
              })}
          </Card>

          <h1>Your top 3 values:</h1>   
      </div>
  )
}

const ValueForm = withFormik({
  
  mapPropsToValues({Top3valueIteam}) {
    return {
      Top3valueIteam: Top3valueIteam || "", 
    };
  },

  validationSchema: Yup.object().shape({
    Top3valueIteam: Yup
    .string()
    .required(),
  }),

  handleSubmit(values, { resetForm, setStatus, setSubmitting }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        setStatus(response.data);
        resetForm();
        setSubmitting(false)
      })
      .catch(err => {
        console.log('Error', err.response);
        setSubmitting(false)
      });
  }
})(Top3FormFiled);

export default ValueForm