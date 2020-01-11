import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField } from 'formik-material-ui';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; 
import { axiosWithAuth } from "../../Authentication/axiosWithAuth";

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
  box: {
    width: "100%",
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    background: "white",
    width: '50%',
    padding: 28,
  },

  infoForm: {
    width: '50%',
    padding: 20,
  },

  sumbitButton: {
    borderRadius: '15px',
    width: '100%',
  },
  singleField: {
    marginRight: theme.spacing(1),
    width: '100%',
    marginTop: theme.spacing(2),
  },
  buttonDiv: {
    width: '50%',
    marginTop: 130,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center'
},
  mainText: {
    fontSize: '1.5rem',
    textAlign: 'left',
  },
  descriptionCard: {
    textAlign: 'left',
    marginRight: 500,
    marginLeft: 500,
    padding: 100,
  },

}));

function FormFiled({ touched, status }) {

  const [valueDescription, setValueDescription] = useState({});

  const [submitStatus, setSubmitStatus] = useState(true);

    useEffect(() =>{
      if(Object.entries(valueDescription).length === 0) setSubmitStatus(false)
      else setSubmitStatus(true)
      const user_id = localStorage.getItem("user_id")
      axiosWithAuth().get(`/api/users/${user_id}/reasons`)
        .then(res => setValueDescription(res.data))
        if (status) {
            axiosWithAuth().post(`/api/users/${user_id}/reasons`, {
              reason: status.paragraph
            })
              .then(res => setValueDescription(res.data))
        }
    }, [status, valueDescription]);

    const classes = useStyles();

  return (
    <div className={classes.card}>

        <Form className={classes.box}>
        <ThemeProvider theme={theme}>

        <div className={classes.info}>
          <div className={classes.mainText}>
            <p>In a few sentences, describe why the selected values are important to you. Focus on thoughts and feelings, don’t worry about spelling or grammar.</p>
          </div>
          <div className={classes.buttonDiv}>
            <Button 
              className={classes.sumbitButton}
              type="submit" 
              name="submit" 
              variant="contained"
              color="secondary"
              disabled={submitStatus}
            >
              Submit Value Description
            </Button>
          </div>
        </div>

        <div className={classes.infoForm}>
          <Field 
            type="title" 
            name="title" 
            component={TextField}
            color="primary"
            placeholder = 'Title'
            className={classes.singleField}
          />
            {touched.email}
          <br/>
          <Field 
            type="paragraph" 
            name="paragraph" 
            color="primary"
            component={TextField}
            multiline
            rows="10"
            placeholder = "My Value Responce"
            variant="outlined"
            className={classes.singleField}
            InputLabelProps={{
              shrink: true,
            }}
          />
            {touched.email}
        </div>       
        </ThemeProvider>
      </Form>

      <Card
          className={classes.valueCard}
        >    
          <div className={classes.valueiteam}>
            <div key={valueDescription.id}>
                <Card className={classes.descriptionCard}>
                  <h2 className={classes.valueiteam}> Your Value Description:</h2>
                  <p className={classes.valueiteam}> {valueDescription.reason}</p>
                  <br/> 
                </Card>  
            </div>
          </div>
        </Card>
    </div>
  ); 
}

const Description = withFormik({
  mapPropsToValues({title, paragraph}) {
    return {
      title: title || "", 
      paragraph: paragraph || "", 
    };
  },

  validationSchema: Yup.object().shape({
    title: Yup
    .string()
    .required("Please enter a Title"),
    paragraph: Yup
    .string()
    .required("Please enter a Description"),
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

export default Description;
