import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

import NewPost from './components/NewPost.js'


function App() {
  //////////////////////////////////////
  //useState variables / functions
  //////////////////////////////////////
  const [allPosts, setAllPosts] = useState([]) // allPosts will be used to store all posts visible on the page

  useEffect(() => {
  }, [])

  return (

    < main >
      <h1>Message Board</h1>
      <NewPost />
    </main >
  );
}

export default App;
