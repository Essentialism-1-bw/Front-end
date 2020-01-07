import React, { useState, useEffect } from 'react'

import axios from 'axios'

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles'; 

const useStyles = makeStyles({
    card: {
        width: '25vw',
        height: '30vh',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const Reasons = () => {
    const classes = useStyles()
    const [ reasons, setReasons ] = useState([])

    useEffect(() => {
        axios.get('./dummyData/dummyReasons.json')
            .then(res => setReasons(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            {reasons.map(reason => {
                return <Card className={classes.card} key={reason.id}>
                    <p>{reason.reason}</p>
                </Card>
            })}
        </div>
    )
}

export default Reasons