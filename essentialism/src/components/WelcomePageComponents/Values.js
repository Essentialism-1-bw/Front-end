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
import ValuesList from './ValuesList'

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

function FormFiled({ touched, status }) {

  const [value, setValue] = useState([]); 

    useEffect(() => {
        if (status) {
            setValue([...value, status])
        }
    }, [status]);

    const classes = useStyles();

  return (
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
          {touched.valueIteam}
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
            Add Value
          </Button>

          <Button 
            className={classes.mainButton}
            type="reset" 
            name="submit" 
            variant="contained"
            color="secondary"
          >
            Remove All
          </Button>
        </div>
        </ThemeProvider>
        
        <br/>
        <br/>
      </Form>

      <ValuesList value = {value}/>

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
