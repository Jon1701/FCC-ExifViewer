// React.
import React from 'react';
import classNames from 'classnames';

// Component Definition.
export default class ResultsFileSize extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {

    // Get the filesize in Megabytes.
    var fileSizeInMegabytes;

    if (this.props.fileSize != null) {
      fileSizeInMegabytes = this.props.fileSize / 1000000;

      // Round to two decimal places.
      fileSizeInMegabytes = Math.round(fileSizeInMegabytes * 100) / 100;

    }



    var myClasses = classNames({
      'hidden': true,
      'table': this.props.fileSize != null
    });

    return (
      <div className={myClasses}>
        <div className="row">
          <div className="cell">
            File size:
          </div>
          <div className="cell">
            {fileSizeInMegabytes} MB
          </div>
        </div>
      </div>
    )

  };// End Component Render.

};
