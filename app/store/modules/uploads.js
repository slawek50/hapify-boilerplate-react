import { CALL_API } from '../Schemas';

const UPLOADS_REQUEST = 'rswa/uploads/UPLOADS_REQUEST';
const UPLOADS_SUCCESS = 'rswa/uploads/UPLOADS_SUCCESS';
const UPLOADS_FAILURE = 'rswa/uploads/UPLOADS_FAILURE';
const DELETE_REQUEST = 'rswa/uploads/DELETE_REQUEST';
const DELETE_SUCCESS = 'rswa/uploads/DELETE_SUCCESS';
const DELETE_FAILURE = 'rswa/uploads/DELETE_FAILURE';

export const uploadsActionsHandlers = {
};

export function uploadFiles (files) {
  return {
    [CALL_API]: {
      types: [UPLOADS_REQUEST, UPLOADS_SUCCESS, UPLOADS_FAILURE],
      method: 'POST',
      endpoint: '/uploads',
      body: {
        files: Array.isArray(files) ? files : [files],
      },
      upload: true,
    },
  };
}

export function removeFile (filesToRemove) {
  return {
    [CALL_API]: {
      types: [DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE],
      method: 'DELETE',
      endpoint: '/uploads',
      body: {
        filesToRemove,
      },
      upload: true,
    },
  };
}
