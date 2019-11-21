import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gravatar from 'gravatar';

const AvatarOrInitals = ({ account }) => {
  const [hideGravatar, setHideGravatar] = useState(false);
  const intials = account && account.firstname && account.firstname[0] + account.lastname[0];
  return (
    <div className="user-avatar-block">
      { hideGravatar === true ? (
        <div className="user-initial">{intials}</div>
      ) : (
        <div className="user-avatar">
          <img
            src={gravatar.url(account.email, { d: 404 })}
            onError={() => setHideGravatar(true)}
            alt={intials}
          />
        </div>
      )}
    </div>
  );
};

AvatarOrInitals.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default AvatarOrInitals;
