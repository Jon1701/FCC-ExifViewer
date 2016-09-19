// React.
import React from 'react';

// Components.
import classNames from 'classnames';

// Component Definition.
export default class EXIFResult extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {

    var myClasses = classNames({
      'hidden': this.props.tagValue == null
    });

    return (
      <div className={myClasses}>
        <div className="row">
          <div className="col">
            {this.props.tagName}
          </div>
          <div className="col">
            {this.props.tagValue}
          </div>
        </div>
      </div>
    )

  };// End Component Render.

};
