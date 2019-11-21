import React from 'react';
import PropTypes from 'prop-types';

const HLink = ({ title, link }) => (
  <a href={link} title={title}>{title}</a>
);

HLink.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default HLink;
