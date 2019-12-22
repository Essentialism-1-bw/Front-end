import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField } from 'formik-material-ui';
import { Select } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider, withTheme } from '@material-ui/core/styles'; 
import ProjectsPopup from "./ProjectsPopup";


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
  });

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#7932FF"
        }
    }
})



const AddProjectsForm = ({ status, addProject }) => {

    const classes = useStyles();

    useEffect(() => {
        if(status) {
            addProject(status)
        }
    }, [status, addProject])
    return (
        <Form>
            <ThemeProvider theme={theme}>
                <div className={classes.input}>
                    <Field type="text" color="primary" name="name" label="Project Name" component={TextField} InputLabelProps={{ shrink: true }} fullWidth
                    className={classes.singleField}/>
                </div>
                <div className={classes.buttonDiv}>
                    <Button className={classes.signin} type="submit" variant="contained" color="primary">Add Project</Button>
                </div>
            </ThemeProvider>
        </Form>
    )
}

const FormikSignInForm = withFormik({
    mapPropsToValues({ name }) {
        return {
            name: name || "",
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required()
    }),
    handleSubmit(values, { resetForm, setStatus, setSubmitting }) {
        axios
            .post("https://reqres.in/api/users", values)
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
})(AddProjectsForm)

export default FormikSignInForm