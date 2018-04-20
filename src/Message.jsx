import React, {Component} from 'react';


class Message extends React.Component {

  render() {

    console.log("Colour: ", this.props.mess.colour);

    if (this.props.mess.type === "incomingMessage") {
      return (

        <div className="message">
          <span id={this.props.mess.colour} className="message-username">{this.props.mess.username}</span>
          <span className="message-content">{this.props.mess.content}</span>
        </div>
      )
    }

    if (this.props.mess.type === "incomingNotification") {
      return (

        <div className="message system">
           <span class="notification-content">{this.props.mess.content}</span>
        </div>
      )
    }

  }
}

export default Message;