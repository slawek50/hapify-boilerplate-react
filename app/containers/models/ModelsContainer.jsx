import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { withRouter, Switch, Route } from 'react-router-dom';
import { keys } from 'lodash';

import { createOrUpdateModel, deleteModel } from '../../store/modules/models';

import BaseLayout from '../shared/BaseLayout';

import ModelDetailView from '../../components/models/ModelDetailView';
import ModelEditForm from '../../components/models/ModelEditForm';
import ModelsListView from '../../components/models/ModelsListView';
import ModelsTableListView from '../../components/models/ModelsTableListView';
import ModelsCardListView from '../../components/models/ModelsCardListView';

import modalDefaultClass from '../../utils/ModalDefaultClass';

const RenderEditDetailsModalsRouter = ({
  url, editModel, delModel, push, models,
}) => (
  <Switch>
    <Route
      exact
      path={`${url}/new`}
      render={() => (
        <Modal {...modalDefaultClass} isOpen onRequestClose={() => push(url)}>
          <ModelEditForm
            initialValues={{}}
            onSubmit={(v) => {
              editModel(v)
              .then(() => push(url));
            }}
            baseUrl={url}
          />
        </Modal>
      )}
    />
    <Route
      exact
      path={`${url}/:modelId/edit`}
      render={(subProps) => (
        <Modal {...modalDefaultClass} isOpen onRequestClose={() => push(url)}>
          <ModelEditForm
            initialValues={models[subProps.match.params.modelId]}
            onSubmit={(v) => {
              editModel(v)
              .then(() => push(url));
            }}
            baseUrl={url}
          />
        </Modal>
      )}
    />
    <Route
      exact
      path={`${url}/:modelId`}
      render={(subProps) => (
        <Modal {...modalDefaultClass} isOpen onRequestClose={() => push(url)}>
          <ModelDetailView
            model={models[subProps.match.params.modelId]}
            baseUrl={url}
            onClickDelete={() => {
              delModel(subProps.match.params.modelId)
              .then(() => push(url));
            }}
          />
        </Modal>
      )}
    />
  </Switch>
);

RenderEditDetailsModalsRouter.propTypes = {
  url: PropTypes.string.isRequired,
  editModel: PropTypes.func.isRequired,
  delModel: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  models: PropTypes.objectOf(PropTypes.shape()).isRequired,
};

const ModelsContainer = ({
  match: { url }, history: { push }, models, ...props
}) => (
  <BaseLayout title="ModelsContainer">
    <Switch>
      <Route
        exact
        path={url}
        render={() => (
          <ModelsListView models={models} baseUrl={url} />
        )}
      />
      <Route
        path={`${url}/cards`}
        render={({ match }) => (
          <>
            <ModelsCardListView
              models={models}
              baseUrl={match.url}
              onClickDelete={(modelId) => {
                props.deleteModel(modelId)
                .then(() => push(match.url));
              }}
            />
            <RenderEditDetailsModalsRouter
              url={match.url}
              editModel={props.createOrUpdateModel}
              delModel={props.deleteModel}
              push={push}
              models={models}
            />
          </>
        )}
      />
      <Route
        path={`${url}/table`}
        render={({ match }) => (
          <>
            <ModelsTableListView
              models={models}
              baseUrl={match.url}
              onClickDelete={(modelId) => {
                props.deleteModel(modelId)
                .then(() => push(match.url));
              }}
            />
            <RenderEditDetailsModalsRouter
              url={match.url}
              editModel={props.createOrUpdateModel}
              delModel={props.deleteModel}
              push={push}
              models={models}
            />
          </>
        )}
      />
      <Route
        exact
        path={`${url}/new`}
        render={() => (
          <ModelEditForm
            initialValues={{}}
            onSubmit={(v) => {
              props.createOrUpdateModel(v)
              .then(({ response }) => push(`${url}/${keys(response.entities.models)[0]}`));
            }}
            baseUrl={url}
          />
        )}
      />
      <Route
        exact
        path={`${url}/:modelId/edit`}
        render={({ match }) => (
          <ModelEditForm
            initialValues={models[match.params.modelId]}
            onSubmit={(v) => {
              props.createOrUpdateModel(v)
              .then(() => push(`${url}/${match.params.modelId}`));
            }}
            baseUrl={url}
          />
        )}
      />
      <Route
        exact
        path={`${url}/:modelId`}
        render={({ match }) => (
          <ModelDetailView
            model={models[match.params.modelId]}
            baseUrl={url}
            onClickDelete={() => {
              props.deleteModel(match.params.modelId)
              .then(() => push(url));
            }}
          />
        )}
      />
    </Switch>
  </BaseLayout>
);

ModelsContainer.propTypes = {
  createOrUpdateModel: PropTypes.func.isRequired,
  deleteModel: PropTypes.func.isRequired,

  models: PropTypes.objectOf(PropTypes.shape()).isRequired,

  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  (state) => ({
    models: state.data.entities.models,
  }),
  { createOrUpdateModel, deleteModel },
)(withRouter(ModelsContainer));
