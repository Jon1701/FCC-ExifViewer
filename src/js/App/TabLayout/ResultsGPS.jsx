// React.
import React from 'react';
import classNames from 'classnames';

import DataTable from './DataTable.jsx';
import NoData from './NoData.jsx';

export default class ResultsGPS extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Function to take raw EXIF data, rename properties and values to use
  // natural language labels and values.
  // Function to sanitize file size data.
  //
  // Field names are transformed into Natural Language form (eg: CameraFlashMode --> Camera Flash Mode)
  // Field values are transformed into Natural Language form (eg: 0 --> Off, 1 --> On, 2 --> Unknown)
  //
  // Creates a Map object where the keys are the field names to display.
  // Values are the field values.
  //
  // These are the values which will appear in the final data table.
  sanitizeGPSData(gpsData) {

    // Function which copies Tag values.
    //
    //  key: Tag name.
    //  obj: Object containing EXIF data.
    function copyValue(key, obj) {
      try {
        return obj[key];
      } catch(e) {
        return null;
      };
    };

    function reformatDMS(location, direction) {
      if (location != null && direction !== null) {

        const degrees = location[0] + 'º';
        const minutes = location[1] + '\'';
        const seconds = location[2] + '\'\'';

        return [direction, degrees, minutes, seconds].join(' ');

      }
    }

    // Only transform if data is provided.
    if (gpsData) {

      // Get latitude and longitude in DMS format
      var latitudeDMS = reformatDMS(gpsData['GPSLatitude'], gpsData['GPSLatitudeRef']);
      var longitudeDMS = reformatDMS(gpsData['GPSLongitude'], gpsData['GPSLongitudeRef']);

      // Map to hold sanitized EXIF data. (Ordered Object).
      var mapOfGPSData = new Map();
      mapOfGPSData.set('Latitude', latitudeDMS);
      mapOfGPSData.set('Longitude', longitudeDMS);

      // Remove empty entries.
      //
      // If the value for the current key is null, delete the key along with
      // its value.
      mapOfGPSData.forEach((value, key, mapObj) => {
        if (value == null) {
          mapOfGPSData.delete(key);
        };
      });

      return mapOfGPSData

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
    var mapOfGPSData = this.sanitizeGPSData(this.props.data);

    // Classes to toggle display of the component in its entirety.
    //
    // This component should be displayed only when the tab ID matches
    // the current tab ID.
    var classesDisplayResults = classNames({
      'hidden': this.props.tabId != this.props.currentTab
    });

    return (
      <div className={classesDisplayResults}>
        <DataTable rowMap={mapOfGPSData}/>
        <NoData rowMap={mapOfGPSData}/>
      </div>
    );
  };// End Component Render.

};

// Prop types.
ResultsGPS.propTypes = {
  tabId: React.PropTypes.number.isRequired,
  currentTab: React.PropTypes.number.isRequired
};
