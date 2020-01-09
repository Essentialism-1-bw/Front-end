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


const theme = createMuiTheme({
  palette: {
      primary: {
          main: "#7932FF"
      }
  }
})

const useStyles = makeStyles({

  input: {
      marginBottom: 20,
      paddingTop: 10,
      width: "100%"
  },
  title: {
      color: '#000',
      fontSize: '1.4rem',
      fontWeight: 700,
  },
  signup: {
      color: '#7932FF'
  },
  signin: {
      marginTop: 10,
      borderRadius: '15px'
  },
  buttonDiv: {
      display: 'flex',
      justifyContent: 'flex-end'
  },
  singleField: {
      width: 470,
    },
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
});


const AddTopThreeForm = ({ status, topThree, values, addValue, removeValue, resetValues}) => {

  // console.log(topThree);
  
  const classes = useStyles();

  useEffect(() => {
      if(status) {
        addValue(status)
      }
  }, [status, addValue])

  return (
      <Form className={classes.root}>
        <ThemeProvider theme={theme}>
        <div className={classes.menuDiv}>  
          <Field
            type="Top3valueIteam" 
            name="Top3valueIteam" 
            placeholder="Value" 
            color="primary"
            component={Select}
            className={classes.duelMenu}
          >
            {topThree.map(valueList => (
            <MenuItem 
              id={valueList.valueIteam}
              value={valueList.valueIteam}
            >
              {valueList.valueIteam}
            </MenuItem>
            ))}
          </Field>
        </div>  

        <div className={classes.buttonDiv}>
          <Button 
            className={classes.mainButton}
            type="submit" 
            name="submit" 
            variant="contained"
            color="primary"
          >
            Add Values
          </Button>

          <Button 
            className={classes.mainButton}
            type="reset" 
            name="submit" 
            variant="contained"
            color="secondary"
            onClick={() => resetValues()}
          >
            Remove All
          </Button>
        </div>
        </ThemeProvider>
      </Form>
  )
}

const TopThreeForm = withFormik({
  mapPropsToValues({ valueIteam }) {
      return {
        valueIteam: valueIteam || "",
      }
  },
  validationSchema: Yup.object().shape({
    valueIteam: Yup
      .string()
      .required()
  }),
  handleSubmit(topThree, { resetForm, setStatus, setSubmitting }) {
      axios
          .post("https://reqres.in/api/users", topThree)
          .then(res => {
              setStatus(res.data)
              resetForm();
              setSubmitting(false)
          })
          .catch(err => {
              console.log(err)
              setSubmitting(false)
          })
  }
})(AddTopThreeForm)

export default TopThreeForm