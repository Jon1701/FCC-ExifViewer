// React.
import React from 'react';
import classNames from 'classnames';

export default class DataTable extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Function to create table rows and cells for sanitized Exif data.
  createRows(rowMap) {

    // Array to store HTML rows and cells for the table.
    var results = [];

    if (rowMap) {
      // Iterate over the sanitized Exif data and create rows and cells.
      rowMap.forEach((tagValue, tagName, mapObj) => {

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
    }

    return results;
  };

  // Component Render.
  render() {

    // Create the rows for this table.
    var rows = this.createRows(this.props.rowMap);

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

    // Classes to toggle display of the data table.
    //
    // If this.props.data is undefined, then no Exif data was sent,
    // and the table should be hidden
    var classesDisplayTable = classNames({
      'hidden': toggleHidden,
      'tbl': true
    });

    return (
      <div className={classesDisplayTable}>
        {rows}
      </div>
    )
  };// End Component Render.

};
