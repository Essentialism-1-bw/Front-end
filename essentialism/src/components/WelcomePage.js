import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Values from './WelcomePageComponents/Values'
import TopThree from './WelcomePageComponents/TopThree'
import Description from './WelcomePageComponents/Description'

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
        justifyContent: 'center',
        width: '96.15%',
        alignItems: 'center',
        backgroundColor: '#1D1D1D',
        padding: 50,
        paddingTop: 200, 
        paddingBottom: 200, 
    },
    valuesection: {
        paddingTop: 200, 
        paddingBottom: 200,
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '90%',
        alignItems: 'center',
        padding: 100,
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
    }
})


const WelcomePage = (props) => {

    const classes = useStyles();

    return (
        <div className="BannerBG3">
            <div className={classes.banner}>
                <div className={classes.centerCont}>
                    <h1 className={classes.mainTitle}>Hello John Doe</h1>
                    <p className={classes.body}>Regain control of your own choices about where to spend your time and energy instead of giving others implicit permission to choose for you.</p>
                    {/* <GetStarted /> */}
                </div>
            </div>
            <div className={classes.reactApp}>
                <div className={classes.section1}>
                    <div>
                    <h1 className={classes.mainTitle}>Welcome to The Essentialism App that allows you to list your project priorities according to your values.</h1>
                    <br/>
                    </div>
                    <h2 className={classes.mainTitle}>The first step is to select your 5 favorite values</h2>
                </div>
                <div className={classes.valuesection}>
                    <Values />
                </div>
                <div className={classes.section1}>
                    <h2 className={classes.mainTitle}>Now select your top 3 choices</h2>
                </div>
                <div className={classes.section3}>
                    <TopThree />
                </div>
                <div className={classes.section2}>
                    <h2 className={classes.mainTitle}>Add your value description</h2>
                </div>
                <div className={classes.valuesection}>
                    <Description />
                </div>
            </div>
            
        </div>
    )
}

export default WelcomePage