import React, {Component} from 'react';

class ChatBar extends React.Component {

  render() {
    console.log("Rendering ChatBar");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name='value' placeholder={this.props.currentUser}
          onKeyPress={(event) => {if (event.key === 'Enter') {
            this.props.changeUsername(event.target.value);
            }}} />
        <input className="chatbar-message" name='value'  placeholder="Type a message and hit ENTER"
          onKeyPress={(event) => {if (event.key === 'Enter')
            {this.props.addNewMessage(event.target.value);
              event.target.value = '';}}} />
      </footer>
    )
  }
}

export default ChatBar;