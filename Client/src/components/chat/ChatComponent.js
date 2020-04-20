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
          chatName: convObj.convoType === "Group" ? convObj.groupName : convObj.toUser,
          profileImg:
            "https://lh5.googleusercontent.com/-8Cn6iryzXOs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcQA3W99z1gUxEWhpuL7zHf3GiwYA/photo.jpg",
          convoType: convObj.convoType,
          readAllMessages: true, // TODO,
          groupId: convObj.groupId
        }
      })
      console.log("tempChatArr")
      console.log(res)
      self.setState({chatsList: tempChatArr})
      if (!this.conversationRef.hasMessages() && this.props.chatId !== "") {
        let currentObj = self.state.chatsList.find(element => element.chatId === this.props.chatId)
        
        if (currentObj.convoType === "Group") {
          fetch('http://localhost:4000/conversations/group/' + currentObj.groupId, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          })
          .then((res) => res.json())
          .then((groupRes) => {
            fetch('http://localhost:4000/conversations/' + this.props.chatId + '/messages', {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
            })
            .then((res) => res.json())
            .then((res) => self.conversationRef.messagesFetched(res, this.state.chatsList,groupRes))
          })
        }
        else {
          fetch('http://localhost:4000/conversations/' + this.props.chatId + '/messages', {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
            })
            .then((res) => res.json())
            .then((res) => self.conversationRef.messagesFetched(res, this.state.chatsList, null))
        }
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
      let currentObj = self.state.chatsList.find(element => element.chatId === nextProps.chatId)
      if (currentObj.convoType === "Group") {
        fetch('http://localhost:4000/conversations/group/' + currentObj.groupId, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
        .then((res) => res.json())
        .then((groupRes) => {
          fetch('http://localhost:4000/conversations/' + nextProps.chatId + '/messages', {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          })
          .then((res) => res.json())
          .then((res) => self.conversationRef.messagesFetched(res, self.getChatObjectForId(nextProps.chatId), groupRes))
        })
      }
      else {
        fetch('http://localhost:4000/conversations/' + nextProps.chatId + '/messages', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
        .then((res) => res.json())
        .then((res) => self.conversationRef.messagesFetched(res, self.getChatObjectForId(nextProps.chatId), null))
      }
    }
    return true;
  }

  getChatObjectForId = (chatId) => {
    let chatObj = this.state.chatsList.filter(obj => obj.chatId === chatId)
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
