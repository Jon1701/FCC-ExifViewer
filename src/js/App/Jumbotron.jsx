// React.
import React from 'react';

export default class Jumbotron extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {
    return (
      <div id="jumbotron" className="jumbotron boxshadow">
        <h1>What is Metadata?</h1>
        <p>
          Metadata is data which provides information about other data.
        </p>

        <p>
          Files such as pictures and documents contain metadata, such as the file size, location data, person who wrote the document, etc.
        </p>

        <p>
          This tool will tell you the file size of any file you upload, provided that the file is less than 50MB in size.
        </p>
      </div>
    )
  };// End Component Render.

}
