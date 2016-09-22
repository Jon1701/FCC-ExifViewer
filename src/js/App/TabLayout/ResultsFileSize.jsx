// React.
import React from 'react';
import classNames from 'classnames';

import DataTable from './DataTable.jsx';
import NoData from './NoData.jsx';

export default class ResultsFileSize extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Function to sanitize file size data.
  //
  // Field names are transformed into Natural Language form (eg: CameraFlashMode --> Camera Flash Mode)
  // Field values are transformed into Natural Language form (eg: 0 --> Off, 1 --> On, 2 --> Unknown)
  // File sizes are converted into either KB or MB units.
  //
  // Creates a Map object where the keys are the field names to display.
  // Values are the field values.
  //
  // These are the values which will appear in the final data table.
  sanitizeFileSizeData(data) {

    // Only run if file size data is provided.
    if (data) {

      // Map which will contain the file size.
      var fsMap = new Map();

      // Two cases.
      //
      // Files below 1000000 bytes will use kilobytes.
      // Files above 1000000 bytes will use megabytes.
      if (data.fileSize < 1000000) {

        // Convert file size to kilobytes..
        var fsKilobytes = data.fileSize / 1000;

        // Round to two decimal places, and store in Map.
        fsMap.set('File Size', fsKilobytes.toFixed(2) + ' KB');

      } else {

        // Convert filesize to megabytes.
        var fsMegabytes = data.fileSize / 1000000;

        // Round to two decimal places, and store in Map.
        fsMap.set('File Size', fsMegabytes.toFixed(2) + ' MB');

      };

      return fsMap;

    };
  };

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
    var mapOfFileSizeData = this.sanitizeFileSizeData(this.props.data);

    // Classes to toggle display of the component in its entirety.
    //
    // This component should be displayed only when the tab ID matches
    // the current tab ID.
    var classesDisplayResults = classNames({
      'hidden': this.props.tabId != this.props.currentTab
    });

    return (
      <div className={classesDisplayResults}>
        <DataTable rowMap={mapOfFileSizeData}/>
        <NoData rowMap={mapOfFileSizeData}/>
      </div>
    );
  };// End Component Render.

};

// Prop types.
ResultsFileSize.propTypes = {
  tabId: React.PropTypes.number.isRequired,
  currentTab: React.PropTypes.number.isRequired
};
