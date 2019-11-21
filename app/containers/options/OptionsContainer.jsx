import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import { updateOption } from '../../store/modules/options';

import BaseLayout from '../shared/BaseLayout';

import OptionEditForm from '../../components/options/OptionEditForm';
import OptionsListView from '../../components/options/OptionsListView';

const OptionsContainer = ({
  match: { url }, history: { push }, options, ...props
}) => (
  <BaseLayout title="OptionsContainer" isBoxContent>
    <Switch>
      <Route
        exact
        path={url}
        render={() => (
          <OptionsListView options={options} baseUrl={url} />
        )}
      />
      <Route
        exact
        path={`${url}/:optionName/edit`}
        render={({ match }) => (
          <OptionEditForm
            initialValues={{
              name: match.params.optionName,
              data: options[match.params.optionName],
            }}
            onSubmit={(v) => {
              props.updateOption(match.params.optionName, v.data)
              .then(() => push(url));
            }}
          />
        )}
      />
    </Switch>
  </BaseLayout>
);

OptionsContainer.propTypes = {
  updateOption: PropTypes.func.isRequired,

  options: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
  ])).isRequired,

  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  (state) => ({
    options: state.data.entities.options,
  }),
  { updateOption },
)(withRouter(OptionsContainer));
