import { flow, set } from 'lodash/fp';
import { omit } from 'lodash';

import { CALL_API, Schemas } from '../Schemas';

const FETCH_ALL_UPLOAD_CONTENTS_REQUEST = 'rswa/uploadContents/FETCH_ALL_UPLOAD_CONTENTS_REQUEST';
export const FETCH_ALL_UPLOAD_CONTENTS_SUCCESS = 'rswa/uploadContents/FETCH_ALL_UPLOAD_CONTENTS_SUCCESS';
const FETCH_ALL_UPLOAD_CONTENTS_FAILURE = 'rswa/uploadContents/FETCH_ALL_UPLOAD_CONTENTS_FAILURE';
const FETCH_UPLOAD_CONTENT_REQUEST = 'rswa/uploadContents/FETCH_UPLOAD_CONTENT_REQUEST';
const FETCH_UPLOAD_CONTENT_SUCCESS = 'rswa/uploadContents/FETCH_UPLOAD_CONTENT_SUCCESS';
const FETCH_UPLOAD_CONTENT_FAILURE = 'rswa/uploadContents/FETCH_UPLOAD_CONTENT_FAILURE';
const SET_UPLOAD_CONTENT_REQUEST = 'rswa/uploadContents/SET_UPLOAD_CONTENT_REQUEST';
const SET_UPLOAD_CONTENT_SUCCESS = 'rswa/uploadContents/SET_UPLOAD_CONTENT_SUCCESS';
const SET_UPLOAD_CONTENT_FAILURE = 'rswa/uploadContents/SET_UPLOAD_CONTENT_FAILURE';
const DELETE_UPLOAD_CONTENT_REQUEST = 'rswa/uploadContents/DELETE_UPLOAD_CONTENT_REQUEST';
const DELETE_UPLOAD_CONTENT_SUCCESS = 'rswa/uploadContents/DELETE_UPLOAD_CONTENT_SUCCESS';
const DELETE_UPLOAD_CONTENT_FAILURE = 'rswa/uploadContents/DELETE_UPLOAD_CONTENT_FAILURE';

export const uploadContentsActionsHandlers = {
  [FETCH_ALL_UPLOAD_CONTENTS_REQUEST]: (state) => flow(
    set('loaded.uploadContents', false),
    set('loading.uploadContents', true),
  )(state),
  [FETCH_ALL_UPLOAD_CONTENTS_SUCCESS]: (state, action) => flow(
    set('entities.uploadContents', action.response.entities.uploadContents || {}),
    set('loaded.uploadContents', true),
    set('loading.uploadContents', false),
  )(state),
  [FETCH_ALL_UPLOAD_CONTENTS_FAILURE]: (state) => flow(
    set('loaded.uploadContents', 'error'),
    set('loading.uploadContents', false),
  )(state),
  [FETCH_UPLOAD_CONTENT_SUCCESS]: (state, action) => flow(
    set(`entities.uploadContents.${action.id}`, action.response.entities.uploadContents),
  )(state),
  [SET_UPLOAD_CONTENT_SUCCESS]: (state, action) => flow(
    set('entities.uploadContents', {
      ...state.entities.uploadContents,
      ...action.response.entities.uploadContents,
    }),
  )(state),
  [DELETE_UPLOAD_CONTENT_SUCCESS]: (state, action) => flow(
    set('entities.uploadContents', omit(state.entities.uploadContents, action.id)),
  )(state),
};

export function loadUploadContent (id) {
  return {
    id,
    [CALL_API]: {
      types: [
        FETCH_UPLOAD_CONTENT_REQUEST,
        FETCH_UPLOAD_CONTENT_SUCCESS,
        FETCH_UPLOAD_CONTENT_FAILURE,
      ],
      method: 'GET',
      endpoint: `/uploadContents/${id}`,
      schema: Schemas.UPLOAD_CONTENT,
    },
  };
}

export function loadUploadContents () {
  return {
    [CALL_API]: {
      types: [
        FETCH_ALL_UPLOAD_CONTENTS_REQUEST,
        FETCH_ALL_UPLOAD_CONTENTS_SUCCESS,
        FETCH_ALL_UPLOAD_CONTENTS_FAILURE,
      ],
      method: 'GET',
      endpoint: '/uploadContents',
      schema: Schemas.UPLOAD_CONTENT_ARRAY,
      successMessage: 'UploadContents fetched successfully',
    },
  };
}

export function createOrUpdateUploadContent (uploadContent) {
  return {
    [CALL_API]: {
      types: [SET_UPLOAD_CONTENT_REQUEST, SET_UPLOAD_CONTENT_SUCCESS, SET_UPLOAD_CONTENT_FAILURE],
      method: !uploadContent || !Number.isInteger(uploadContent.upload_content_id) ? 'POST' : 'PUT',
      endpoint: !uploadContent || !Number.isInteger(uploadContent.upload_content_id)
        ? '/uploadContents'
        : `/uploadContents/${uploadContent.upload_content_id}`,
      schema: Schemas.UPLOAD_CONTENT,
      body: uploadContent,
      successMessage: 'UploadContents saved successfully',
    },
  };
}

export function deleteUploadContent (id) {
  return {
    id,
    [CALL_API]: {
      types: [
        DELETE_UPLOAD_CONTENT_REQUEST,
        DELETE_UPLOAD_CONTENT_SUCCESS,
        DELETE_UPLOAD_CONTENT_FAILURE,
      ],
      method: 'DELETE',
      endpoint: `/uploadContents/${id}`,
      successMessage: 'UploadContents deleted successfully',
    },
  };
}
