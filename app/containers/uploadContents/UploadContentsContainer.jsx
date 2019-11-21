import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { keys } from 'lodash';

import { createOrUpdateUploadContent, deleteUploadContent } from '../../store/modules/uploadContents';

import BaseLayout from '../shared/BaseLayout';

import UploadContentDetailView from '../../components/uploadContents/UploadContentDetailView';
import UploadContentEditForm from '../../components/uploadContents/UploadContentEditForm';
import UploadContentsListView from '../../components/uploadContents/UploadContentsListView';

const UploadContentsContainer = ({
  match: { url }, history: { push }, uploadContents, ...props
}) => (
  <BaseLayout title="UploadContentsContainer" isBoxContent>
    <Switch>
      <Route
        exact
        path={url}
        render={() => (
          <UploadContentsListView uploadContents={uploadContents} baseUrl={url} />
        )}
      />
      <Route
        exact
        path={`${url}/new`}
        render={() => (
          <UploadContentEditForm
            initialValues={{}}
            onSubmit={(v) => {
              props.createOrUpdateUploadContent(v)
              .then(({ response }) => push(`${url}/${keys(response.entities.uploadContents)[0]}`));
            }}
          />
        )}
      />
      <Route
        exact
        path={`${url}/:uploadContentId/edit`}
        render={({ match }) => (
          <UploadContentEditForm
            initialValues={uploadContents[match.params.uploadContentId]}
            onSubmit={(v) => {
              props.createOrUpdateUploadContent(v)
              .then(() => push(`${url}/${match.params.uploadContentId}`));
            }}
            onClickDelete={() => {
              props.deleteUploadContent(match.params.uploadContentId)
              .then(() => push(url));
            }}
          />
        )}
      />
      <Route
        exact
        path={`${url}/:uploadContentId`}
        render={({ match }) => (
          <UploadContentDetailView
            uploadContent={uploadContents[match.params.uploadContentId]}
            baseUrl={match.url}
          />
        )}
      />
    </Switch>
  </BaseLayout>
);

UploadContentsContainer.propTypes = {
  createOrUpdateUploadContent: PropTypes.func.isRequired,
  deleteUploadContent: PropTypes.func.isRequired,

  uploadContents: PropTypes.objectOf(PropTypes.shape()).isRequired,

  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  (state) => ({
    uploadContents: state.data.entities.uploadContents,
  }),
  { createOrUpdateUploadContent, deleteUploadContent },
)(withRouter(UploadContentsContainer));
