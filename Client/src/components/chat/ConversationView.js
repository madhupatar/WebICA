import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "./ConversationView.css";
import deleteImg from "../../assets/delete-icon.png";
import editImg from "../../assets/edit-icon.png";
import history from "../../services/History";
import * as sessionMgmt from "../../services/SessionHandler";

class ConversationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInfo: {},
      editMessageId: "",
      messageList: [],
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.showGroupDetails = this.showGroupDetails.bind(this);
    this.sendUpdatedMessage = this.sendUpdatedMessage.bind(this);
    this.cancelEditMessage = this.cancelEditMessage.bind(this);

    this.msgRef = React.createRef();
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  hasMessages = () => {
    return (this.props.selectedChatId !== "" && this.state.messageList.length > 0)
  }

  messagesFetched = (messageList, chatObj) => {
    this.setState({messageList: messageList, chatInfo: chatObj})
  }

  addNewMessage = (newMessage) => {
    // Call get all messages API
    let messageList = this.state.messageList;
    messageList = messageList.concat([newMessage]);
    this.setState({ messageList: messageList });
  };

  sendMessage() {
    const newMessage = {
      content: this.msgRef.current.value,
      fromUser: sessionMgmt.getUserName(),
      toUser: this.props.selectedChatType === "Individual" ? this.state.chatInfo.chatName : "",
      time: Date.now(),
      conversationId: this.props.selectedChatId
    };
    this.props.sendMessage(newMessage);
  }

  getGroupDetails(chatId, chatType) {
    //Send APi call to get group details
  }

  showGroupDetails() {
    if (
      (this.state.chatInfo.moderator === sessionMgmt.getUserName() ||
      sessionMgmt.getUserRole() === "Admin") && (this.props.selectedChatType === "Group")
    ) {
      history.push("/groupInfo/" + this.state.chatInfo.chatId);
    }
  }

  handleDelete(message) {
    console.log(message)
    fetch('http://localhost:4000/messages/' + message._id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "conversationId": message.conversationId
      }
    })
    .then((res) => res.json())
  }

  handleEdit(messageId) {
    this.setState({ editMessageId: messageId });
    //Call edit API
  }

  sendUpdatedMessage() {
    //Call update message API
  }

  cancelEditMessage() {
    this.setState({ editMessageId: "" });
    //Call edit API
  }

  getCurrentChatInfo = () => {
    let chatId = this.props.selectedChatId
    let currentChatObj = this.props.chatArr.find(function(chatObj) { 
      return chatObj.chatId === chatId;
    });
    return currentChatObj
  }

  render() {
    let currentChat =  this.getCurrentChatInfo()
    if (currentChat == null) {
      return (<div></div>)
    }
    let messageContent = [];
    for (let i = 0; i < this.state.messageList.length; i++) {
      messageContent.push(
        <li
          className={
            this.state.messageList[i].fromUser === sessionMgmt.getUserName()
              ? "current-user"
              : "other-user"
          }
        >
          {currentChat.moderator === sessionMgmt.getUserName() ||
          sessionMgmt.getUserRole() === "Admin" ? (
            <div>
              <img
                class="deleteMessage"
                src={deleteImg}
                alt=""
                onClick={() =>
                  this.handleDelete(this.state.messageList[i])
                }
              />
              <img
                class="editMessage"
                src={editImg}
                alt=""
                onClick={() =>
                  this.handleEdit(this.state.messageList[i].messageId)
                }
              />
            </div>
          ) : null}

          <span className="username">{this.state.messageList[i].fromUser}</span>
          {this.state.messageList[i].content}
        </li>
      );
    }
    return (
      <div className="message-container">
        <Navbar className="justify-content-between" expand="lg">
          <Navbar.Brand onClick={this.showGroupDetails}>
            {currentChat.chatName}
          </Navbar.Brand>
        </Navbar>
        <div className="message-pane">
          <ul>{messageContent}</ul>
        </div>
        <div className="input-container">
          <input
            className="message-box"
            type="text"
            placeholder="Enter message"
            ref={this.msgRef}
          />
          {this.state.editMessageId === "" ? (
            <Button
              className="btn btn-primary ml-4"
              variant="primary"
              onClick={this.sendMessage}
            >
              Send
            </Button>
          ) : (
            <div>
              <Button
                className="btn btn-primary ml-1"
                variant="primary"
                onClick={this.sendUpdatedMessage}
              >
                Edit
              </Button>
              <Button
                className="btn btn-primary ml-1"
                variant="primary"
                onClick={this.cancelEditMessage}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ConversationView;