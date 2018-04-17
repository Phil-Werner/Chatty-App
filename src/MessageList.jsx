import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {

  render() {
   // console.log("this prop messages", this.props.messages);
    const messages = this.props.messages.map((messageComp) => {
      //console.log("messagecomp: ", messageComp)
      return (<Message key={messageComp.id} mess={messageComp} />);
    });

    return (<div>
              {messages}
            </div>);
  }
}

export default MessageList;