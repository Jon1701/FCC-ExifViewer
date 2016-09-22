// React.
import React from 'react';
import classNames from 'classnames';

export default class NoData extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {

    // Variable to toggle component visibility.
    var toggleHidden = true;

    // Three cases.
    //
    // rowMap null/undefined --> hidden
    // rowMap length 0 --> hidden
    // rowMap length > 0 --> not hidden
    if (this.props.rowMap) {

      // Check size.
      if (this.props.rowMap.size == 0) {

        // Hide if no data was provided.
        toggleHidden = true;

      } else {

        // Display if data was provided.
        toggleHidden = false;
      };

    } else {

      // Hide since no data was provided.
      toggleHidden = true;

    };

    // Classes to toggle displaying of No Data Available message.
    //
    // If this.props.data is undefined, this means no Exif data
    // was passed down. Therefore this div must not be hidden when
    // no Exif data is provided.
    var classesNoDataAvailable = classNames({
      'hidden': !toggleHidden,
      'text-center': true
    });

    return (
      <div className={classesNoDataAvailable}>
        No data available
      </div>
    )
  };// End Component Render.

};
