import React from 'react'
import Projects from './DashboardComponents/Projects'

const Dashboard = () => {
   let name = "Dustin";
    return (
        <div>
            <div style={{ height: '100vh' }}>
                <div>
                    <h2>Hello {name}</h2>
                </div>
            </div>
            <div>
                <Projects/>
            </div>
        </div>
    )
}

export default Dashboard