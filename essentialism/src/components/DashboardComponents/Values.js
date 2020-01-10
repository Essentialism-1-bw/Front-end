import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';


import { axiosWithAuth } from '../../Authentication/axiosWithAuth'

const useStyles = makeStyles({
    value: {
        padding: '1rem 1.5rem',
        margin: '1rem 0',
        backgroundColor: '#7932FF',
        color: 'white'
    }
})

const Values = () => {
    const [values, setValues] = useState([])

    const classes = useStyles();

    useEffect(() => {
        const user_id = localStorage.getItem("user_id")
        axiosWithAuth().get(`/api/users/${user_id}/values`)
            .then(res => setValues(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            {values.map(value => {
                return <div key={value.value_id} className={classes.value}>
                    <h2>{value.value_name}</h2>
                </div>
            })}
        </div>
    )

}

export default Values