import React from 'react';
import { Link } from 'react-router-dom';

import BaseLayout from './BaseLayout';

const PageNotFound = () => (
  <BaseLayout title="Tableau de bord">
    <div className="grid">
      <div className="col">
        <div>
          <h1>Impossible de trouver la page... :(</h1>
          <Link to="/">Retourner sur la page d&apos;accueil</Link>
        </div>
      </div>
    </div>
  </BaseLayout>
);

export default PageNotFound;
