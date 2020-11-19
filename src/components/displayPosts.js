import React, { Component } from 'react'
import { listPosts } from '../graphql/queries'
import { Storage, API, graphqlOperation } from 'aws-amplify'
import DeletePost from './deletePost'
import EditPost from './editPost'
import { onCreatePost, onDeletePost, onUpdatePost, onCreateComment, onCreateLike} from '../graphql/subscriptions'
import { createLike } from '../graphql/mutations'
import CreateCommentPost from './createCommentPost'
import CommentPost from './commentPost'
import { FaThumbsUp, FaSadTear } from 'react-icons/fa'
import {Auth} from 'aws-amplify'
import UsersWhoLikedPost from './usersWhoLikedPost'
import './css/displayPost.css'
import user from '../Assets/user.svg'
import Navbar from './navbar'
import CreatePost from './createPost'

class DisplayPosts extends Component{

    state = {
        ownerId: "",
        ownerUsername: "",
        ownerEmail: "",
        errorMessage: "",
        postLikedBy: [],
        isHovering: false,
        isHoveringId: -1,
        burgerMenu: -1,
        userDPEmail: "",
        posts: [],
        dp: [],
    }

    componentDidMount= async () =>{
        this.getPosts()
        this.getDP()
        await Auth.currentUserInfo()
            .then(user => {
                this.setState(
                    {
                        ownerId: user.attributes.sub,
                        ownerUsername: user.attributes.name,  
                        ownerEmail: user.attributes.email
                    }
                    
                )
            })
        this.createPostListener = API.graphql(graphqlOperation(onCreatePost))
            .subscribe({
                next: postData => {
                    const newPost = postData.value.data.onCreatePost
                    const prevPosts = this.state.posts.filter( post => post.id !== newPost.id)

                    const updatedPosts = [newPost, ...prevPosts]

                    this.setState({ posts: updatedPosts})
                }
            })

        this.deletePostListener = API.graphql(graphqlOperation(onDeletePost))
        .subscribe({
                next: postData => {
                    
                const deletedPost = postData.value.data.onDeletePost
                const updatedPosts = this.state.posts.filter(post => post.id !== deletedPost.id)
                this.setState({posts: updatedPosts})
                }
        })

        this.updatePostListener = API.graphql(graphqlOperation(onUpdatePost))
                .subscribe({
                     next: postData => {
                          const { posts } = this.state
                          const updatePost = postData.value.data.onUpdatePost
                          const index = posts.findIndex(post => post.id === updatePost.id) //had forgotten to say updatePost.id!
                          const updatePosts = [
                              ...posts.slice(0, index),
                             updatePost,
                             ...posts.slice(index + 1)
                            ]

                            this.setState({ posts: updatePosts})

                     }
        })

        this.createPostCommentListener = API.graphql(graphqlOperation(onCreateComment))
        .subscribe({
             next: commentData => {
                  const createdComment = commentData.value.data.onCreateComment
                  let posts = [ ...this.state.posts]

                  for (let post of posts ) {
                       if ( createdComment.post.id === post.id) {
                            post.comments.items.push(createdComment)
                       }
                  }
                  this.setState({ posts})
             }
        })

        this.createPostLikeListener = API.graphql(graphqlOperation(onCreateLike))
            .subscribe({
                next: postData => {
                    const createdLike = postData.value.data.onCreateLike

                    let posts = [...this.state.posts]
                    for (let post of posts){
                        if (createdLike.post.id === post.id){
                            post.likes.items.push(createdLike)
                        }
                    }
                    this.setState({ posts })
                }
            })
    }

    componentWillUnmount(){
        this.createPostListener.unsubscribe()
        this.deletePostListener.unsubscribe()
        this.updatePostListener.unsubscribe()
        this.createPostCommentListener.unsubscribe()
        this.createPostLikeListener.unsubscribe()
    }

    getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts));
        this.setState({ posts: result.data.listPosts.items})
    }
    

    likedPost = (postId) =>{
        for(let post of this.state.posts){
            if(post.id === postId){
                if(post.postOwnerId === this.state.ownerId) return true
                for(let like of post.likes.items){
                    if (like.likeOwnerId === this.state.ownerId){
                        return true;    
                    }
                }
            }
        }
        return false;
    }

    handleLike = async postId =>{
        if(this.likedPost(postId)) {return this.setState({errorMessage: "Can't like your own Post."})}
        else{
            const input = {
                numberLikes: 1,
                likeOwnerId: this.state.ownerId,
                likeOwnerUsername: this.state.ownerUsername,
                likePostId: postId
            }
    
            try {
                await API.graphql(graphqlOperation(createLike, { input }))
            }catch (error){
                console.error(error)
            }
        }
      
    }

    handleMouseHover = async postId => {
        this.setState({isHovering: !this.state.isHovering})
        this.setState({isHoveringId: postId})

        let innerLikes = this.state.postLikedBy

        for (let post of this.state.posts) {
             if (post.id === postId) {
                  for ( let like of post.likes.items) {
                        innerLikes.push(like.likeOwnerUsername)
                  }
             }
             this.setState({postLikedBy: innerLikes})
        }
    }

    handleMouseHoverLeave = () =>{
        this.setState({isHovering: !this.state.isHovering})
        this.setState({postLikedBy: []})
    }

    handleHeaderMenu = (index) => {
        this.setState({burgerMenu: (this.state.burgerMenu === index ? -1 : index)})
    }

    getDP = async (email) => {
        const result = await Storage.list('userDp/')
        this.setState({dp: result})
    }


    render(){
        const { posts, dp } = this.state
        let loggedInUser = this.state.ownerId
     
        return (
            <div>
            <Navbar username={this.state.ownerUsername}/>
            
            <br/>
            <br/>
            <CreatePost />
            {
            posts.map((post) => {
            return (
                <div className="posts" key={post.id} >
                    

                    <div className="post-header">
                        <div className="post-inner-header">
                        
                        
                        {
                            dp.map((dp) => {
                                const x = dp.key.split('/')
                                if(x[1] === post.postOwnerEmail)
                                    post.postOwnerDpURL="https://ncimages144521-nc.s3.amazonaws.com/public/"+dp.key
                                return null
                            })   
                        }
        
                        <img src={post.postOwnerDpURL === null ? user : post.postOwnerDpURL} alt={'user'}/>

                        <p className="post-username">
                            { post.postOwnerUsername}
                            <time style={{ color: "gray", fontStyle: "italic", fontSize: "13px"}}>
                            
                             <br />
                             { new Date(post.createdAt).toDateString()}
                             
                            </time>
                        </p>
                        </div>
                        { post.postOwnerId === loggedInUser&&

                        <div className="post-header-menu">
                            <div id="dots" 
                                onClick={() => this.handleHeaderMenu(post.id)}
                           
                            >
                                <p>.</p>
                                <p>.</p>
                                <p>.</p>
                            </div>
                            <div className={this.state.burgerMenu === post.id ? "burger-menu": ""}>
                                <p className="burger-menu-content">
                                {
                                    <DeletePost data={post} />
                                }
                                
                                {
                                    <EditPost {...post} />
                                }   
                                </p>                            
                           </div>
                        </div>

                        }

                       
                    </div>
                    <div className="line" />
                    <p className="post-body"> { post.postTitle } </p>
                 
                    {post.postBody !== "" &&
                    <img src={post.postBody} alt="postimage" className="postImage" />
                    }
                    <br /> 
                    <span>
                        <span>
                            <p className="alert"> {post.postOwnerId === loggedInUser && this.state.errorMessage} </p>
                            <p onMouseEnter={ () => this.handleMouseHover(post.id)}
                               onMouseLeave={ () => this.handleMouseHoverLeave()} 
                               style={{
                                   color: (post.likes.items.length > 0) ? "blue": "gray",
                                   width: "3em",
                                
                                }}
                               className="like-button"> 
                               <FaThumbsUp /> 
                               <span style={{margin:"2px"}}></span>
                               {post.likes.items.length}
                            </p>
                            
                            {
                                this.state.isHovering &&
                                this.state.isHoveringId === post.id &&
                                <div  className="users-liked"          
                                >
                                    {this.state.postLikedBy.length === 0 ? 
                                    " Liked by No one" : "Liked by: "}
                                    <br/>
                                    <br/>
                                    {this.state.postLikedBy.length === 0 ? 
                                    <FaSadTear /> : <UsersWhoLikedPost data={this.state.postLikedBy}/>}
                                </div>
                            }
                              <p onClick={() => this.handleLike(post.id)} 
                                 className="handlelike"
                              >Like</p>
                        </span>                         
                    </span>

                    <div className="line" />

                    <span>
                       
                        { post.comments.items.length > 0 && <span className="comments">
                             Comments: </span>}
                             {
                                  post.comments.items.map((comment, index) => <CommentPost key={index} commentData={comment}/>)                                
                             }
                            
                    </span>
                    <div className="line" />
                    <CreateCommentPost postId={post.id} />
                </div>
            )
         }
        )
    }</div>) //end of return
    }//end of render
}


export default DisplayPosts;