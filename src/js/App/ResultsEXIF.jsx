// React.
import React from 'react';

// JSON mapping data.
var compressionMapping = require('json!exif_compression.json');
var flashMapping = require('json!exif_flash.json');
var lightSourceMapping = require('json!exif_lightsource.json');


// Component Definition.
export default class ResultsEXIF extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Bind methods to component instance.
    this.prettyPrintExif = this.prettyPrintExif.bind(this);
  };

  // Function to take raw EXIF data, rename properties and values to use
  // natural language labels and values.
  prettyPrintExif(exif) {

    // Function which remaps EXIF property values.
    //
    // For example: The Contrast property takes on values: 0, 1, or 2.
    // This function can remap 0, 1, or 2, to 'Normal', 'Low', or 'High',
    // respectively.
    function remapValue(key, mapping, obj) {

      // Get the value of the key.
      try {
        return mapping[obj[key]];
      } catch(e) {
        return null;
      };
    };

    function copyValue(key, obj) {
      try {
        return obj[key];
      } catch(e) {
        return null;
      }
    }

    // Object to hold sanitized EXIF data.
    var newExif = {};

    // Contrast
    newExif = {
      'Contrast': copyValue('Contrast', exif),
      'Height':   copyValue('ExifImageHeight', exif),
      'Width':    copyValue('ExifImageWidth', exif),
      'Exposure Compensation': copyValue('ExposureCompensation', exif),
      'Exposure Mode': remapValue('ExposureMode', {0: 'Auto', 1: 'Manual', 2: 'Auto Bracket'}, exif),
    }

    /*
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    newExif[''] = copyValue('', exif);
    */

    // ExposureMode
    // ExposureProgram
    // ExposureTime
    // FNumber
    // Flash
    // FocalLength
    // FocalLengthIn35mmFormat
    // GainControl
    // ISO
    // LightSource
    // MaxApertureValue
    // MeteringMode
    // Saturation
    // Sharpness


    /*

    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    newExif[''] = remapValue('', {}, exif);
    */

    console.log(newExif)

    //console.log(remapValue('Contrast', {0: 'Normal', 1: 'Low', 2: 'High'}, exif));
  };

  // Component Render.
  render() {

    var x = this.prettyPrintExif(this.props.exif)

    console.log(this.props.exif)

    return (
      <div className="row">
        <div className="col">
          EXIF
        </div>
        <div className="col">
          {JSON.stringify(this.props.exif)}
        </div>
      </div>
    )

  };// End Component Render.

};
