// React.
import React from 'react';
import classNames from 'classnames';

import DataTable from './DataTable.jsx';
import NoData from './NoData.jsx';

export default class ResultsImageData extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  sanitizeImageData(data) {
    if (data) {
      var mapOfImageData = new Map();

      mapOfImageData.set('Field Name', 'Field Value');

      return mapOfImageData
    }

  }

  // Component Render.
  render() {

    // Sanitizes file size data from the server.
    //
    // Field names are transformed into Natural Language form (eg: CameraFlashMode --> Camera Flash Mode)
    // Field values are transformed into Natural Language form (eg: 0 --> Off, 1 --> On, 2 --> Unknown)
    //
    // Creates a Map object where the keys are the field names to display.
    // Values are the field values.
    //
    // These are the values which will appear in the final data table.
    var mapOfImageData = this.sanitizeImageData(this.props.data);

    // Classes to toggle display of the component in its entirety.
    //
    // This component should be displayed only when the tab ID matches
    // the current tab ID.
    var classesDisplayResults = classNames({
      'hidden': this.props.tabId != this.props.currentTab
    });

    return (
      <div className={classesDisplayResults}>
        <DataTable rowMap={mapOfImageData} originalData={this.props.data}/>
        <NoData originalData={this.props.data}/>
      </div>
    );
  };// End Component Render.

};

// Prop types.
ResultsImageData.propTypes = {
  tabId: React.PropTypes.number.isRequired,
  currentTab: React.PropTypes.number.isRequired
};
