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

        // Only store non-null values.
        if (tagValue) {

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
          
        };

      }); // End iteration.
    }



    return results;
  };

  // Component Render.
  render() {

    var rows = this.createRows(this.props.rowMap);

    // Classes to toggle display of the data table.
    //
    // If this.props.data is undefined, then no Exif data was sent,
    // and the table should be hidden
    var classesDisplayTable = classNames({
      'hidden': typeof(this.props.originalData) == 'undefined',
      'tbl': true
    });

    return (
      <div className={classesDisplayTable}>
        {rows}
      </div>
    )
  };// End Component Render.

};
