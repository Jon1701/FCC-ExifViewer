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

    // Classes to toggle displaying of No Data Available message.
    //
    // If this.props.data is undefined, this means no Exif data
    // was passed down. Therefore this div must not be hidden when
    // no Exif data is provided.
    var classesNoDataAvailable = classNames({
      'hidden': typeof(this.props.originalData) != 'undefined',
      'text-center': true
    });

    return (
      <div className={classesNoDataAvailable}>
        No data available
      </div>
    )
  };// End Component Render.

};
