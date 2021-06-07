import {
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POSTS,
} from "../../constants/actionTypes";

export const postReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload };
    case CREATE_POST:
      return { ...state, posts: [payload, ...state.posts] };
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === payload.id) {
            const updatedPost = { ...post, title: payload.title };
            return updatedPost;
          }
          return post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
      };
    default:
      return state;
  }
};
