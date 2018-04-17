import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './Chatbar.jsx';

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
    this.state = {messages: [
            {
                id: "aaa1",
                type: "incomingMessage",
                content: "I won't be impressed with technology until I can download food.",
                username: "Anonymous1"
            },
            {
                id: "aaa2",
                type: "incomingNotification",
                content: "Anonymous1 changed their name to nomnom",
            },
            {
                id: "aaa3",
                type: "incomingMessage",
                content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
                username: "Anonymous2"
            },
            {
                id: "aaa4",
                type: "incomingMessage",
                content: "...",
                username: "nomnom"
            },
            {
                id: "aaa5",
                type: "incomingMessage",
                content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
                username: "Anonymous2"
            },
            {
                id: "aaa6",
                type: "incomingMessage",
                content: "This isn't funny. You're not funny",
                username: "nomnom"
            },
            {
                id: "aaa7",
                type: "incomingNotification",
                content: "Anonymous2 changed their name to NotFunny",

            }

        ], currentUser: 'Anonymous'}

  }

  componentDidMount() {
  console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
        <ChatBar currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
