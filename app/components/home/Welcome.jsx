import React from 'react';
import PropTypes from 'prop-types';

const Welcome = ({ name, welcomeMessage }) => (
  <div>
    <div>
      {name}
, Welcome to the &quot;ReactWebApp starter WebApp&quot;
    </div>
    <div>{welcomeMessage}</div>
  </div>
);

Welcome.propTypes = {
  name: PropTypes.string,
  welcomeMessage: PropTypes.string,
};

export default Welcome;
