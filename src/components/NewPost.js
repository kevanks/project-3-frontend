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
    const [newPostCommunity, setNewPostCommunity] = useState('General')

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
    const handleCommunity = (event) => {
        setNewPostCommunity(event.target.value)
    }

    //////////////////////////////////////
    //Axios request for form submit
    //////////////////////////////////////

    const handlePostSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/',
            {
                user: props.currentUser.username,
                postBody: newPostBody,
                imageURL: newPostImage,
                linkURL: newPostURL,
                likes: [],
                comments: [],
                community: newPostCommunity
            }).then(() => {
                setNewPostBody('')
                setNewPostImage('')
                setNewPostURL('')
                setNewPostUser('')
                setNewPostCommunity('General')
                props.handleHideNewForm()
                props.updatePosts()
            }).catch((err) => {
                console.log(newPostUser);
                console.log(err);
            })
    }

    //////////////////////////////////////
    //Return form for new post submit
    //////////////////////////////////////
    return (
        <div className='modal-form'>
            <div className='modal-header'>
                <span onClick={props.handleHideNewForm} className="material-symbols-outlined">close</span>
            </div>
            <form onSubmit={handlePostSubmit}>
                <label htmlFor='community'>Community</label><br />
                <select name='community' onChange={handleCommunity}>
                    <option value="General">General</option>
                    <option value="Animals">Animals</option>
                    <option value="Art">Art</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Gaming">Gaming</option>
                    <option value="News">News</option>
                    <option value="Science">Science</option>
                </select><br />
                <label htmlFor='body'>Post Body:</label><br />
                <input name='body' type="text" value={newPostBody} onChange={handleBody} /><br />
                <label htmlFor='image'>Include an image:</label><br />
                <input name='image' type="text" value={newPostImage} onChange={handleImage} /><br />
                <label htmlFor='url'>Link to an outside article:</label><br />
                <input name='url' type="text" value={newPostURL} onChange={handleURL} /><br />
                <input type='submit' />
            </form>
        </div >
    )
}

export default NewPost