import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
    card: {
      width: "30%",
      padding: 25,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    input: {
        marginBottom: 20,
        width: "100%"
    },
    title: {
        marginBottom: 20,
        color: '#001763',
        fontWeight: 700,
    },
    error: {
        color: "red",
    }
  });


const SignInForm = ({ values, errors, touched, status }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Form>
                <div className={classes.input}>
                    <Field type="text" name="username" placeholder="Username" component={TextField}/>
                </div>
                <div className={classes.input}>
                    <Field type="password" name="password" placeholder="Password" component={TextField} />
                </div>
                <button type="submit">Sign In</button>
            </Form>
        </Card>
    )
}

const FormikSignInForm = withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || "",
            password: password || "",
        }
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .min(8, "Username must be at least 8 characters long")
            .required(),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
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
})(SignInForm)

export default FormikSignInForm