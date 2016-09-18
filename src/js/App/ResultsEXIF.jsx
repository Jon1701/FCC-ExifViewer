// React.
import React from 'react';

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
        return mapping[obj[key]]
      } catch(e) {
        // Ignore errors.
      }
    }

    // Object to hold sanitized EXIF data.
    var newExif = {};

    //console.log(remapValue('Contrast', {0: 'Normal', 1: 'Low', 2: 'High'}, exif));
  };

  // Component Render.
  render() {

    var x = this.prettyPrintExif(this.props.exif)

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
