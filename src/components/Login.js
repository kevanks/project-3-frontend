import { useState } from "react";
import axios from 'axios'

const Login = (props) => {
    //////////////////////////////////////
    //useState variables / functions
    //////////////////////////////////////

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //////////////////////////////////////
    //Event Handlers
    //////////////////////////////////////

    const handleUsername = (event) => {
        setUsername(event.target.value)// a "get" request to look for unique usernames would be good here
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    //////////////////////////////////////
    //Axios request for form submit
    //////////////////////////////////////

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        let userObj = {
            username: username,
            password: password
        }
        if (password === userObj.password) {
            props.handleHideLoginForm()
            props.handleLogin(userObj)
        } else {
            console.log('passwords dont match');
        }
    }

    //////////////////////////////////////
    //Return form for user login
    //////////////////////////////////////

    return (
        <div className="modal-form">
            <div className='modal-header'>
                <button onClick={props.handleHideLoginForm} className='close-button'>Cancel</button>
            </div>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor='username'>Username:</label><br />
                <input name='username' type="text" onChange={handleUsername} className='text-input' /><br />
                <label htmlFor='password'>Password:</label><br />
                <input name='password' type="password" onChange={handlePassword} className='text-input' /><br />
                <input type='submit' />
            </form>
        </div>
    )

}

export default Login
