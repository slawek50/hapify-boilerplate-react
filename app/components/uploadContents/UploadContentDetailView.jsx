import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { get } from 'lodash';

const UploadContentDetailView = ({ uploadContent = {}, baseUrl }) => (
  <div>
    <div>
      ID:&nbsp;
      {uploadContent.upload_content_id}
    </div>
    <div>
      Nombre de fichiers:&nbsp;
      {get(uploadContent, 'fileNames.length')}
    </div>
    <NavLink to={`${baseUrl}/edit`}>
      Editer
    </NavLink>
  </div>
);

UploadContentDetailView.propTypes = {
  uploadContent: PropTypes.shape({
    upload_content_id: PropTypes.number.isRequired,
    fileNames: PropTypes.array.isRequired,
  }).isRequired,

  baseUrl: PropTypes.string.isRequired,
};

export default UploadContentDetailView;
