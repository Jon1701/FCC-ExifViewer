// React.
import React from 'react';

// Components.
import Jumbotron from './Jumbotron.jsx';
import UserInput from './UserInput.jsx';
import Results from './Results.jsx';

export default class App extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {
    return (
      <div>
        <Jumbotron/>
        <UserInput/>
        <Results/>
      </div>
    )
  };// End Component Render.

}
