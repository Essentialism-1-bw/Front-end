import React from 'react'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Values from './WelcomePageComponents/Values/CallFromDummydata/Values'
import Description from './WelcomePageComponents/Description'
import ProjectsPopup from './WelcomePageComponents/Projects/ProjectsPopup'
import Popup from 'reactjs-popup'

const useStyles = makeStyles({
    banner: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    centerCont: {
        color: 'white',
        width: '100%',
        fontSize: '3rem',
    },
    section1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '99.3%',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10,
    },
    section2: {
        display: 'flex',
        justifyContent: 'center',
        width: '99.3%',
        alignItems: 'center',
        backgroundColor: '#1A5B5C',
        padding: 10,
    },
    section3: {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'center',
        width: '99.3%',
        alignItems: 'center',
        backgroundColor: '#1D1D1D',
        padding: 10,
    },
    valuesection: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center',
    },
    mainTitle: {
        color: 'white',
    },
    body: {
        marginLeft: '10%',
        marginRight: '10%',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontWeight: 1000,
        display: 'flex',
        alignItems: 'center',
    }, 
    boxD: {
        padding: 300,
    }
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7932FF"
    },
    secondary: {
      main: "#E33D3D"
    }
  }
});


const WelcomePage = (props) => {

    const classes = useStyles();

    return (
        <div >
            <div className="BannerBG5">
                <div className={classes.banner}>
                    <div className={classes.centerCont}>
                        <h1 className={classes.mainTitle}>Hello John Doe</h1>
                        <p className={classes.body}>Regain control of your own choices about where to spend your time and energy instead of giving others implicit permission to choose for you.</p>
                    </div>
                </div>
            </div>
            <div className={classes.reactApp}>
                <div className={classes.section1}>
                    <div>
                    <h1 className={classes.mainTitle}>Welcome to The Essentialism App that allows you to list your project priorities according to your values.</h1>
                    <br/>
                    </div>
                </div>
                <div className={classes.valuesection}>
                    <Values />
                </div>
                <div className={classes.section2}>
                    <h2 className={classes.mainTitle}>Add your value description</h2>
                </div>
                <div className={classes.boxD}>
                    <Description />
                </div>
                <div className={classes.section3} >
                <h2 className={classes.mainTitle}>NOW CLICK </h2>
                    <ThemeProvider theme={theme}>
                        <Popup 
                            trigger={
                                <Button 
                                variant="contained" 
                                color="primary" 
                                style={{margin: '3%'}}
                                >
                                Next
                                </Button>
                            }
                        modal 
                        closeOnDocumentClick={false} 
                        style={{ width: '90vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {close => {
                            return <ProjectsPopup close={close}/>
                            }}
                            
                        </Popup>
                    </ThemeProvider>
                </div>
            </div>
            
        </div>
  );
};

export default WelcomePage;
