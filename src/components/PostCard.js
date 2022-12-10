import '../App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'


const PostCard = (props) => {// need to update with ternaries

  // edit hooks
  const [updatedUser, setUpdatedUser] = useState('')
  const [updatedPostBody, setUpdatedPostBody] = useState('')
  const [updatedPostImg, setUpdatedPostImg] = useState('')
  const [updatedPostUrl, setUpdatedPostUrl] = useState('')

  const handleUpdatedUser = (event) => {
    setUpdatedUser(event.target.value)
  }

  const handleUpdatedPostBody = (event) => {
    setUpdatedPostBody(event.target.value)
  }

  const handleUpdatedPostImg = (event) => {
    setUpdatedPostImg(event.target.value)
  }

  const handleUpdatedPostUrl = (event) => {
    setUpdatedPostUrl(event.target.value)
  }

  // show and hide card modal
  const handleShowCardModal = () => {
    let el = document.getElementById('modal-post')
    el.classList.remove('hidden');
  }

  const handleHideCardModal = () => {
    let el = document.getElementById('modal-post')
    el.classList.add('hidden');
  }

  // show and hide edit form
  const showEdit = () => {
    let el = document.getElementById('modal-edit')
    el.classList.remove('hidden');
  }

  const hideEdit = () => {
    let el = document.getElementById('modal-edit')
    el.classList.add('hidden');
  }

  // edit feature
  const handleUpdatedPost = (postsData) => {
    axios.put(`https://evening-mesa-52036.herokuapp.com/${postsData._id}`,
      {
        user: updatedUser,
        postBody: updatedPostBody,
        imageURL: updatedPostImg,
        linkURL: updatedPostUrl
      }
      )
  }

  // delete feature
  const deletePost = (postsData) => {
    axios.delete(`https://evening-mesa-52036.herokuapp.com/${postsData._id}`).then(() => {
      axios.get('https://evening-mesa-52036.herokuapp.com/').then((response) => {
        props.setAllPosts(response.data)
      })
    })
    let el = document.getElementById('modal-post')
    el.classList.add('hidden');
    let la = document.getElementById('modal-edit')
    la.classList.add('hidden');
  }


    return (
      <div>
        <div className="card" onClick={handleShowCardModal}>
            <p>Posted by {props.post.user}</p>
            <p className="post-body">{props.post.postBody}</p>
            <img src={props.post.imageURL} />
            <a href={props.post.linkURL}>{props.post.linkURL}</a><br/>
        </div>
        <div id="modal-post" class="hidden" >
            <p>Posted by {props.post.user}</p>
            <p className="post-body">{props.post.postBody}</p>
            <img src={props.post.imageURL} />
            <a href={props.post.linkURL}>{props.post.linkURL}</a><br/>
            <button onClick={handleHideCardModal}>Close</button>
            <button onClick={showEdit}>Edit</button>
            <button onClick={()=>{deletePost(props.post)}}>Delete</button>
        </div>
        <div id="modal-edit" class="hidden">
            <form onSubmit={()=> {handleUpdatedPost(props.post)}}>
                <label htmlFor='user'>Poster Username:</label><br />
                <input name='user' type="text" defaultValue={props.post.user} onKeyUp={handleUpdatedUser} /><br />
                <label htmlFor='body'>Post Body:</label><br />
                <input name='body' type="text" defaultValue={props.post.postBody} onKeyUp={handleUpdatedPostBody} /><br />
                <label htmlFor='image'>Include an image:</label><br />
                <input name='image' type="text" defaultValue={props.post.imageURL} onKeyUp={handleUpdatedPostImg} /><br />
                <label htmlFor='url'>Link to an outside article:</label><br />
                <input name='url' type="text" defaultValue={props.post.linkURL} onKeyUp={handleUpdatedPostUrl} /><br />
                <input type='submit' />
                <button onClick={hideEdit}>Close</button>
            </form>
        </div>
      </div>
    )
}

export default PostCard
