// React.
import React from 'react';

import classNames from 'classnames';

// Components.
import Tab from './Tab.jsx';
import ResultsExif from './ResultsExif.jsx';
import ResultsImageData from './ResultsImageData.jsx';
import ResultsFileSize from './ResultsFileSize.jsx';

export default class TabLayout extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Default state.
    this.state = {
      currentTab: 1,   // ID of the current tab.
      fileSize: null,
      exifData: null,
      gpsData: null,
      imageData: null
    };

    // Bind methods to component instance.
    this.handleUpdateCurrentTab = this.handleUpdateCurrentTab.bind(this);
  };

  // When the Component receives props (file size, image, gps, exif data),
  // Split the data into 4 separate variables, and store them in state.
  componentWillReceiveProps(nextProps) {

    // File metadata containing filesize and Exif data.
    // Can still be null if no data provided.
    //
    // Format:
    //    metadata = {
    //      fileSize: 0,    <-- File size.
    //      metadata: {     <-- Collection of Image metadata.
    //        exif: {...},  <-- Exif data.
    //        gps: {...},   <-- GPS data.
    //        image: {...}  <-- Image metadata (camera make/model, software, etc).
    //      }
    //    }
    var metadata = nextProps.data;

    // Variables to hold data extracted from metadata.
    var fileSize;
    var exifData;
    var gpsData;
    var imageData;

    // Check if metadata was extracted.
    // A file has to have been uploaded and a response from a server recieved.
    if (metadata != null) {

      // Check to see if file size was provided.
      if (metadata.hasOwnProperty('fileSize') && metadata['fileSize'] != null) {
        fileSize = {'fileSize': metadata['fileSize']};
      }; // End file size check.

      // Check to see if the metadata subkey exists, and is not null.
      // If it is not null then Exif, GPS, and Image data may be included.
      if (metadata.hasOwnProperty('metadata') && metadata['metadata'] != null) {

        // Let metadata variable reference the metadata subkey.
        metadata = metadata['metadata'];

        // Check to see if Exif data was provided.
        if (metadata.hasOwnProperty('exif') && metadata['exif'] != null) {
          exifData = metadata['exif'];
        }; // End check.

      }; // End check of metadata subkey.

      // Store data in state.
      this.setState({
        fileSize: fileSize,
        exifData: exifData,
        gpsData: gpsData,
        imageData: imageData
      }); // End storing data in state.

    }; // End metadata extraction check.

  }; // End componentWillReceiveProps.

  // Callback to update current tab.
  handleUpdateCurrentTab(tabId) {
    this.setState({
      currentTab: tabId
    });
  }; // End callback to update current tab.

  // Component Render.
  render() {

    // Boolean mask to check if all file size, exif, gps, and image data are null.
    var allDataNull =
      this.state.fileSize == null &&
      this.state.exifData == null &&
      this.state.gpsData == null &&
      this.state.imageData == null;

    // Toggless the .hidden class.
    // Hide entire layout if no data was sent/received to/from server.
    // Unhide if data was received.
    var myClasses = classNames({
      'hidden': allDataNull
    });

    return (
      <div className={myClasses}>
        <div className="container-tabs">

          <Tab
            tabId={0}
            currentTab={this.state.currentTab}
            label={"EXIF"}
            handleUpdateCurrentTab={this.handleUpdateCurrentTab}
            />

          <Tab
            tabId={1}
            currentTab={this.state.currentTab}
            label={"Image Data"}
            handleUpdateCurrentTab={this.handleUpdateCurrentTab}
            />

          <Tab
            tabId={2}
            currentTab={this.state.currentTab}
            label={"GPS Data"}
            handleUpdateCurrentTab={this.handleUpdateCurrentTab}
            />

          <Tab
            tabId={3}
            currentTab={this.state.currentTab}
            label={"File Size"}
            handleUpdateCurrentTab={this.handleUpdateCurrentTab}
            />

          <div className="clearfix"/>

        </div>

        <div className="container-results">

          <ResultsExif
            tabId={0}
            currentTab={this.state.currentTab}
            data={this.state.exifData}
            />

          <ResultsImageData
            tabId={1}
            currentTab={this.state.currentTab}
            data={this.state.imageData}
            />

          <ResultsFileSize
            tabId={3}
            currentTab={this.state.currentTab}
            data={this.state.fileSize}
            />

        </div>
      </div>
    )
  };// End Component Render.

};
