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
    // border: '2px solid green',
    width: '100%',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  card: {
    width: "100%",
    padding: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: 'left', 
    background: '#F8F8F8',
  },
  root: {
    width: '100%',
    display: 'flex', 
    flexDirection: 'row',
    padding: 20, 
  },
  duelMenu: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: '100%',
  },
  menuDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '60%',
    padding: 50,
  }, 
  buttonDiv: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '40%',
    padding: 10,
  },
  mainButton: {
    borderRadius: '15px',
    width: '40%',
    margin: 10,
  },
  top3: {
    width: '100%',
    background: 'black', 
    color: 'white',
  }, 
  top3Card: {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 100,
    background: '#1D1D1D',
  }

}));

const FormFiled = ({ status, addValue, resetValues }) => {

  const classes = useStyles();

    
  useEffect(() => {
    if(status) {
      addValue(status)
    }
  }, [status, addValue])


  return (
    <div className={classes.mainroot}>
      <Card className={classes.card}>
          <h3>Add your top 5 Values</h3>
          <br/>
          <br/>
          <br/>

          <Form className={classes.root}>
          <ThemeProvider theme={theme}>
          <div className={classes.menuDiv}>
          <InputLabel shrink id="valueIteam">
            Value Iteam
          </InputLabel>
          <Field 
            type="valueIteam" 
            name="valueIteam" 
            placeholder="Value" 
            color="primary"
            component={Select}
            className={classes.duelMenu}
          >
              <MenuItem value="" disabled>Choose a value</MenuItem>
              <MenuItem id={'value-1'} value={'Athletic ability'}>Athletic ability</MenuItem>
              <MenuItem id={'value-2'} value={'Art and literature'}>Art and literature</MenuItem>
              <MenuItem id={'value-3'} value={'Creativity'}>Creativity</MenuItem>
              <MenuItem id={'value-4'} value={'Discovering'}>Discovering</MenuItem>
              <MenuItem id={'value-5'} value={'Inventing'}>Inventing</MenuItem>
              <MenuItem id={'value-6'} value={'Independence'}>Independence</MenuItem>
              <MenuItem id={'value-7'} value={'Kindness and generosity'}>Kindness and generosity</MenuItem>
              <MenuItem id={'value-8'} value={'Living in the moment'}>Living in the moment</MenuItem>
              <MenuItem id={'value-9'} value={'Membership in a social group'}>Membership in a social group</MenuItem>
              <MenuItem id={'value-10'} value={'Music'}>Music</MenuItem>
              <MenuItem id={'value-11'} value={'My community'}>My community </MenuItem>
              <MenuItem id={'value-12'} value={'My moral principles'}>My moral principles</MenuItem>
              <MenuItem id={'value-13'} value={'Nature and the environment'}>Nature and the environment</MenuItem>
              <MenuItem id={'value-14'} value={'Relationships with friends and family'}>Relationships with friends and family</MenuItem>
              <MenuItem id={'value-15'} value={'Sense of humor'}>Sense of humor</MenuItem>
              <MenuItem id={'value-16'} value={'Success in my career'}>Success in my career</MenuItem>
          </Field>
          <br/>
          <br/>
          <br/>
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
          
          <br/>
          <br/>
        </Form>
      </Card>
    </div>
  ) 
}


const ValueForm = withFormik({
  
  mapPropsToValues({valueIteam}) {
    return {
      valueIteam: valueIteam || "", 
    };
  },

  validationSchema: Yup.object().shape({
    valueIteam: Yup
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
})(FormFiled);

export default ValueForm;
