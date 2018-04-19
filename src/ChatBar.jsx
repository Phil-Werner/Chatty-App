import React, {Component} from 'react';

// const onMessageSent = (event) => {

//   //event.preventDefault();

//   if (event.key === 'Enter') {

//   //  console.log(event.target.value);

//     let msg = event.target.value;

//     //console.log(event);

//     this.props.addNewMessage(msg);
//   }
// }



class ChatBar extends React.Component {

  render() {
    console.log("Rendering ChatBar");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" name='value' placeholder={this.props.currentUser}
          onKeyPress={(event) => {if (event.key === 'Enter') {
            this.props.changeUsername(event.target.value);
            }}} />
        <input className="chatbar-message" name='value'
          onKeyPress={(event) => {
            if (event.key === 'Enter') {this.props.addNewMessage(event.target.value);
                                        event.target.value = '';}}}
          placeholder="Type a message and hit ENTER" />

      </footer>

    )
  }
}

export default ChatBar;