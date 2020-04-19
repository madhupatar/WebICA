import React from "react";
import ChatsList from "./ChatsList";
import ConversationView from "./ConversationView";
import "./ChatComponent.css";
import * as socket from "../../services/ChatSocket";

export default class ChatComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toUserName: props.toUserName,
    };

    this.userName = props.userName;
    this.handleSend = this.handleSend.bind(this);
    this.addMessageToState = this.addMessageToState.bind(this);
    this.chatsListRef = React.createRef();
    this.conversationRef = React.createRef();
    
    socket.registerForEvent("RECEIVE_MESSAGE", this.addMessageToState);
  }

  componentDidMount() {
    let self = this;
    const callback = function (message) {
      if (message.timestamp === "null" || message.timestamp == null) return;

      self.addMessageToState(message);
    };

    // <--- Uncomment below --->
    // this.props.Socket.createSocket(callback, this.userName);
    // <--- End --->
  }

  handleSend(message) {
    socket.sendMessage("SEND_MESSAGE", message);
    // this.props.Socket.sendMessageOnSocket(message);
  }

  addMessageToState(message) {
    this.chatsListRef.addNewMessage(message);
    this.conversationRef.addNewMessage(message);
  }

  render() {
    return (
      <div id="main">
        <div>
          <ChatsList
            selectedUserName={this.props.selectedUserName}
            currentUserName={this.userName}
            onRef={(ref) => (this.chatsListRef = ref)}
          />
        </div>
        <div>
          <ConversationView
            selectedUserName={this.props.selectedUserName}
            currentUserName={this.userName}
            sendMessage={this.handleSend}
            onRef={(ref) => (this.conversationRef = ref)}
          />
        </div>
      </div>
    );
  }
}
