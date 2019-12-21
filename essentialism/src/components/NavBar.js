import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#7932FF"
        }
    }
})

const useStyles = makeStyles({
    nav: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '99.3%',
        alignItems: 'center',
        // backgroundColor: 'rgba(128, 128, 128, 0.7)'
        backgroundColor: 'black',
        padding: 10,
        position: 'sticky',
        top: 0,
    },
    leftCont: {
        display: 'flex',
        width: '50%'
    },
    logo: {
        width: 50,
        height: 50,
    },
    mainTitle: {
        color: 'white',
        marginLeft: '10%'
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center'
    }
})

const NavBar = () => {
    const classes = useStyles();
    return (
        <nav className={classes.nav}>
            <div className={classes.leftCont}>
                <Link className={classes.link} to="/">
                    <img className={classes.logo} src={require("../logo.png")} alt="logo"/>
                </Link>
                <Link className={classes.link} to="/">
                    <h1 className={classes.mainTitle}>Essentialism</h1>
                </Link>
            </div>
            <Link className={classes.link} to="/">Home</Link>
            <Link className={classes.link} to="/login">Sign In</Link>
            <Link className={classes.link} to="/dashboard">
                <ThemeProvider theme={theme}>
                    <Button className={classes.link} style={{borderRadius: '15px', height: '35px'}} variant="contained" color="primary">Dashboard</Button>
                </ThemeProvider>
            </Link>
        </nav>
    )
}

export default NavBar