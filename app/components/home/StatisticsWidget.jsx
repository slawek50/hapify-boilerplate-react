import React from 'react';
import PropTypes from 'prop-types';
import accounting from 'accounting';

const StatisticsWidget = ({ interventionType, statistics = {} }) => (
  <div className="grid-noBottom-noGutter data-widget-list">
    <div className="col">
      <div className="data-widget">
        <div className="data-widget-value">
          {statistics.totalYear}
        </div>
        <div className="data-widget-name">
          {interventionType}
          {' '}
de l’année
        </div>
      </div>
    </div>
    <div className="col">
      <div className="data-widget">
        <div className="data-widget-value">
          {accounting.formatMoney(statistics.totalYearCA, '', 0, ' ')}
        </div>
        <div className="data-widget-name">
          {interventionType}
          {' '}
CA de l’année
        </div>
      </div>
    </div>
    <div className="col">
      <div className="data-widget">
        <div className="data-widget-value">
          {statistics.totalMonth}
        </div>
        <div className="data-widget-name">
          {interventionType}
          {' '}
du mois
        </div>
      </div>
    </div>
    <div className="col">
      <div className="data-widget">
        <div className="data-widget-value">
          {accounting.formatMoney(statistics.totalMonthCA, '', 0, ' ')}
        </div>
        <div className="data-widget-name">
          {interventionType}
          {' '}
CA du mois
        </div>
      </div>
    </div>
  </div>
);

StatisticsWidget.propTypes = {
  interventionType: PropTypes.string.isRequired,
  statistics: PropTypes.shape({
    totalYear: PropTypes.number,
    totalYearCA: PropTypes.number,
    totalMonth: PropTypes.number,
  }).isRequired,
};

export default StatisticsWidget;
