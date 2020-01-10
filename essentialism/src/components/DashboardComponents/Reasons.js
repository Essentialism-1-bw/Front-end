import React, { useState, useEffect } from 'react'


import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles'; 
import { axiosWithAuth } from '../../Authentication/axiosWithAuth';

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
    const [ reason, setReason ] = useState({})


    useEffect(() => {
        const user_id = localStorage.getItem("user_id")
        axiosWithAuth().get(`/api/users/${user_id}/reasons`)
            .then(res => setReason(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <Card className={classes.card} key={reason.id}>
                <p>{reason.reason}</p>
            </Card>
        </div>
    )
}

export default Reasons