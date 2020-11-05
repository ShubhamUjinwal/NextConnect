import React, { Component } from 'react'
import './css/userProfile.css'
import user from '../Assets/user.svg'
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify'
import { createUser, updateUser } from '../graphql/mutations'
import { onCreateUser, onUpdateUser, onDeleteUser } from '../graphql/subscriptions'
import { listUsers } from '../graphql/queries'
import Navbar from './navbar'
import config from '../aws-exports'
import { v4 as uuid } from 'uuid'

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config

class UserProfile extends Component{

    state = {
        ownerId: "",
        ownerUsername: "",
        ownerEmail: "",
        file: null,
        userDp: [],
        userDpUrl:"",
        filename:""
    }

    componentDidMount= async () =>{
        await Auth.currentUserInfo()
            .then(user => {
                this.setState(
                    {
                        ownerId: user.attributes.sub,
                        ownerUsername: user.attributes.name,
                        ownerEmail: user.attributes.email,   
                    }
                    
                )
            })
        this.getDP()
    }

    getDP = async () => {
        const result = await API.graphql(graphqlOperation(listUsers, {
            filter: {id: {eq: this.state.ownerEmail}}
        } ));
        if (result.data.listUsers.items.length !== 0)
            this.setState({ userDp: result.data.listUsers.items[0]})
    }

    handleChangeDp = async event =>{
        event.preventDefault()
        const file = event.target.files[0];
        console.log("file: ")
        console.log(file)
        if(file){
            const extension = file.name.split(".")[1]
            const fileName = file.name.split(".")[0]
            const { type : mimeType } = file
            const key = `userDp/${uuid()}${fileName}.${extension}`   
            const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`

            await Storage.put(key, file, {
                contentType: mimeType
            })

            const input = {
                id: this.state.ownerEmail,
                user: this.state.ownerUsername,
                userDP: url,
                about: "",
                createdAt: new Date().toISOString()
            }  
            if (this.state.userDp.length === 0){
                await API.graphql(graphqlOperation(createUser, { input }))
            }else{
                await API.graphql(graphqlOperation(updateUser, { input }))
            }
        }
    }

    render(){
        const { userDp } = this.state
        return(
            <div>
                <Navbar username={this.state.ownerUsername} />

                <div className="userProfile">

                    <img src={userDp.length === 0? user : userDp.userDP} alt={'user'}/>

                        <div className="upload">
                            <input 
                                className="postUpload"
                                type="file"
                                id="file"
                                name="dpImage"
                                value={this.state.postImage}
                                onChange={this.handleChangeDp}
                            />
                            <label for="file">Upload Photo</label>
                        </div>

                        <div className="userInfo" >
                            <label>Name :</label>
                            <input type="text" value={this.state.ownerUsername}/>
                            <br/>
                            <label>About :</label>
                            <input type="text" />
                        </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;