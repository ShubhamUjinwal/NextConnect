import React, { Component } from 'react'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { createPost } from '../graphql/mutations'
import './css/createPost.css'
import user from '../Assets/user.svg'
import upload from '../Assets/upload.jpg';
class CreatePost extends Component{

    state ={
        postOwnerId: "",
        postOwnerUsername: "",
        postTitle: "",
        postBody: ""
    }

    componentDidMount = async () =>{
        await Auth.currentUserInfo()
        .then( user => {
            this.setState({
                postOwnerId: user.attributes.sub,
                postOwnerUsername: user.username
            })

        })
    }

    handleChangePost = event => this.setState({
         [event.target.name]: event.target.value 
        })

    handleAddPost = async event => {
        event.preventDefault()

        const input = {
            postOwnerId : this.state.postOwnerId,
            postOwnerUsername: this.state.postOwnerUsername,
            postTitle: this.state.postTitle,
            postBody: this.state.postBody,
            createdAt: new Date().toISOString()
        }

        await API.graphql(graphqlOperation(createPost, { input }))

        this.setState({ postTitle: "", postBody: ""})
    }

    render(){
        return (
            <div className="createpost">
                <form className="add-post" onSubmit={this.handleAddPost}>
                    <div className="status">
                    <img src={user} alt={'user'}/>
                        <input 
                        className="username"
                        type="text"
                        name="postTitle"
                        required
                        placeholder="What's on your mind"
                        value={this.state.postTitle}
                        onChange={this.handleChangePost}
                    />
                     </div>
                     <div className="line" />

                     <div className="upload">
                        <img src={upload} alt={'logout'}/>
                        <a href="/">Photo/Video</a>
                    </div>

                    <input 
                    type="submit"
                    className="submit"
                    value="Post"
                    style={{ fontSize: '19px' }}
                    />
                </form>
            </div>
        )
    }
}

export default CreatePost;