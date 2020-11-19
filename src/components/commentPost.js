import React, { Component } from 'react'
import './css/commentPost.css'
import { Storage} from 'aws-amplify'
import user from '../Assets/user.svg'

class CommentPost extends Component {


    state = {
        dp: [],

    }

    componentDidMount = async() =>{
        this.getDP()
    }

    getDP = async () => {
        const result = await Storage.list('userDp/')
        this.setState({dp: result})
    }

    render() {
        const { content, commentOwnerUsername, commentOwnerEmail, createdAt} = this.props.commentData
        const { dp } = this.state
         return (
             <div>
                <div className="comment">
                    {   
                        dp.map((dp) => {
                            const x = dp.key.split('/')
                            if(x[1] === commentOwnerEmail){
                                this.props.commentData.commentOwnerDpURL="https://ncimages144521-nc.s3.amazonaws.com/public/"+dp.key
                            }
                            return null
                        }) 
                    }

                    <img src={this.props.commentData.commentOwnerDpURL === null ? user : this.props.commentData.commentOwnerDpURL} alt={'user'}/>
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