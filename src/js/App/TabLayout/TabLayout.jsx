// React.
import React from 'react';

// Components.
import Tab from './Tab.jsx';
import Results from './Results.jsx';

export default class TabLayout extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Default state.
    this.state = {
      currentTab: 0,   // ID of the current tab.
      fileSize: null,
      exifData: null,
      gpsData: null,
      imageData: null
    };

    // Bind methods to component instance.
    this.handleUpdateCurrentTab = this.handleUpdateCurrentTab.bind(this);
  };

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
      };

      // Check to see if the metadata subkey exists, and is not null.
      // If it is not null then Exif, GPS, and Image data may be included.
      if (metadata.hasOwnProperty('metadata') && metadata['metadata'] != null) {

        // Let metadata variable reference the metadata subkey.
        metadata = metadata['metadata'];

        // Check to see if Exif data was provided.
        if (metadata.hasOwnProperty('exif') && metadata['exif'] != null) {
          exifData = metadata['exif'];
        };

      };

      // Store data in state.
      this.setState({
        fileSize: fileSize,
        exifData: exifData,
        gpsData: gpsData,
        imageData: imageData
      });

    };

  };

  // Callback to update current tab.
  handleUpdateCurrentTab(tabId) {
    this.setState({
      currentTab: tabId
    });
  }; // End callback to update current tab.

  // Component Render.
  render() {
    return (
      <div>
        <div className="container-tabs">
          <Tab tabId={0} currentTab={this.state.currentTab} label={"EXIF"} handleUpdateCurrentTab={this.handleUpdateCurrentTab}/>
          <Tab tabId={1} currentTab={this.state.currentTab} label={"Image Data"} handleUpdateCurrentTab={this.handleUpdateCurrentTab}/>
          <Tab tabId={2} currentTab={this.state.currentTab} label={"GPS Data"} handleUpdateCurrentTab={this.handleUpdateCurrentTab}/>
          <Tab tabId={3} currentTab={this.state.currentTab} label={"File Size"} handleUpdateCurrentTab={this.handleUpdateCurrentTab}/>
          <div className="clearfix"/>
        </div>
        <div className="container-results">
          <Results tabId={0} currentTab={this.state.currentTab} data={this.state.exifData}/>
          <Results tabId={1} currentTab={this.state.currentTab} data={this.state.imageData}/>
          <Results tabId={2} currentTab={this.state.currentTab} data={this.state.gpsData}/>
          <Results tabId={3} currentTab={this.state.currentTab} data={this.state.fileSize}/>
        </div>
      </div>
    )
  };// End Component Render.

};
