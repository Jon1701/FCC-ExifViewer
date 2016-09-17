// React.
import React from 'react';

export default class Results extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {

    var result = "empty";

    if(this.props.exifData) {
      result = JSON.stringify(this.props.exifData);
    }

    return (
      <div id="results">
        {result}
      </div>
    )
  };// End Component Render.

}
