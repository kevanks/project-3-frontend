import { useState } from 'react'
import axios from 'axios'

const Search = (props) => {
    //////////////////////////////////////
    //useState variables / functions
    //////////////////////////////////////

    const [search, setSearch] = useState('')

    //////////////////////////////////////
    //Event Handlers
    //////////////////////////////////////

    const handleSearchInput = (event) => {
        setSearch(event.target.value)
    }

    //////////////////////////////////////
    //Axios request for form submit
    //////////////////////////////////////

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        axios.get('https://evening-mesa-52036.herokuapp.com/search/' + search).then((response) => {
            console.log(response.data);
            props.setAllPosts(response.data)
            setSearch('')
        })
    }

    return (
        <div className='search-div'>
            <form className='search-form' onSubmit={handleSearchSubmit}>
                <input type="text" className='search-box' placeholder='Search' onChange={handleSearchInput} />
                <span className="material-symbols-outlined search-symbol">search</span>
            </form>
        </div>
    )
}

export default Search