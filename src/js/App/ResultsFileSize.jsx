// React.
import React from 'react';

// Component Definition.
export default class ResultsFileSize extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {

    // Get the filesize in Megabytes.
    var fileSizeInMegabytes = this.props.fileSize / 1000000;

    // Round to two decimal places.
    fileSizeInMegabytes = Math.round(fileSizeInMegabytes * 100) / 100;

    return (
      <div className="row">
        <div className="col">
          File size:
        </div>
        <div className="col">
          {fileSizeInMegabytes} MB
        </div>
      </div>
    )
    
  };// End Component Render.

};
