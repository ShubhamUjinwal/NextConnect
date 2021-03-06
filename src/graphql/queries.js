/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          items{
            id
            commentOwnerId
            commentOwnerUsername
            commentOwnerEmail
            commentOwnerDpURL
            content
            createdAt
          }
        }
        likes {
          items {
            id
            numberLikes
            likeOwnerId
            likeOwnerUsername
          }
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
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
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
