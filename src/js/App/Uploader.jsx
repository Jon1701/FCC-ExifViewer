// React.
import React from 'react';
import classNames from 'classnames';

// Superagent.
var request = require('superagent');

// Component definition.
export default class Uploader extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Bind methods to Component instance.
    this.handleFileUploadOnClick = this.handleFileUploadOnClick.bind(this);

    // Default state.
    this.state = {
      uploadError: false  // Default, no upload error.
    };

  };

  uploadFile(file) {
    // Send the file to the server.
    request
      .post('/upload')
      .attach('uploads', file, 'filename')
      .end((err, res) => {

        // Check response from server.
        if (err) {

          // Display error message.
          this.setState({
            uploadError: true
          });

        } else {

          // Hide error message.
          this.setState({
            uploadError: false
          });

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

    // Classes for the error dialog box.
    var classesErrorMsgBox = classNames({
      'hidden': !this.state.uploadError
    });

    return (
      <div id="uploader" className="noselect panel boxshadow">
        <form>
          <div id="upload-file-target" onClick={this.handleFileUploadOnClick}>
            <h2>Upload a .jpg file here</h2>
          </div>
          <input className="hidden" id="upload-file-control" type="file"/>
        </form>

        <div id="warning-upload" className={classesErrorMsgBox}>
          File too large. Maximum 50MB.
        </div>
      </div>
    )
  };// End Component Render.

};
