import { useState, useEffect } from "react";
import axios from 'axios'

const Communities = (props) => {
    //////////////////////////////////////
    //useState variables / functions
    //////////////////////////////////////

    const [communityArray, setCommunityArray] = useState([])

    const updateCommunityList = () => {
        axios.get('http://localhost:3000/community-list').then((response) => {
            setCommunityArray(response.data)
        })
    }

    const updateCommunityPosts = (event, community) => {
        console.log(community);
        axios.get('http://localhost:3000/community/' + community).then((response) => {
            props.setAllPosts(response.data)
        })
    }

    useEffect(() => {
        updateCommunityList()
    }, [])

    return (
        <div>
            <ul>
                {communityArray.map((community) => {
                    return (
                        <li onClick={(event) => { updateCommunityPosts(event, community) }}>{community}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Communities