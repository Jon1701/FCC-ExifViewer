// React.
import React from 'react';

// Components.
import Jumbotron from './Jumbotron.jsx';
import Uploader from './Uploader.jsx';
import TabLayout from './TabLayout/TabLayout.jsx';

export default class App extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Initial state.
    this.state = {
      data: null  // EXIF data.
    };

    // Bind methods to component instance.
    this.updateData = this.updateData.bind(this);
  };

  // Callback to update data in state.
  updateData(data) {
    this.setState({
      data: data
    });
  };

  // Component Render.
  render() {
    return (
      <div>
        <Jumbotron/>
        <Uploader handleUpdateData={this.updateData}/>
        <TabLayout data={this.state.data}/>
      </div>
    )
  };// End Component Render.

}
