import React, {useState, useEffect} from "react";
import Values from './Values'
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
          main: "#7932FF",
          color: 'white'
      },
      secondary: {
        main: "#E33D3D"
    }
  }
})

const useStyles = makeStyles(theme => ({

  card: {
    borderRadius: '15px',
    width: "45%",
    padding: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: 'left', 
    background: '#F8F8F8',
  },
  root: {
    // border: '2px solid red',
    width: '100%',
    display: 'flex', 
    flexDirection: 'row',
    padding: 20, 
  },
  valueCard: {
    width: '70%',
  },
  valueiteam: {
    marginLeft: 40,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexFlow: 'wrap',
  },
  duelMenu: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: 500,
  },
  menuDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // border: '2px solid red',
    width: '60%',
    paddingLeft: 80,
  }, 
  buttonDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  mainButton: {
    // marginTop: 30,
    borderRadius: '15px',
    width: '50%',
    height: '40%',
    margin: 10,
  },
  link: {
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '1rem',
    color: 'gray',
  },
  linkCard: {
    color: '#262626 ',
    background: '#FBFBFB ',
    padding: 10,
    paddingRight: 50,
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20, 
  },
  addremove: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  add: {
    padding: 20,
    paddingTop: 5,
    paddingBottom: 10,
    background: '#F1F1F1 ',
    margin: 15,
    color: 'black', 
    fontSize: '1rem', 
    textAlign: 'center',
  },
  remove: {
    padding: 20,
    paddingTop: 5,
    paddingBottom: 10,
    background: '#F1F1F1 ',
    margin: 15,
    color: 'black', 
    fontSize: '0.8rem', 
    textAlign: 'center',
  },

}));

function ValueList({value, removeValue}){

  const classes = useStyles();

  return (
    <div className={classes.valueCard}>    
    <div>
      {value.map(valueList => (
      <div key={valueList.id}>
          <Card className={classes.linkCard}>
            <div className={classes.valueiteam}>
              <h2>{valueList.valueIteam}</h2>
            </div>
            <div className={classes.addremove}>
            <ThemeProvider theme={theme}>
            <Button 
              className={classes.add}
              type="submit" 
              name="add" 
              variant="contained"
              color="primary"
              
            >
              +
            </Button>
            <Button 
              className={classes.remove}
              type="submit" 
              name="remove" 
              variant="contained"
              color="primary"
              onClick={() => removeValue(valueList.id) }
            >
              x
            </Button>
            </ThemeProvider>
            </div>
          </Card>
      </div>
      ))}
    </div>
  </div>
  )
  }

  export default ValueList;