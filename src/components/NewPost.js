import { useState } from 'react'
import axios from 'axios'

const NewPost = (props) => {
    //////////////////////////////////////
    //useState variables / functions
    //////////////////////////////////////

    const [newPostUser, setNewPostUser] = useState('') // 
    const [newPostBody, setNewPostBody] = useState('') // 
    const [newPostImage, setNewPostImage] = useState('') // 
    const [newPostURL, setNewPostURL] = useState('') // 

    //////////////////////////////////////
    //Event Handlers
    //////////////////////////////////////

    const handleUser = (event) => {
        setNewPostUser(event.target.value)
    }
    const handleBody = (event) => {
        setNewPostBody(event.target.value)
    }
    const handleImage = (event) => {
        setNewPostImage(event.target.value)
    }
    const handleURL = (event) => {
        setNewPostURL(event.target.value)
    }

    //////////////////////////////////////
    //Axios request for form submit
    //////////////////////////////////////

    const handlePostSubmit = (event) => {
        event.preventDefault()
        axios.post('#',//heroku deployed API url goes here
            {
                user: newPostUser,
                postBody: newPostBody,
                imageURL: newPostURL,
                linkURL: newPostURL,
                likes: [],
                comments: []
            }).catch((err) => {
                console.log(newPostUser);
                console.log(err);
            })
            .then(() => {
                setNewPostBody('')
                setNewPostImage('')
                setNewPostURL('')
                setNewPostUser('')
            })
    }

    //////////////////////////////////////
    //Return form for new post submit
    //////////////////////////////////////
    return (
        <div className='new-post-form'>
            <form onSubmit={handlePostSubmit}>
                <label htmlFor='user'>Poster Username:</label><br />
                <input name='user' type="text" onChange={handleUser} /><br />
                <label htmlFor='body'>Post Body:</label><br />
                <input name='body' type="text" onChange={handleBody} /><br />
                <label htmlFor='image'>Include an image:</label><br />
                <input name='image' type="text" onChange={handleImage} /><br />
                <label htmlFor='url'>Link to an outside article:</label><br />
                <input name='url' type="text" onChange={handleURL} /><br />
                <input type='submit' />
            </form>
        </div >
    )
}

export default NewPost