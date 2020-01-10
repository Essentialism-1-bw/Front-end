import React, {useState, useEffect} from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; 

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

// ========================================== //
// -------------- Styling End --------------- //

const FormFiled = ({ status, dataValues, addValue, resetValues }) => {

  const classes = useStyles();
  const [formValues, setFormValues] = useState([])

  const [currentValue, setCurrentValue] = useState("")

  useEffect(() => {

    if(status) {
      addValue(status)
    }
    if(dataValues) setFormValues(dataValues)
  }, [status, addValue, dataValues])

  const handleChangeValue = (e) => {
    setCurrentValue(e.target.value)
  }
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
            Data Value Iteam
          </InputLabel>
          <FormControl>
          <Select type="valueIteam" name="valueIteam" onChange={e => handleChangeValue(e)}> 
            {formValues !== undefined ? formValues.map(valueList => {
              return (
                <MenuItem 
                id={valueList.id} 
                value={valueList}
                >
                {valueList.name}
              </MenuItem>
              )
            }): null} 
          </Select>
          </FormControl>
          </div>
          
          <div className={classes.buttonDiv}>
            <Button 
              className={classes.mainButton}
              type="submit" 
              name="submit" 
              variant="contained"
              color="primary"
              onClick={() => addValue(currentValue)}
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
    console.log(values)
    // axios
    //   .post("https://reqres.in/api/users", dataValues)
    //   .then(response => {
    //     setStatus(response.data);
    //     console.log(dataValues)
    //     resetForm();
    //     setSubmitting(false)
    //   })
    //   .catch(err => {
    //     console.log('Error', err.response);
    //     setSubmitting(false)
    //   });
  }
})(FormFiled);

export default ValueForm;
