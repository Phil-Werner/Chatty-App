import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './Chatbar.jsx';

//Creates the header navbar, which also displays the number of users logged in
class NavBar extends React.Component {
  render() {
    console.log("rendering navbar");
    return (<nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <div className="navbarNumUsers"> {this.props.numUsers} users online </div>
              </nav>);
  }
}

class App extends Component {

  //sets the inital state and the bindings
  constructor(props) {
    super(props);
    this.state = {messages: [], currentUser: 'Anonymous', numUsers: 0, colour: ''};

    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket('ws://localhost:3001');
    console.log("Connected to server");

//The following code listens for messages from the server.  If the message type is newUserColour, it sets
//the state of the colour (for the username) chosen by the server.  If the message type is postNumUser,
//it sets the state to the updated number of users logged in to the server.  Finally if it isn't
//either of those types, then it must be an ordinary message which it adds to the message list in the state.

    this.socket.addEventListener('message', event => {
        let messageObj = JSON.parse(event.data);
        if (messageObj.type === 'newUserColour') {
          this.setState({colour: messageObj.colour})
        }
        else if (messageObj.type === 'postNumUser') {
            this.setState({numUsers: messageObj.content});
        }
        else {
          const messages = this.state.messages.concat(messageObj);
          this.setState({messages: messages});
        }
    });
  }

  //This method takes in the messageContent and sends the message to the server
  addNewMessage(messageContent) {
   let messageObj = {username: this.state.currentUser, content: messageContent, type: 'postMessage', colour: this.state.colour};
   this.socket.send(JSON.stringify(messageObj));
  }

  //This method changes the currentUsername in the state and sends a message to the server
  changeUsername(name) {
    let messageObj = {username: name, content: `${this.state.currentUser} changed their name to ${name}`, type: 'postNotification'};
    this.socket.send(JSON.stringify(messageObj));
    this.setState({currentUser: name});
  }

  render() {
    console.log("Rendering app");

    return (<div>
        <NavBar numUsers={this.state.numUsers}/>
        <main className="messages">
          <MessageList messages={this.state.messages} />
        </main>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage} changeUsername={this.changeUsername} />
      </div>
    );
  }
}
export default App;
