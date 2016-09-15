// React.
import React from 'react';

export default class UserInput extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  };

  // Component Render.
  render() {
    return (
      <div id="userinput">

        <form>
          <input id="upload-file" type="file"/>
          <button type="submit">Upload</button>
        </form>

      </div>
    )
  };// End Component Render.

}
