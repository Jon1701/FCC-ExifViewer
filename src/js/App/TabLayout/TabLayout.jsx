// React.
import React from 'react';

import Tab from './Tab.jsx';

export default class TabLayout extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Default state.
    this.state = {
      currentTab: 0 // ID of the current tab.
    };

    // Bind methods to component instance.
    this.handleUpdateCurrentTab = this.handleUpdateCurrentTab.bind(this);
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
          <Tab tabId={1} currentTab={this.state.currentTab} label={"Other"} handleUpdateCurrentTab={this.handleUpdateCurrentTab}/>
          <Tab tabId={2} currentTab={this.state.currentTab} label={"Unset"} handleUpdateCurrentTab={this.handleUpdateCurrentTab}/>
          <div className="clearfix"/>
        </div>
        <div className="container-results">

        </div>
      </div>
    )
  };// End Component Render.

};
