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
  sanitizeImageData(imgData) {

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

    // Only transform if data is provided.
    if (imgData) {

      // Map to hold sanitized EXIF data. (Ordered Object).
      var mapOfImageData = new Map();
      mapOfImageData.set('Artist', copyValue('Artist', imgData));
      mapOfImageData.set('Copyright', copyValue('Copyright', imgData));
      mapOfImageData.set('Camera Manufacturer', copyValue('Make', imgData));
      mapOfImageData.set('Camera Model', copyValue('Model', imgData));
      mapOfImageData.set('Horizontal Resolution', copyValue('XResolution', imgData));
      mapOfImageData.set('Vertical Resolution', copyValue('YResolution', imgData));

      // Remove empty entries.
      //
      // If the value for the current key is null, delete the key along with
      // its value.
      mapOfImageData.forEach((value, key, mapObj) => {
        if (value == null) {
          mapOfImageData.delete(key);
        };
      });

      return mapOfImageData

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
        <DataTable rowMap={mapOfImageData}/>
        <NoData rowMap={mapOfImageData}/>
      </div>
    );
  };// End Component Render.

};

// Prop types.
ResultsImageData.propTypes = {
  tabId: React.PropTypes.number.isRequired,
  currentTab: React.PropTypes.number.isRequired
};
