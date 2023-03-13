import React, { useState } from 'react'
import Login from '../components/landing/Login'
import Register from '../components/landing/Register'
import '../components/landing/index.css'

const Landing = ({ loginUser }) => {
    const [login, setLogin] = useState(false);
    const loginText = "Already have an account? Login";
    const registerText = "Don't have an account? Register";

    const handleLogin = () => {
        setLogin(!login);
    }

    return (
        <>
            <div className='container grid grid-cols-2 content-center'>
                <div className='p-5 w-500 h-500'>
                    <img className='' src="https://i.ibb.co/vXqDmnh/background.jpg" alt="" />
                </div>

                <div className='grid grid-flow-row'>
                    {login ? <Login loginUser={loginUser} /> : <Register loginUser={loginUser} />}
                    <button className="text-left my-5 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={handleLogin}>
                        {!login ? loginText : registerText}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Landing