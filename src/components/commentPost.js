import React, { Component } from 'react'
import './css/commentPost.css'
import user from '../Assets/user.svg'

class CommentPost extends Component {



    render() {
        const { content, commentOwnerUsername, createdAt} = this.props.commentData
         return (
             <div>
                <div className="comment">
                    <img src={user} alt={'user'}/>
                    <span className="comment-owner">
                        { commentOwnerUsername}
                
                        <time style={{ fontSize:"12px",color:"gray" ,fontStyle: "italic"}}>
                            { " "}
                            { new Date(createdAt).toDateString()}

                        </time>
                    </span>

                </div>
                <p className="comment-body"> { content }</p>
            </div>
         )
    }
}
export default CommentPost;