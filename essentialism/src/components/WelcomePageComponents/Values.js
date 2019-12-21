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
    width: "60%",
    padding: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: 'left', 
    background: '#F8F8F8',
  },
  valueCard: {
    background: "white",
    width: '70%',
  },
  valueiteam: {
    padding: 10,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexFlow: 'wrap',
  },
  mainButton: {
    marginTop: 30,
    borderRadius: '15px',
    width: '100%',
  },
  singleMenu: {
    width: 470,
  },
  duelMenu: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    width: 500,
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 700,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  linkCard: {
    color: '#ffffff',
    backgroundColor: '#7932FF',
    margin: 5,
  }

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
        <h3>Your top 5 Values</h3>
        <br/>
        <br/>
        <br/>

        <Card
          className={classes.valueCard}
        >    
          <div className={classes.valueiteam}>
            {value.map(valueList => (
            <div key={valueList.id}>
              <Link className={classes.link} to="/valueIteam:{id}">
                <Card className={classes.linkCard}>
                  <h2 className={classes.valueiteam}>{valueList.valueIteam}</h2>
                  <br/> 
                </Card>
              </Link>  
            </div>
            ))}
          </div>
        </Card>
        <br/>
        <br/>
        <br/>

        <Form>
        <ThemeProvider theme={theme}>
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
