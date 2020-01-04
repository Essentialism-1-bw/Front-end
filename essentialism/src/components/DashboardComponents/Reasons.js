import React, { useState, useEffect } from 'react'

import axios from 'axios'

const Reasons = () => {
    const [ reasons, setReasons ] = useState([])

    useEffect(() => {
        axios.get('./dummyData/dummyReasons.json')
            .then(res => setReasons(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            {reasons.map(reason => {
                return <div key={reason.id}>
                    <p>{reason.reason}</p>
                </div>
            })}
        </div>
    )
}

export default Reasons