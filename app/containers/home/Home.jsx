import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BaseLayout from '../shared/BaseLayout';

import Welcome from '../../components/home/Welcome';

const Home = ({ name, welcomeMessage }) => (
  <BaseLayout title="MyContainer">
    <Welcome
      name={name}
      welcomeMessage={welcomeMessage}
    />
  </BaseLayout>
);

Home.propTypes = {
  name: PropTypes.string.isRequired,
  welcomeMessage: PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    name: state.auth.user.name,
    welcomeMessage: state.data.entities.options.welcomeMessage,
  }),
)(Home);
