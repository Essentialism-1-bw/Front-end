import React, { useState, useEffect } from 'react'

import Values from './Values';
import Reasons from './Reasons';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import EditProjectsPopup from './EditProjectsPopup'

import Popup from 'reactjs-popup'

import { axiosWithAuth } from '../../Authentication/axiosWithAuth'
 
const useStyles = makeStyles({
    project: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '5%',
        justifyContent: 'center'
    },
    projectData: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '60vw',
        padding: 30,
        marginTop: '4%'
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
        backgroundColor: '#333131',
        width: '100vw',
        color: 'white'
    },
    button: {
        padding: '.2rem 1.6rem',
        borderRadius: '1rem'
    },

})

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const classes = useStyles();
    const user_id = localStorage.getItem("user_id")
    useEffect(() => {
        axiosWithAuth().get(`/api/users/${user_id}/projects`)
            .then(res => setProjects(res.data))
            .catch(err => console.log(err))
    }, [user_id])

    const deleteProject = (id) => {
       let newProjects =  projects.filter(project => project.id !== id)
       setProjects(newProjects)
       axiosWithAuth().delete(`/api/users/${user_id}/projects/${id}`)
    }
    return (
        <div>
            {projects.map(project => {
                return <div key={project.id} className={classes.project}>
                            <div className={classes.projectTitle}>
                                <h1>{project.name}</h1>
                            </div>
                            <Card className={classes.projectData}>
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
                            </Card>
                        </div>
            })}
        </div>
    )
}

export default Projects