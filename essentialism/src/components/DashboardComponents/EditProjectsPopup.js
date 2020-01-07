import React, { useState, useEffect } from 'react'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; 
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';


import EditProjectsForm from './EditProjectsForm'

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

const useStyles = makeStyles({
    card: {
        borderRadius: '15px',
      //   marginTop: "10%",
        width: "80%",
      //   height: "50vh",
        padding: 40,
        paddingTop: 80,
        paddingBottom: 80,
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        textAlign: 'left'
      },
    projectCard: {
        borderRadius: '15px',
      //   marginTop: "10%",
        width: "50%",
        marginTop: '2%',
        minWidth: '100px',
        padding: '10px 50px',
      //   height: "50vh",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "column",
        textAlign: 'left'
      },
    close: {
        cursor: 'pointer',
        position: 'absolute',
        display: 'block',
        padding: '2px 5px',
        lineHeight: '20px',
        right: '-10px',
        top: '-10px',
        fontSize: '24px',
        background: '#ffffff',
        borderRadius: '50%',
        border: '1px solid #cfcece',
    },
    remove: {
        padding: 1,
        background: '#F1F1F1 ',
        margin: 15,
        color: 'black', 
        fontSize: '1.6rem', 
        textAlign: 'center',
        zIndex: 998,
      }
})



const ProjectsPopup = ({ close, projects, setProjects, deleteProject }) => {


    const [submitStatus, setSubmitStatus] = useState(true)

    const [errorText, setErrorText] = useState('')


    useEffect(() => {
        if(projects.length < 3) {
            setSubmitStatus(false)
            setErrorText("Must have at least 3 projects.")
        } else {
            setSubmitStatus(true)
        }
    }, [projects.length])
    const addProject = (project) => {
        setProjects([...projects, project])
    }

    const classes = useStyles()
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', overflowY: 'auto', height: '90vh', padding: "2%"  }}>
            <button className={classes.close} style={{ zIndex: '999' }} onClick={close} >&times;</button>
            <h1>Add/Delete Current Projects</h1>
            <Card className={classes.card}>
                <EditProjectsForm addProject={addProject} projects={projects}/>
            </Card>
            <ThemeProvider theme={theme}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    {console.log(projects)}
                    <h2>Current Projects:</h2>
                    {projects !== undefined ? projects.map(project => {
                        return <Card className={classes.projectCard} key={project.id}>
                                <h2>{project.name}</h2> 
                                    <Button 
                                        className={classes.remove}
                                        name="remove" 
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => deleteProject(project.id)}
                                        >
                                        &times;
                                    </Button>
                            </Card>
                    }) : null}
                </div>
                <div style={{marginTop: '3%'}}>
                    {submitStatus === true ? <Link to="/dashboard"><Button onClick={close} variant="contained" color="primary" >Submit</Button></Link> : errorText}
                </div>
            </ThemeProvider>
        </div>
    )
}

export default ProjectsPopup