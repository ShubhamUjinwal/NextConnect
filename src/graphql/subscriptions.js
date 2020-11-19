/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      postOwnerEmail
      postOwnerDpURL
      createdAt
      user {
        id
        user
        userDP
        about
        post {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          commentOwnerId
          commentOwnerUsername
          commentOwnerEmail
          commentOwnerDpURL
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      postOwnerEmail
      postOwnerDpURL
      createdAt
      user {
        id
        user
        userDP
        about
        post {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          commentOwnerId
          commentOwnerUsername
          commentOwnerEmail
          commentOwnerDpURL
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      postOwnerEmail
      postOwnerDpURL
      createdAt
      user {
        id
        user
        userDP
        about
        post {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          commentOwnerId
          commentOwnerUsername
          commentOwnerEmail
          commentOwnerDpURL
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      commentOwnerId
      commentOwnerUsername
      commentOwnerEmail
      commentOwnerDpURL
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        postOwnerEmail
        postOwnerDpURL
        createdAt
        user {
          id
          user
          userDP
          about
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      commentOwnerId
      commentOwnerUsername
      commentOwnerEmail
      commentOwnerDpURL
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        postOwnerEmail
        postOwnerDpURL
        createdAt
        user {
          id
          user
          userDP
          about
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      commentOwnerId
      commentOwnerUsername
      commentOwnerEmail
      commentOwnerDpURL
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        postOwnerEmail
        postOwnerDpURL
        createdAt
        user {
          id
          user
          userDP
          about
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
      id
      numberLikes
      likeOwnerId
      likeOwnerUsername
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        postOwnerEmail
        postOwnerDpURL
        createdAt
        user {
          id
          user
          userDP
          about
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
      id
      numberLikes
      likeOwnerId
      likeOwnerUsername
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        postOwnerEmail
        postOwnerDpURL
        createdAt
        user {
          id
          user
          userDP
          about
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
      id
      numberLikes
      likeOwnerId
      likeOwnerUsername
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        postOwnerEmail
        postOwnerDpURL
        createdAt
        user {
          id
          user
          userDP
          about
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      user
      userDP
      about
      post {
        items {
          id
          postOwnerId
          postOwnerUsername
          postTitle
          postBody
          postOwnerEmail
          postOwnerDpURL
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      user
      userDP
      about
      post {
        items {
          id
          postOwnerId
          postOwnerUsername
          postTitle
          postBody
          postOwnerEmail
          postOwnerDpURL
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      user
      userDP
      about
      post {
        items {
          id
          postOwnerId
          postOwnerUsername
          postTitle
          postBody
          postOwnerEmail
          postOwnerDpURL
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
