import {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import {Outlet} from 'react-router-dom'

function App() {
    const [dateTime, setDateTime] = useState()
    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date().toLocaleString())
        }, 1000)
        return () => clearInterval(interval)
    })


    return (
        <>
            <Navbar dateTime={dateTime}/>
            <Outlet/>
        </>
    )
}

export default App
