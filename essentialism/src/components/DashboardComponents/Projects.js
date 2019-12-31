import React, { useState, useEffect } from 'react'

import axios from 'axios'
import Values from './Values';
import Reasons from './Reasons';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('./dummyData/dummyProjects.json')
            .then(res => setProjects(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            {projects.map(project => {
                return <div key={project.id}>
                    <h2>{project.name}</h2>
                    <div style={{ border: '2px solid red' }}>
                        <Values/>
                    </div>
                    <Reasons/>
                </div>
            })}
        </div>
    )
}

export default Projects