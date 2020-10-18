import React, { Component } from 'react'
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify'
import { createPost } from '../graphql/mutations'
import './css/createPost.css'
import user from '../Assets/user.svg'
import upload from '../Assets/upload2.png';
import config from '../aws-exports'
import { v4 as uuid } from 'uuid'

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config

class CreatePost extends Component{

    state ={
        postOwnerId: "",
        postOwnerUsername: "",
        postTitle: "",
        postBody: "",
        file: null,
        postImage: "",
        postUrl:"",
        filename:""
    }

    componentDidMount = async () =>{
        await Auth.currentUserInfo()
        .then( user => {
            this.setState({
                postOwnerId: user.attributes.sub,
                postOwnerUsername: user.attributes.name
            })

        })
    }

    handleChangePost = event => {
        this.setState({
         [event.target.name]: event.target.value
        })
    }

    handleAddPost = async event => {
        event.preventDefault()
        const file = this.state.file;
        if(file){
            const extension = file.name.split(".")[1]
            const fileName = file.name.split(".")[0]
            const { type : mimeType } = file
            const key = `images/${uuid()}${fileName}.${extension}` 
            const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
            this.setState({postUrl: url})
            await Storage.put(key, file, {
                contentType: mimeType
            })
        }

        const input = {
            postOwnerId : this.state.postOwnerId,
            postOwnerUsername: this.state.postOwnerUsername,
            postTitle: this.state.postTitle,
            postBody: this.state.postUrl,
            createdAt: new Date().toISOString()
        }  

        await API.graphql(graphqlOperation(createPost, { input }))

        this.setState({ postTitle: "", postBody: ""})
    }

    handleChangeImage = event =>{
        this.setState({file: event.target.files[0]})
    }

    render(){
        const filename=this.state.file;
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
                        <input 
                            className="postUpload"
                            type="file"
                            id="file"
                            name="postImage"
                            value={this.state.postImage}
                            onChange={this.handleChangeImage}
                        />
                        <label for="file">Photo/Video</label>
                    </div>
                    
                    {filename != null &&
                    <p>{filename.name}</p>
                    }
                    <div className="submit-div">
                        <input 
                        type="submit"
                        className="submit"
                        value="Post"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default CreatePost;