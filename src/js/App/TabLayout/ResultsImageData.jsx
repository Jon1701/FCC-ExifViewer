// React.
import React from 'react';
import classNames from 'classnames';

export default class ResultsImageData extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {

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
          Data Table
        </div>
        <div className={classesNoDataAvailable}>
          No data available
        </div>
      </div>
    )
  };// End Component Render.

};

// Prop types.
ResultsImageData.propTypes = {
  tabId: React.PropTypes.number.isRequired,
  currentTab: React.PropTypes.number.isRequired
};
