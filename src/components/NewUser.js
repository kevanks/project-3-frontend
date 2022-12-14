import { useState } from "react";
import axios from 'axios'

const NewUser = (props) => {
    //////////////////////////////////////
    //useState variables / functions
    //////////////////////////////////////

    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //////////////////////////////////////
    //Event Handlers
    //////////////////////////////////////

    const handleUsername = (event) => {
        setNewUsername(event.target.value)// a "get" request to look for unique usernames would be good here
    }
    const handlePassword = (event) => {
        setNewPassword(event.target.value)
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    //////////////////////////////////////
    //Axios request for form submit
    //////////////////////////////////////

    const handleNewUserSubmit = (event) => {
        event.preventDefault()
        let userObj = {
          username: newUsername,
          password: newPassword
        }
        if (newPassword === confirmPassword) {
          props.handleCreateUser(userObj)
          props.handleHideNewUserForm()
        } else {
          console.log('passwords dont match');
        }
      }

    //////////////////////////////////////
    //Return form for new user submit
    //////////////////////////////////////

    return (
        <div className="modal-form">
            <div className='modal-header'>
                <button onClick={props.handleHideNewUserForm} className='close-button'>Cancel</button>
            </div>
            <form onSubmit={handleNewUserSubmit}>
                <label htmlFor='username'>Username:</label><br />
                <input name='username' type="text" onChange={handleUsername} /><br />
                <label htmlFor='password'>Password:</label><br />
                <input name='password' type="password" onChange={handlePassword} /><br />
                <label htmlFor='confirm-password'>Confirm Password:</label><br />
                <input name='confirm-password' type="password" onChange={handleConfirmPassword} /><br />
                <input type='submit' />
            </form>
        </div>
    )

}

export default NewUser
