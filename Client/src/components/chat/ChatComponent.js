import React from "react";
import ChatsList from "./ChatsList";
import ConversationView from "./ConversationView";
import "./ChatComponent.css";
import * as socket from "../../services/ChatSocket";
import * as sessionMgmt from "../../services/SessionHandler";

export default class ChatComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatsList: [],
    };

    this.handleSend = this.handleSend.bind(this);
    this.addMessageToState = this.addMessageToState.bind(this);
    this.chatsListRef = React.createRef();
    this.conversationRef = React.createRef();

    socket.registerForEvent("NEW_MESSAGE", this.addMessageToState);
  }

  componentDidMount() {
    let self  = this;
    let api = sessionMgmt.getUserRole() === "Admin" ? "http://localhost:4000/conversations/" : "http://localhost:4000/users/" + sessionMgmt.getUserName() + "/conversations"
    fetch(api, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })  
    .then((res) => res.json())
    .then((res) => {
      
      let tempChatArr = res.map((convObj) => {
        return {
          chatId: convObj._id,
          chatName: convObj.toUser,
          profileImg:
            "https://lh5.googleusercontent.com/-8Cn6iryzXOs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcQA3W99z1gUxEWhpuL7zHf3GiwYA/photo.jpg",
          convoType: convObj.convoType,
          readAllMessages: true, // TODO
        }
      })
      console.log(tempChatArr)
      console.log("tempChatArr")
      console.log(res)
      self.setState({chatsList: tempChatArr})
      if (!this.conversationRef.hasMessages()) {
        let self = this
        fetch('http://localhost:4000/conversations/' + this.props.chatId + '/messages', {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          })
          .then((res) => res.json())
          .then((res) => self.conversationRef.messagesFetched(res, this.state.chatsList))
      }
    })    
  }

  handleSend(message) {
    fetch('http://localhost:4000/conversations/' + this.props.chatId + '/messages', {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({message: message})
    })
    .then((res) => res.json())
  }

  addMessageToState(message) {
    this.updateChatList(message);
    this.conversationRef.addNewMessage(message);
  }

  updateChatList = (newMessage) => {
    let obtainedChat = this.state.chatsList.find(
      (element) =>
        element.chatId === newMessage.conversationId
    );
    if (obtainedChat !== null) {
      let indexOfChat = this.state.chatsList.indexOf(obtainedChat);
      let chatsArray = this.state.chatsList;
      chatsArray.splice(indexOfChat, 1);

      if (this.props.chatId !== newMessage.chatId) {
        obtainedChat.readAllMessages = false;
      }
    
      this.setState({ chatsList: [obtainedChat].concat(chatsArray) });
    }
  }

  shouldComponentUpdate(nextProps, _nextState) {

    let self = this
    if (nextProps.chatId !== this.props.chatId && nextProps.chatId !== "") {
      fetch('http://localhost:4000/conversations/' + nextProps.chatId + '/messages', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then((res) => self.conversationRef.messagesFetched(res, self.getChatObjectForId()))
    }
    return true;
  }

  getChatObjectForId = () => {
    let chatObj = this.state.chatsList.filter(obj => obj.chatId)
    return chatObj[0]
  }

  render() {
    return (
      <div id="main">
        <div>
          <ChatsList
            chatArr={this.state.chatsList}
            selectedChatId={this.props.chatId}
            selectedChatType={this.props.chatType}
            onRef={(ref) => (this.chatsListRef = ref)}
          />
        </div>
        <div>
          <ConversationView
            chatArr={this.state.chatsList}
            selectedChatId={this.props.chatId}
            selectedChatType={this.props.chatType}
            sendMessage={this.handleSend}
            onRef={(ref) => (this.conversationRef = ref)}
          />
        </div>
      </div>
    );
  }
}
