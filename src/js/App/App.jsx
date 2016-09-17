// React.
import React from 'react';

// Components.
import Jumbotron from './Jumbotron.jsx';
import UserInput from './UserInput.jsx';
import Results from './Results.jsx';

export default class App extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Initial state.
    this.state = {
      exifData: null  // EXIF data.
    };

    // Bind methods to component instance.
    this.updateExif = this.updateExif.bind(this);
  };

  // Callback to update EXIF data in state.
  updateExif(exifData) {
    this.setState({
      exifData: exifData
    });
  };

  // Component Render.
  render() {
    return (
      <div>
        <Jumbotron/>
        <UserInput handleUpdateExif={this.updateExif}/>
        <Results exifData={this.state.exifData}/>
      </div>
    )
  };// End Component Render.

}
