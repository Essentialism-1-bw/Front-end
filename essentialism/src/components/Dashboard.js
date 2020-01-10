import React, { useEffect, useState } from 'react'
import Projects from './DashboardComponents/Projects'

import { makeStyles } from '@material-ui/core/styles';
import { axiosWithAuth } from '../Authentication/axiosWithAuth'

const useStyles = makeStyles({
    mainTitle: {
        color: 'white',
        fontSize: '3rem',
        marginTop: '10vh'
    },
    banner: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',

    },
})

const Dashboard = () => {
    const classes = useStyles();
    const [user, setUser] = useState({})
    useEffect(() => {
        const user_id = localStorage.getItem('user_id')
        axiosWithAuth().get(`/api/users/${user_id}`)
            .then(res => setUser(res.data))
    },[])
   let name = user.firstName;
    return (
        <div>
            <div style={{ height: '100vh' }}>
                <div className="BannerBG2">
                    <div className={classes.banner}>
                        <h1 className={classes.mainTitle}>Hello {name}</h1>
                    </div>
                </div>
            </div>
            <div>
                <Projects/>
            </div>
        </div>
    )
}

export default Dashboard