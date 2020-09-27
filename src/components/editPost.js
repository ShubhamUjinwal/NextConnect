import React, { Component } from 'react'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { updatePost } from '../graphql/mutations'
import './css/editPost.css'
import close from '../Assets/close.png'

class EditPost extends Component {

    state = {
        show: false,
        id: "",
        postOwnerId: "",
        postOwnerUsername: "",
        postTitle: "",
        postBody: "",
        postData: {
             postTitle: this.props.postTitle,
             postBody: this.props.postBody
        }

    }

    handleModal = (event) => {
         event.preventDefault()
         this.setState({ show: !this.state.show})
    }

    handleUpdatePost = async (event) => {
         event.preventDefault()

         const input = {
              id: this.props.id,
              postOwnerId: this.state.postOwnerId,
              postOwnerUsername: this.state.postOwnerUsername,
              postTitle: this.state.postData.postTitle,
              postBody: this.state.postData.postBody

         }

         await API.graphql(graphqlOperation(updatePost, { input }))

         //force close the modal 
         this.setState({ show: !this.state.show})

    }
     
    handleTitle = (event) => {
         event.preventDefault()
         this.setState({
             postData: {...this.state.postData, postTitle: event.target.value}
              
         })
    }
    handleBody = event => {
         this.setState({ postData: {...this.state.postData,
          postBody: event.target.value}})
    }
    componentWillMount = async () => {

        await Auth.currentUserInfo()
            .then(user => {
                 this.setState({
                     postOwnerId: user.attributes.sub,
                     postOwnerUsername: user.attributes.name
                 })
            })
         
    }

    render() {
         return (
             <>
             { this.state.show && (
                 <div className="edit-modal">
                    
                      <form className="edit-post"
                         onSubmit={(event) => this.handleUpdatePost(event)}>
                             <input style={{fontSize: "19px"}}
                                  type="text" placeholder="Title"
                                  name="postTitle"
                                  value={this.state.postData.postTitle}
                                  onChange={this.handleTitle} />

                    <button className="close-button"
                         onClick={this.handleModal}>
                         <img src={close}/>
                    </button>
                             <button className="update-button">Update</button>


                      </form>

                      
                 </div>
             )
             }

                    
                <button className="burger-menu-buttons" onClick={(event) => this.handleModal(event)}>Edit</button>
             </>

             
         )
    }
}

export default EditPost;