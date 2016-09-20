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
    this.handleFileUploadOnClick = this.handleFileUploadOnClick.bind(this);

  };

  uploadFile(file) {
    // Send the file to the server.
    request
      .post('/upload')
      .attach('uploads', file, 'filename')
      .end((err, res) => {

        // Check response from server.
        if (err) {
          // Error occurred.
          console.log(err);
        } else {
          // Send metadata to parent state.
          this.props.handleUpdateData(JSON.parse(res.text));
        };

      });// End Request.
  }

  // Callback to handle file uploading.
  handleFileUploadOnClick(e) {

    // Prevent default actions.
    e.preventDefault();

    // Select the <input type="file"> control which allows for file uploading.
    var uploadFileControl = document.getElementById('upload-file-control');

    // Fire an onClick event to trigger the upload dialog window.
    uploadFileControl.click();

    // Component reference.
    var thisComp = this;

    // Handles file uploads to the server.
    uploadFileControl.onchange = function() {

      // Only trigger an upload if a file was provided.
      if (uploadFileControl.files.length > 0) {

        // Get the file.
        var file = uploadFileControl.files[0];

        // Upload file to the server.
        thisComp.uploadFile(file);

      };// End file length check.

    };// End file upload onChange handler.

  };// End handleFileUpload().

  // Component Render.
  render() {
    return (
      <div id="userinput" className="noselect boxshadow">
        <form>
          <div id="upload-file-target" onClick={this.handleFileUploadOnClick}>
            <h2>Upload a .jpg file here</h2>
          </div>
          <input className="hidden" id="upload-file-control" type="file"/>
        </form>
      </div>
    )
  };// End Component Render.

};
