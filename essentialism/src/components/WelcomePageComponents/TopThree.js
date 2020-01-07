import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; 

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
    width: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: 'center', 
    justifyContent: "center",
    alignItems: "center",
    background: '#1D1D1D',
  },

  mainButton: {
    borderRadius: '15px',
    width: '100%',
  },

  top3card: {
    width: '90%',
    padding: 50,
    fontSize: '2rem',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonDiv: {
    width: '70%',
    padding: 50,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  itembox: {
    width: '100%',
    padding: 10,
    display: 'flex', 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    // border: '2px solid red'
  },
  item: {
    width: '100%',
    padding: 10,
    margin: 10,
    // background: 'lightgray',
  },
  valueitem: {
    width: '100%',
    border: '2px solid geen'
  }
}));

function TopThree({values, top3Value, resetValues}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.top3card}>
        <h2>Your top 3 values:</h2>

        <div className={classes.itembox}>
          {values.map(valueList => (
          <div key={valueList.id}>
              <Card className={classes.item}>
                <div className={classes.valueitem}>
                  <p>{valueList.valueIteam}</p>
                </div>
              </Card>
          </div>
          ))}
        </div>

        {/* <div>
          {top3Value.map(topValueList => (
          <div key={topValueList.id}>
              <Card className={classes.linkCard}>
                <div className={classes.valueiteam}>
                  <h2>{topValueList.valueIteam}</h2>
                </div>
              </Card>
          </div>
          ))}
        </div> */}

      </div>

      <Form className={classes.buttonDiv}>
        <ThemeProvider theme={theme}>

        <div >
          <Button 
            className={classes.mainButton}
            type="reset" 
            name="submit" 
            variant="contained"
            color="secondary"
            onClick={() => resetValues()}
          >
            Reset Values
          </Button>
        </div>

        </ThemeProvider>
      </Form>
    </Card>
  ); 
}

export default TopThree;
