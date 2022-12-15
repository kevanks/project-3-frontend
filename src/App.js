import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

import NewPost from './components/NewPost.js'
import PostCard from './components/PostCard.js'
import NewUser from './components/NewUser.js'
import Login from './components/Login.js'
import Search from './components/Search.js'
import Communities from './components/Communities.js' // this component is inside its own DIV

// const seedData = [{ user: "test1user", postBody: "test1 Post Body", imageURL: "https://i.imgur.com/1eXyRRU.jpg", linkURL: "https://imgur.com/1eXyRRU", likes: [], comments: [] }, { user: "newPostUser", postBody: "newPostBody", imageURL: "https://i.imgur.com/1eXyRRU.jpg", linkURL: "https://imgur.com/1eXyRRU", likes: [], comments: [] }]


function App() {
  //////////////////////////////////////
  //useState variables / functions
  //////////////////////////////////////
  const [allPosts, setAllPosts] = useState([]) // allPosts will be used to store all posts visible on the page
  const [errorMessage, setErrorMessage] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [currentCommunity, setCurrentCommunity] = useState('')


  const updatePosts = () => {
    axios.get('https://evening-mesa-52036.herokuapp.com/').then((response) => {
      setAllPosts(response.data)
    })
  }

  // creates new user and sets account to theirs
  const handleCreateUser = (userObj) => {
    axios.post('https://evening-mesa-52036.herokuapp.com/createaccount', userObj).then((response) => {
      if (response.data.username) {
        console.log(response + 'this is response');
        setCurrentUser(response.data)
      } else {
        setErrorMessage(response.data)
      }
    })
  }

  // handles Login of account
  const handleLogin = (userObj) => {
    console.log(userObj);
    axios.post('https://evening-mesa-52036.herokuapp.com/login', userObj).then((response) => {
      if (response.data.username) {
        console.log(response.data.username + "this is username");
        setCurrentUser(response.data)
      } else {
        console.log(response + "other");
        setErrorMessage(response.data)
      }
    })
  }

  // handles logout of account
  const handleLogout = () => {
    setCurrentUser({})
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

  const handleShowNewUserForm = () => {
    let el = document.getElementById('new-user-modal')
    el.classList.remove('hidden');
  }

  const handleHideNewUserForm = () => {
    let el = document.getElementById('new-user-modal')
    el.classList.add('hidden');
  }

  const handleShowLoginForm = () => {
    let el = document.getElementById('login-modal')
    el.classList.remove('hidden');
  }

  const handleHideLoginForm = () => {
    let el = document.getElementById('login-modal')
    el.classList.add('hidden');
  }


  return (

    < main >
      <h1>Message Board</h1>
      <Communities setAllPosts={setAllPosts} setCurrentCommunity={setCurrentCommunity} />
      <div className='button-container'>
        {(currentUser.username) ? <div>
          <h4>Logged in as: {currentUser.username} </h4>
          <button className='button-50' onClick={handleLogout}>Logout</button>
        </div> : null}
        {(currentUser.username) ? <button className='button-50' onClick={handleShowNewForm}>New Post</button> : null}
        {(currentUser.username) ? null : <button className='button-50' onClick={handleShowNewUserForm}>Sign Up!</button>}
        {(currentUser.username) ? null : <button className='button-50' onClick={handleShowLoginForm}>Log In</button>}
      </div>
      <div>
        <Search setAllPosts={setAllPosts} />
      </div>
      <div id='new-post-modal' className='modal hidden'>
        <NewPost updatePosts={updatePosts} handleHideNewForm={handleHideNewForm} currentUser={currentUser} />
      </div>
      <div id='new-user-modal' className='modal hidden'>
        <NewUser handleHideNewUserForm={handleHideNewUserForm} handleCreateUser={handleCreateUser} updatePosts={updatePosts} />
      </div>
      <div id='login-modal' className='modal hidden'>
        <Login handleHideLoginForm={handleHideLoginForm} handleLogin={handleLogin} updatePosts={updatePosts} currentUser={currentUser} />
      </div>
      <div className='card-container'>
        {allPosts.map((post) => {
          return (
            <PostCard post={post} setAllPosts={setAllPosts} updatePosts={updatePosts} currentUser={currentUser} />

          )
        })}
      </div>
    </main >
  );
}

export default App;
