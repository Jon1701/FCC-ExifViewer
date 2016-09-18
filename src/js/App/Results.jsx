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

    // Data possibly containing EXIF and filesize.
    var data = this.props.data;

    // Get file size.
    var fileSize = 0;
    if (data != null && data.hasOwnProperty('fileSize')) {
      fileSize = data.fileSize;
    };

    // Get exif data.
    var exif = null;
    if (data != null && data.hasOwnProperty('exif')) {
      exif = data.exif;
    };

    return (
      <div id="results">

        <div id="table">

          <ResultsFileSize fileSize={fileSize}/>
          <ResultsEXIF exif={exif}/>

        </div>

      </div>
    )
  };// End Component Render.

}

export default Results;
