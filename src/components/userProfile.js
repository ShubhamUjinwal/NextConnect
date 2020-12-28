import React, { Component } from 'react'
import './css/userProfile.css'
import user from '../Assets/user.svg'
import { Storage, API, graphqlOperation, Auth } from 'aws-amplify'
import { createUser, updateUser } from '../graphql/mutations'
import { onCreateUser, onUpdateUser } from '../graphql/subscriptions'
import Navbar from './navbar'
import config from '../aws-exports'
import { v4 as uuid } from 'uuid'
import { listUsers } from '../graphql/queries'

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
        dp:[], 
        userDpUrl:"",
        filename:""
    }

    componentDidMount= async () =>{
        await Auth.currentUserInfo()
        .then( user => { this.setState({
                    ownerId: user.attributes.sub,
                    ownerUsername: user.attributes.name,
                    ownerEmail: user.attributes.email,   
                }
            )
        })

        this.getDp(this.state.ownerEmail)

        this.createUserListener = API.graphql(graphqlOperation(onCreateUser))
            .subscribe({
                next: userData => {
                    const newUser = userData.value.data.onCreateUser
                    const prevUser = this.state.dp.filter( dp => dp.id !== newUser.id)
                    const updatedUser = [newUser, ...prevUser]
                    this.setState({ posts: updatedUser})
                }
            })

        this.updateUserListener = API.graphql(graphqlOperation(onUpdateUser))
            .subscribe({
                next: userData => {
                    const { dp } = this.state
                    const updateUser = userData.value.data.onUpdateUser
                    const index = dp.findIndex(user => user.id === updateUser.id)
                    const updateUsers = [
                        ...dp.slice(0, index),
                        updateUser,
                        ...dp.slice(index + 1)
                    ]
                    this.setState({ dp: updateUsers})
                }
            })
    }

    componentWillUnmount(){
        this.createUserListener.unsubscribe()
        this.updateUserListener.unsubscribe()
    }

    getDp = async (email) => {
        const result = await API.graphql(graphqlOperation(listUsers, {
            filter: {id: {eq: email}}
        }));
        this.setState({dp: result.data.listUsers.items})
    }

    handleChangeDp = async event =>{
        event.preventDefault()
        const file = event.target.files[0];
        if(file){
            const extension = file.name.split(".")[1]
            const fileName = file.name.split(".")[0]
            const { type : mimeType } = file
            const key = `userDp/${this.state.ownerEmail}/${uuid()}${fileName}.${extension}`   
            const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
            const dp = this.state.dp

            const input = {
                id: this.state.ownerEmail,
                user: this.state.ownerUsername,
                userDP: url,
                about: "",
                createdAt: new Date().toISOString()
            }  

            if (dp.length === 0){
                await Storage.put(key, file, {
                    contentType: mimeType
                })
                await API.graphql(graphqlOperation(createUser, { input }))
            }else{
                Storage.remove(dp[0].userDP.split("public/")[1])
                    .then(result => console.log(result))
                    .catch(err => console.log(err));

                await Storage.put(key, file, {
                    contentType: mimeType
                })
                await API.graphql(graphqlOperation(updateUser, { input }))
            }
        }
    }

    render(){
        const { dp } = this.state
        return(
            <div>
                <Navbar username={this.state.ownerUsername} />

                <div className="userProfile">

                    <img src={ dp.length === 0 ? user : dp[0].userDP} alt={'user'}/>

                        <div className="upload">
                            <input 
                                className="postUpload"
                                type="file"
                                id="file"
                                name="dpImage"
                                value={this.state.postImage}
                                onChange={this.handleChangeDp}
                            />
                            <label htmlFor="file">Upload Photo</label>
                        </div>

                        <div className="userInfo" >
                            <label>Name :</label>
                            <input type="text" defaultValue={this.state.ownerUsername}/>
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