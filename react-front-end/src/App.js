import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

import NewPost from './components/NewPost.js'
import PostCard from './components/PostCard.js'

// const seedData = [{ user: "test1user", postBody: "test1 Post Body", imageURL: "https://i.imgur.com/1eXyRRU.jpg", linkURL: "https://imgur.com/1eXyRRU", likes: [], comments: [] }, { user: "newPostUser", postBody: "newPostBody", imageURL: "https://i.imgur.com/1eXyRRU.jpg", linkURL: "https://imgur.com/1eXyRRU", likes: [], comments: [] }]


function App() {
  //////////////////////////////////////
  //useState variables / functions
  //////////////////////////////////////
  const [allPosts, setAllPosts] = useState([]) // allPosts will be used to store all posts visible on the page

  const updatePosts = () => {
    axios.get('https://evening-mesa-52036.herokuapp.com/').then((response) => {
      setAllPosts(response.data)
    })
  }

  useEffect(() => {
    updatePosts()
  }, [])

  const handleShowNewForm = () => {
    let el = document.getElementById('new-post-modal')
    el.classList.remove('hidden');
  }

  const handleHideNewForm = () => {
    let el = document.getElementById('new-post-modal')
    el.classList.add('hidden');
  }

  return (

    < main >
      <h1>Message Board</h1>
      <button onClick={handleShowNewForm}>New Post</button>
      <div id='new-post-modal' className='modal hidden'>
        <NewPost updatePosts={updatePosts} handleHideNewForm={handleHideNewForm} />
      </div>
      <div className='card-container'>
        {allPosts.map((post) => {
          return (
            <PostCard post={post} />
          )
        })}
      </div>
    </main >
  );
}

export default App;
