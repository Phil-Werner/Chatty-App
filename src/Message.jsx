import React, {Component} from 'react';


class Message extends React.Component {

  render() {

    return (

        <div className="message">
          <span className="message-username">{this.props.mess.username}</span>
          <span className="message-content">{this.props.mess.content}</span>
        </div>
      /*  <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div> */

    )
  }
}

export default Message;