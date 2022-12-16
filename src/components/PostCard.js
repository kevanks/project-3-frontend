import '../App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'


const PostCard = (props) => {// need to update with ternaries

  // edit hooks
  const [updatedUser, setUpdatedUser] = useState('')
  const [updatedPostBody, setUpdatedPostBody] = useState('')
  const [updatedPostImg, setUpdatedPostImg] = useState('')
  const [updatedPostUrl, setUpdatedPostUrl] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [likes, setLikes] = useState([])
  // const [numLikes, setNumLikes] = useState(0)
  const [showAddComment, setShowAddComment] = useState(false)
  const [comment, setComment] = useState('')
  const [allComments, setAllComments] = useState([])

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

  const revealModal = () => {
    setShowModal(true)
  }

  const hideModal = () => {
    setShowModal(false)
  }

  const revealModalEdit = () => {
    setShowModalEdit(true)
    setUpdatedUser(props.post.user)
    setUpdatedPostBody(props.post.postBody)
    setUpdatedPostImg(props.post.imageURL)
    setUpdatedPostUrl(props.post.linkURL)
  }

  const hideModalEdit = () => {
    setShowModalEdit(false)
  }

  // edit feature
  const handleUpdatedPost = (event, postsData) => {
    event.preventDefault()

    axios.put(`https://evening-mesa-52036.herokuapp.com/${postsData._id}`,
      {
        user: updatedUser,
        postBody: updatedPostBody,
        imageURL: updatedPostImg,
        linkURL: updatedPostUrl
      }
    ).then(() => {
      props.updatePosts()
    })
    setShowModal(false)
    setShowModalEdit(false)
  }

  // delete feature
  const deletePost = (postsData) => {
    axios.delete(`https://evening-mesa-52036.herokuapp.com/${postsData._id}`).then(() => {
      axios.get('https://evening-mesa-52036.herokuapp.com/').then((response) => {
        props.setAllPosts(response.data)
      })
    })
    setShowModal(false)
  }

  const addLike = (event, postsData) => {
    setLikes(props.post.likes)
    console.log(props.post.likes);
    if (props.currentUser.username === undefined) {
      console.log("login to like");
    } else {
      if (likes.includes(props.currentUser.username)) {
        console.log("already liked");
      } else {
        likes.push(props.currentUser.username)
        // setNumLikes(numLikes + 1)
        axios.put(`https://evening-mesa-52036.herokuapp.com/${postsData._id}`,
          {
            likes: likes
          }
        ).then(() => {
          props.updatePosts()
        })
        console.log("like");
        console.log(likes);
      }
    }
  }

  const addComment = () => {
    setShowAddComment(true)
  }

  const handleComment = (event) => {
    setComment(event.target.value)
  }

  const addCommentToFeed = (event) => {
    setAllComments(props.post.comments)
    event.preventDefault()
    if (props.currentUser.username === undefined) {
      console.log("login to comment");
    } else {
      allComments.push({ user: props.currentUser.username, comment: comment })
      axios.put(`https://evening-mesa-52036.herokuapp.com/${props.post._id}`,
        {
          comments: allComments
        }
      ).then(() => {
        props.updatePosts()
      })
    }
    setShowAddComment(false)
  }


  return (
    <div>
      <div className="card" onClick={revealModal}>
        <p>Posted by {props.post.user} in {props.post.community}</p>
        <p className="post-body">{props.post.postBody}</p>
        <img src={props.post.imageURL} />
        <a href={props.post.linkURL}>{props.post.linkURL}</a><br />
        <p>Likes: {props.post.likes.length}</p>
        <button className="like-button" onClick={(e) => addLike(e, props.post)}>Like</button>
      </div>
      {(showModal) ?
        <div id="modal-post">
          <p>Posted by {props.post.user}</p>
          <p className="post-body">{props.post.postBody}</p>
          <img src={props.post.imageURL} />
          <a href={props.post.linkURL}>{props.post.linkURL}</a><br />
          <div className="buttons">
            <button className="close-button" onClick={hideModal}>Close</button>
            <button className="edit-button" onClick={revealModalEdit}>Edit</button>
            <button className="delete-button" onClick={() => { deletePost(props.post) }}>Delete</button>
          </div>
          <h4>Comments</h4>
          {props.post.comments.map((comment) => {
            return (
              <div>
                <p>{comment.user}: {comment.comment}</p>
              </div>
            )
          })}
          <button className="submit-button" onClick={addComment}>Add Comment</button>
          {(showAddComment) ?
            <div>
              <form onSubmit={addCommentToFeed}>
                <label>Comment:</label><br />
                <input name='comment' type='text' onChange={handleComment} /><br />
                <input className="submit-button" type='submit' value='Submit Comment' />
              </form>
            </div>
            : null}
        </div>
        : null}
      {(showModalEdit) ?
        <div id="modal-edit">
          <form onSubmit={(event) => { handleUpdatedPost(event, props.post) }}>
            <label htmlFor='user'>Poster Username:</label><br />
            <input name='user' type="text" defaultValue={props.post.user} onKeyUp={handleUpdatedUser} /><br />
            <label htmlFor='body'>Post Body:</label><br />
            <input name='body' type="text" defaultValue={props.post.postBody} onKeyUp={handleUpdatedPostBody} /><br />
            <label htmlFor='image'>Include an image:</label><br />
            <input name='image' type="text" defaultValue={props.post.imageURL} onKeyUp={handleUpdatedPostImg} /><br />
            <label htmlFor='url'>Link to an outside article:</label><br />
            <input name='url' type="text" defaultValue={props.post.linkURL} onKeyUp={handleUpdatedPostUrl} /><br />
            <input className="submit-button" type='submit' />
            <button className="close-button" onClick={hideModalEdit}>Close</button>
          </form>
        </div>
        : null}

    </div>
  )
}

export default PostCard
