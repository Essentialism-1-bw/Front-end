import React from 'react'
import SignInForm from './SignInForm'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    banner: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(128, 128, 128, 0.1)'
    },
    leftCont: {
        display: 'flex',
        width: '50%',
        fontSize: '3rem',
    },
    logo: {
        width: 110,
        height: 110,
    },
    mainTitle: {
        color: 'white',
        marginLeft: '10%',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontWeight: 1000,
        display: 'flex',
        alignItems: 'center',
    }
})

const SignIn = () => {

    const classes = useStyles();

    return (
        <div className="BannerBG2">
        <div className={classes.banner}>
            <div className={classes.box1}>
                <div className={classes.leftCont}>
                    <Link className={classes.link} to="/">
                        <img className={classes.logo} src={require('../img/logo.png')} alt="logo"/>
                    </Link>
                    <Link className={classes.link} to="/">
                        <h1 className={classes.mainTitle}>Essentialism</h1>
                    </Link>
                </div>
            </div>
            <div className={classes.box2}>
                <SignInForm/>
            </div> 
        </div>
        </div> 
    )
}

export default SignIn