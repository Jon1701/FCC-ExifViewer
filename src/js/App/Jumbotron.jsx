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
      <div id="jumbotron" className="jumbotron panel boxshadow">
        <h1>What is Exif?</h1>
        <p>
          <span className="bold">Exchangeable Image File Format</span> is a standard for embedding information in photos. Such included information could be the model of the camera, aperture, ISO, shutter speed, and possibly even the location the photo was taken.
        </p>
      </div>
    )
  };// End Component Render.

}
