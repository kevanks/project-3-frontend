import '../App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'


const PostCard = (props) => {// need to update with ternaries

  const handleShowCardModal = () => {
    let el = document.getElementById('modal-post')
    el.classList.remove('hidden');
  }

  const handleHideCardModal = () => {
    let el = document.getElementById('modal-post')
    el.classList.add('hidden');
  }

  const deletePost = (postsData) => {
    axios.delete(`https://evening-mesa-52036.herokuapp.com/${postsData._id}`).then(() => {
      axios.get('https://evening-mesa-52036.herokuapp.com/').then((response) => {
        props.setAllPosts(response.data)
      })
    })
  }


    return (
      <div>
        <div className="card">
            <p>Posted by {props.post.user}</p>
            <p className="post-body">{props.post.postBody}</p>
            <img src={props.post.imageURL} />
            <a href={props.post.linkURL}>{props.post.linkURL}</a><br/>
            <button onClick={handleShowCardModal}>Show More</button>
        </div>
        <div id="modal-post" class="hidden" >
            <p>Posted by {props.post.user}</p>
            <p className="post-body">{props.post.postBody}</p>
            <img src={props.post.imageURL} />
            <a href={props.post.linkURL}>{props.post.linkURL}</a><br/>
            <button onClick={handleHideCardModal}>Close</button>
            <button onClick={()=>{deletePost(props.post)}}>Delete</button>
        </div>
      </div>
    )
}

export default PostCard
