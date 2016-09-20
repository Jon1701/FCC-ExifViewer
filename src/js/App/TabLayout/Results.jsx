// React.
import React from 'react';
import classNames from 'classnames';

export default class Results extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {
    return (
      <div>
        
      </div>
    )
  };// End Component Render.

};

// Prop types.
Results.propTypes = {
  tabId: React.PropTypes.number.isRequired,
  currentTab: React.PropTypes.number.isRequired
};
