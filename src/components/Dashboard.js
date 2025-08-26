import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TaskForm from './TaskForm'
const Dashboard = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (!user) navigate('/')
    }, [user, navigate])
    return (
        <>
            <section className='heading'>
                {user ? (<ul><h1>Welcome {user && user.name}</h1>
                    <div><button className='btn' onClick={() => navigate('/alltasks')}>Check Tasks</button></div>
                    <div><TaskForm /></div></ul>) : (<p>Login to Add and View Tasks</p>)}


            </section >

        </>
    )

}

export default Dashboard