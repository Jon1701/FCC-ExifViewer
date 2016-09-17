// React.
import React from 'react';

// Superagent.
var request = require('superagent');

// Component definition.
export default class UserInput extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Bind methods to Component instance.
    this.handleFileUpload = this.handleFileUpload.bind(this);
  };

  // Callback to handle file uploading.
  handleFileUpload(e) {

    // Prevent default actions.
    e.preventDefault();

    // Select the <input> control.
    var inputControl = document.getElementById('upload-file');

    // Get the file information.
    var file = inputControl.files[0];

    // Send the file to the server.
    request
      .post('/upload')
      .attach('uploads', file, 'filename')
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.parse(res.text))
        }
      });

  };

  // Component Render.
  render() {
    return (
      <div id="userinput">
        <form>
          <input id="upload-file" type="file" onChange={this.handleFileUpload}/>
        </form>
      </div>
    )
  };// End Component Render.

};
