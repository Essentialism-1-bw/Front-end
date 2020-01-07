import React, { useState, useEffect } from 'react'

import axios from 'axios'
import Values from './Values';
import Reasons from './Reasons';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import EditProjectsPopup from './EditProjectsPopup'

import Popup from 'reactjs-popup'

const useStyles = makeStyles({
    project: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '5% 0',
        justifyContent: 'space-between'
    },
    projectData: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '60vw'
    },
    values: {
        display: 'flex',
        flexDirection: 'column'
    },
    buttons: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    projectTitle: {
        backgroundColor: '#a9a9a9',
        width: '100vw',
        color: 'white'
    },
    button: {
        padding: '.2rem 1.6rem',
        borderRadius: '1rem'
    }
})

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        axios.get('./dummyData/dummyProjects.json')
            .then(res => setProjects(res.data))
            .catch(err => console.log(err))
    }, [])

    const deleteProject = (id) => {
       let newProjects =  projects.filter(project => project.id !== id)
       setProjects(newProjects)
    }
    return (
        <div>
            {projects.map(project => {
                return <div key={project.id} className={classes.project}>
                            <div className={classes.projectTitle}>
                                <h2>{project.name}</h2>
                            </div>
                            <div className={classes.projectData}>
                                <div className={classes.values}>
                                    <Values/>
                                    <div className={classes.buttons}>
                                        <Popup 
                                        trigger={
                                                <Button className={classes.button} variant="contained" color="primary">Edit</Button>
                                                }
                                        modal 
                                        closeOnDocumentClick={false}
                                        style={{ width: '90vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {close => {
                                            return <EditProjectsPopup projects={projects} setProjects={setProjects} deleteProject={deleteProject} close={close}/>
                                            }}
                                            
                                        </Popup>
                                        
                                        <Button onClick={() => deleteProject(project.id)} className={classes.button} variant="contained" color="secondary">Delete</Button>
                                    </div>
                                </div>
                                <Reasons/>
                            </div>
                        </div>
            })}
        </div>
    )
}

export default Projects