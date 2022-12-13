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
        console.log({
            username: username,
            password: password
        })
        props.handleLogin()
      }
        // need to insert logic here to validate password, check if unique username, etc.
    //     axios.post('https://evening-mesa-52036.herokuapp.com/login',
    //         {
    //             username: username,
    //             password: password
    //         }).then(() => {// we will need to add the cookie response from the server here
    //             props.handleHideLoginForm()
    //             props.updatePosts()
    //         })
    // }

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
                <input name='username' type="text" onChange={handleUsername} /><br />
                <label htmlFor='password'>Password:</label><br />
                <input name='password' type="password" onChange={handlePassword} /><br />
                <input type='submit' />
            </form>
        </div>
    )

}

export default Login
