import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';

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
        // axios.get('https://bw-essentialism.herokuapp.com/api/users/1/values')
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
        axios.get('./dummyData/dummyValues.json')
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