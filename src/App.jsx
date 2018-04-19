import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './Chatbar.jsx';

function newId() {
  let output = ""

  let letters = 'abcdefghijklmnopqrstuvwxyz';
  let alphabet = `0123456789${letters}${letters.toUpperCase()}`;

   for (var i = 0; i < 6; i += 1) {
      output += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

  return output;
}

class NavBar extends React.Component {
  render() {
    console.log("rendering navbar");
    return (<nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
              </nav>);
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {messages: [], currentUser: 'Anonymous', numUsers: 0};

    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
  //  setTimeout(() => {
        //console.log("Simulating incoming message");
        // Add a new message to the list of messages in the data store
        //const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
        //const messages = this.state.messages.concat(newMessage)
        // Update the state of the app component.
        // Calling setState will trigger a call to render() in App and all child components.
        //this.setState({messages: messages})

       // this.addNewMessage("test test");

  //  }, 3000);


    this.socket = new WebSocket('ws://localhost:3001');
    console.log("Connected to server");

    this.socket.addEventListener('message', event => {
        let messageObj = JSON.parse(event.data);
        //console.log(messageObj);

        if (messageObj.type === 'postNumUser') {


            this.setState({numUsers: messageObj.content});
            console.log("numUsers: ", this.state.numUsers);

        }

        else {
          const messages = this.state.messages.concat(messageObj);
          this.setState({messages: messages});
        }

  // code to handle incoming message
    });
  }

  addNewMessage(messageContent) {
   // const newMessage = {id: newId(), username: this.state.currentUser, content: messageContent};


   let messageObj = {username: this.state.currentUser, content: messageContent, type: 'postMessage'};
   this.socket.send(JSON.stringify(messageObj));

  }

  changeUsername(name) {

    console.log("name: ", name)
    let messageObj = {username: name, content: `${this.state.currentUser} changed their name to ${name}`, type: 'postNotification'};

    this.socket.send(JSON.stringify(messageObj));
    this.setState({currentUser: name});

    //console.log("new name ", this.state.username);
  }


  render() {
    console.log("Rendering app");
   // console.log("state messages: ", this.state.messages);
    //console.log("curent user: "+ this.state.currentUser);
    return (<div>
        <NavBar/>
        <main className="messages">
          <MessageList messages={this.state.messages} />
        </main>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage} changeUsername={this.changeUsername} />
      </div>
    );
  }
}
export default App;
