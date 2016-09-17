// React.
import React from 'react';

import classNames from 'classnames';

export default class Results extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {

    // Toggle visibility.
    var myClasses = classNames({
      'hidden': !this.props.data
    });
    console.log(this.props.data)
    return (
      <div id="results" className={myClasses}>

        <div id="table">
          <div className="row">
            <div className="col">
              File size:
            </div>
            <div className="col">
              {this.props.data.fileSize / 1000000}
            </div>
          </div>
        </div>

      </div>
    )
  };// End Component Render.

}

Results.defaultProps = {
  fileSize: 0,
  exif: null
}
