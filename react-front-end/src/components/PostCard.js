const PostCard = (props) => {// need to update with ternaries
    return (
        <div className="card">
            <p>Posted by {props.post.user}</p>
            <p className="post-body">{props.post.postBody}</p>
            <img src={props.post.imageURL} />
            <a href={props.post.linkURL}>{props.post.linkURL}</a>
        </div>
    )
}

export default PostCard