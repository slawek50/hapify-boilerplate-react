import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { map } from 'lodash';

const UploadContentsListView = ({ uploadContents, baseUrl }) => (
  <div>
    <h1>Liste des UploadContents</h1>
    <NavLink to={`${baseUrl}/new`}>
      Créer un uploadContent
    </NavLink>
    <ul>
      {map(uploadContents, (uploadContent) => (
        <li key={uploadContent.upload_content_id}>
          <NavLink to={`${baseUrl}/${uploadContent.upload_content_id}`}>
            {uploadContent.upload_content_id}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

UploadContentsListView.propTypes = {
  uploadContents: PropTypes.objectOf(PropTypes.shape({
    upload_content_id: PropTypes.number.isRequired,
  })).isRequired,

  baseUrl: PropTypes.string.isRequired,
};

export default UploadContentsListView;
