import {
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POSTS,
} from "../../constants/actionTypes";

export const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts,
  };
};

export const createPost = (post) => {
  return {
    type: CREATE_POST,
    payload: post,
  };
};

export const editPost = (post) => {
  return {
    type: EDIT_POST,
    payload: post,
  };
};

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: id,
  };
};
