import React, {Component} from 'react';
import Message from './Message.jsx';

//Creates a message for every message in the list
class MessageList extends React.Component {

  render() {
    const messages = this.props.messages.map((messageComp) => {
      return (<Message key={messageComp.id} mess={messageComp}/>);
    });

    return (<div>
              {messages}
            </div>);
  }
}

export default MessageList;