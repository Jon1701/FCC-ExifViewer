// React.
import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {

  // Constructor.
  constructor() {
    super();
  }

  // Component Render.
  render() {
    return (
      <div>
        Hello World
      </div>
    )
  }

}

// Render to the DOM.
ReactDOM.render(<HelloWorld/>, document.getElementById('react-target'));
