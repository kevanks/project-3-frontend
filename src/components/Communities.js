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
        props.setCurrentCommunity(community)
        axios.get('http://localhost:3000/community/' + community).then((response) => {
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
        <div>
            <div className="communities-title-container" onClick={handleShowCommunities}>
                <p className="community-title">Communities</p><span class="material-symbols-outlined">menu</span>
            </div>
            <ul id="communities-list" className="hidden">
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