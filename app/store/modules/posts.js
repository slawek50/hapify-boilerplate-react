import { flow, set } from 'lodash/fp';
import { omit, mapValues } from 'lodash';

import { CALL_API, Schemas } from '../Schemas';

const FETCH_ALL_POSTS_REQUEST = 'rswa/posts/FETCH_ALL_POSTS_REQUEST';
export const FETCH_ALL_POSTS_SUCCESS = 'rswa/posts/FETCH_ALL_POSTS_SUCCESS';
const FETCH_ALL_POSTS_FAILURE = 'rswa/posts/FETCH_ALL_POSTS_FAILURE';
const FETCH_POST_REQUEST = 'rswa/posts/FETCH_POST_REQUEST';
const FETCH_POST_SUCCESS = 'rswa/posts/FETCH_POST_SUCCESS';
const FETCH_POST_FAILURE = 'rswa/posts/FETCH_POST_FAILURE';
const EDIT_POST = 'rswa/posts/EDIT_POST';

export const postsActionsHandlers = {
  [FETCH_ALL_POSTS_REQUEST]: (state) => flow(
    set('loaded.posts', false),
    set('loading.posts', true),
  )(state),
  [FETCH_ALL_POSTS_SUCCESS]: (state, action) => flow(
    set('entities.posts', mapValues(action.response.entities.posts, (post) => (
      state.entities.posts[post.id] && state.entities.posts[post.id].loaded ? {
        ...state.entities.posts[post.id], // Dont override already loaded posts
      } : {
        ...post,
        loaded: false,
      }
    )) || {}),
    set('loaded.posts', true),
    set('loading.posts', false),
  )(state),
  [FETCH_ALL_POSTS_FAILURE]: (state) => flow(
    set('loaded.posts', 'error'),
    set('loading.posts', false),
  )(state),
  [FETCH_POST_REQUEST]: (state, action) => flow(
    set(`entities.posts.${action.id}.loaded`, false),
  )(state),
  [FETCH_POST_SUCCESS]: (state, action) => flow(
    set(`entities.posts.${action.id}`, {
      ...action.response.entities.posts[action.id],
      loaded: true,
    }),
  )(state),
  [FETCH_POST_FAILURE]: (state, action) => flow(
    set('entities.posts', omit(state.entities.posts, action.id)),
  )(state),
  [EDIT_POST]: (state, action) => flow(
    set(`entities.posts.${action.postId}`, action.post),
  )(state),
};

export function loadPost (id) {
  return {
    id,
    [CALL_API]: {
      types: [FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAILURE],
      method: 'GET',
      endpoint: `/posts/${id}`,
      schema: Schemas.POST,
    },
  };
}

export function loadPosts () {
  return {
    [CALL_API]: {
      types: [FETCH_ALL_POSTS_REQUEST, FETCH_ALL_POSTS_SUCCESS, FETCH_ALL_POSTS_FAILURE],
      method: 'GET',
      endpoint: '/admin/place?_page=0&_limit=10',
      schema: Schemas.POST_ARRAY,
      successMessage: 'Posts fetched successfully',
      // successNext: [
      //   state => fetchComments(state.data.entities),
      //   state => fetchComments(state.data.entities),
      // ],
    },
  };
}

export function editPost (postId, post) {
  return {
    type: EDIT_POST,
    postId,
    post,
  };
}
