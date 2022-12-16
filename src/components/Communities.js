import { useState, useEffect } from "react";
import axios from 'axios'

const Communities = (props) => {
    //////////////////////////////////////
    //useState variables / functions
    //////////////////////////////////////

    const [communityArray, setCommunityArray] = useState([])

    const updateCommunityList = () => {
        axios.get('https://evening-mesa-52036.herokuapp.com/community-list').then((response) => {
            setCommunityArray(response.data)
        })
    }

    const updateCommunityPosts = (event, community) => {
        props.setCurrentCommunity(community)
        axios.get('https://evening-mesa-52036.herokuapp.com/community/' + community).then((response) => {
            props.setAllPosts(response.data)
        })
    }

    const handleShowCommunities = () => {
        let el = document.getElementById('communities-list')
        if ([...el.classList].includes('hidden')) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    }

    useEffect(() => {
        updateCommunityList()
    }, [])

    return (
        <div className="communities-container">
            <div className="communities-title-container" onClick={handleShowCommunities}>
                <span className="material-symbols-outlined menu">menu</span><p className="community-title">Communities</p>
            </div>
            <ul id="communities-list" className="hidden">
                <li className="community-li" onClick={props.updatePosts}>Homepage</li>
                {communityArray.map((community) => {
                    return (
                        <li className="community-li" onClick={(event) => { updateCommunityPosts(event, community) }}>{community}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Communities