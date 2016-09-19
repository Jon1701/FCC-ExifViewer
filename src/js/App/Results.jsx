// React.
import React from 'react';
import classNames from 'classnames';

// Other Components.
import ResultsFileSize from './ResultsFileSize.jsx';
import ResultsEXIF from './ResultsEXIF.jsx';

// Component Definition.
class Results extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {

    // File metadata containing filesize and Exif data.
    // Can still be null if no data provided.
    //
    // Format:
    //    metadata = {
    //      fileSize: 0,    <-- File size.
    //      metadata: {     <-- Collection of Image metadata.
    //        exif: {...},  <-- Exif data.
    //        gps: {...},   <-- GPS data.
    //        image: {...}  <-- Image metadata (camera make/model, software, etc).
    //      }
    //    }
    var metadata = this.props.data;

    // Variables to hold data extracted from metadata.
    var fileSize;
    var exifData;
    var gpsData;
    var imageData;

    // Check if metadata was extracted.
    // A file has to have been uploaded and a response from a server recieved.
    if (metadata != null) {

      // Check to see if file size was provided.
      if (metadata.hasOwnProperty('fileSize') && metadata['fileSize'] != null) {
        fileSize = metadata['fileSize'];
      };

      // Check to see if the metadata subkey exists, and is not null.
      // If it is not null then Exif, GPS, and Image data may be included.
      if (metadata.hasOwnProperty('metadata') && metadata['metadata'] != null) {

        // Let metadata variable reference the metadata subkey.
        metadata = metadata['metadata'];

        // Check to see if Exif data was provided.
        if (metadata.hasOwnProperty('exif') && metadata['exif'] != null) {
          exifData = metadata['exif'];
        };

      };

    };

    return (
      <div id="results">

        <div id="table">

          <ResultsFileSize fileSize={fileSize}/>
          <ResultsEXIF exif={exifData}/>

        </div>

      </div>
    );
  };// End Component Render.

};

export default Results;
