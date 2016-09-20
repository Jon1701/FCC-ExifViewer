// React.
import React from 'react';
import classNames from 'classnames';

export default class ResultsExif extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Function to take raw EXIF data, rename properties and values to use
  // natural language labels and values.
  sanitizeExifData(oldExifData) {

    // Function which remaps EXIF property values.
    //
    // For example: The Contrast property takes on values: 0, 1, or 2.
    // This function can remap 0, 1, or 2, to 'Normal', 'Low', or 'High',
    // respectively.
    function remapValue(key, obj) {

      // EXIF tag value mapping from integers to strings.
      //
      // Keys are EXIF tag names. Subkeys are the integer values the tag takes
      // on, and its associated values are the string representation of the values.
      //
      // Example:
      //  "Compression": {  <--- EXIF Tag Name
      //    "1": "Compressed", <--- Transforms Tag Value of "1" to "Pentax PEF Compressed".
      //    "65535": "Pentax PEF Compressed"
      //  }
      var exifMapping = require('json!exif_mapping.json');

      try {

        // Key: EXIF Tag name.
        // exifValue: EXIF Tag value.
        var exifValue = obj[key]

        // Return the string representation of the EXIF Tag value.
        return exifMapping[key][exifValue];

      } catch(e) {

        // Return null if no value could be looked up.
        return null;

      };
    };

    // Function which copies EXIF Tag values.
    //
    //  key: EXIF Tag name.
    //  obj: Object containing EXIF data.
    function copyValue(key, obj) {
      try {
        return obj[key];
      } catch(e) {
        return null;
      };
    };

    // Map to hold sanitized EXIF data. (Ordered Object).
    var newExifData = new Map();
    newExifData.set('Contrast', copyValue('Contrast', oldExifData));
    newExifData.set('Height', copyValue('ExifImageHeight', oldExifData));
    newExifData.set('Width', copyValue('ExifImageWidth', oldExifData));
    newExifData.set('Exposure Compensation', copyValue('ExposureCompensation', oldExifData));
    newExifData.set('Exposure Mode', remapValue('ExposureMode', oldExifData));
    newExifData.set('Exposure Program', remapValue('ExposureProgram', oldExifData));
    newExifData.set('Exposure Time', copyValue('ExposureTime', oldExifData));
    newExifData.set('F-Stop', copyValue('FNumber', oldExifData));
    newExifData.set('Flash', remapValue('Flash', oldExifData));
    newExifData.set('Focal Length', copyValue('FocalLength', oldExifData));
    newExifData.set('ISO', copyValue('ISO', oldExifData));
    newExifData.set('Light Source', remapValue('LightSource', oldExifData));
    newExifData.set('Metering Mode', remapValue('MeteringMode', oldExifData));
    newExifData.set('Saturation', remapValue('Saturation', oldExifData));
    newExifData.set('Sharpness', remapValue('Sharpness', oldExifData));

    return newExifData;

  };

  // Function to create table rows and cells for sanitized Exif data.
  createRows(exifData) {

    // Array to store HTML rows and cells for the table.
    var results = [];

    // Iterate over the sanitized Exif data and create rows and cells.
    exifData.forEach((tagValue, tagName, mapObj) => {

      // Create and store row.
      results.push(
        <div className="row" key={tagName}>
          <div className="cell">
            {tagName}
          </div>
          <div className="cell">
            {tagValue}
          </div>
        </div>
      ); // End row creation and storing.

    }); // End iteration.

    return results;
  };

  // Component Render.
  render() {

    // Sanitize raw exif data.
    // Rewrite field names using natural language,
    // Decode integer values into natural language.
    var newExifData = this.sanitizeExifData(this.props.data);

    // Create table rows and cells using sanitized Exif data.
    var rows = this.createRows(newExifData);

    // Classes to toggle display of the component in its entirety.
    //
    // This component should be displayed only when the tab ID matches
    // the current tab ID.
    var classesDisplayResults = classNames({
      'hidden': this.props.tabId != this.props.currentTab
    });

    // Classes to toggle display of the data table.
    //
    // If this.props.data is undefined, then no Exif data was sent,
    // and the table should be hidden
    var classesDisplayTable = classNames({
      'hidden': typeof(this.props.data) == 'undefined',
      'tbl': true
    });

    // Classes to toggle displaying of No Data Available message.
    //
    // If this.props.data is undefined, this means no Exif data
    // was passed down. Therefore this div must not be hidden when
    // no Exif data is provided.
    var classesNoDataAvailable = classNames({
      'hidden': typeof(this.props.data) != 'undefined',
      'text-center': true
    });

    return (
      <div className={classesDisplayResults}>
        <div className={classesDisplayTable}>
          {rows}
        </div>
        <div className={classesNoDataAvailable}>
          No data available
        </div>
      </div>
    )
  };// End Component Render.

};

// Prop types.
ResultsExif.propTypes = {
  tabId: React.PropTypes.number.isRequired,
  currentTab: React.PropTypes.number.isRequired
};
