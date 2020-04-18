import React from "react";
import { Button } from "react-bootstrap";
import "./ConversationView.css";
import deleteImg from "../../assets/delete-icon.png";
import editImg from "../../assets/edit-icon.png";
import history from "../../services/History";

class ConversationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: [
        {
          from: "User1",
          to: "Main user",
          messageid: "message1",
          content: "test message 1",
        },
        {
          from: "User2",
          to: "Main user",
          messageid: "message2",
          content: "test message 2",
        },
        {
          from: "User2",
          to: "Main user",
          messageid: "message3",
          content: "test message 3",
        },
      ],
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.msgRef = React.createRef();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    // var self = this;
    // fetch(
    //   "http://localhost:8080/prattle/rest/message/sender/" +
    //     this.userName +
    //     "/receiver/" +
    //     toUserName +
    //     "/count/20",
    //   {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((resp) => resp.json())
    //   .then((resp) =>
    //     self.setState({ toUserName: toUserName, messageList: resp })
    //   );
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  addNewMessage = (newMessage) => {
    if (
      newMessage.to !== this.props.selectedUserName &&
      newMessage.from !== this.props.selectedUserName
    )
      return;
    let messageList = this.state.messageList;
    messageList = messageList.concat([newMessage]);

    this.setState({ messageList: messageList });
  };

  updateParent() {
    history.push("/conversation/" + this.props.userName);
  }

  sendMessage() {
    const newMessage = {
      content: this.msgRef.current.value,
      from: this.props.currentUserName,
      to: this.props.selectedUserName,
      messageType: this.props.messageType,
    };

    // Call send message API
    // fetch(
    //   "http://localhost:8080/prattle/rest/message/edit/" + this.state.messageId,
    //   {
    //     method: "PUT",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(message),
    //   }
    // )
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     let newState = Object.assign({}, self.state);
    //     newState.messageId = 0;
    //     newState.inEditMode = false;
    //     let newMessageList = newState.messageList.map((msg) =>
    //       msg.messageId === message.messageId ? message : msg
    //     );
    //     newState.messageList = newMessageList;
    //     self.setState({
    //       inEditMode: false,
    //       messageId: 0,
    //       messageList: newState.messageList,
    //     });
    //   });

    this.props.sendMessage(newMessage);
  }

  handleDelete(messageId) {
    // var self = this;
    // fetch("http://localhost:8080/prattle/rest/message/delete/" + messageId, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((resp) => self.updateParent(self.state.toUserName));

    //Update the component after the API call
    this.updateParent();
  }

  render() {
    console.log(this.state.messageList);
    let messageContent = [];
    for (let i = 0; i < this.state.messageList.length; i++) {
      messageContent.push(
        <li
          className={
            this.state.messageList[i].from === this.props.currentUserName
              ? "current-user"
              : "other-user"
          }
        >
          <img
            class="deleteMessage"
            src={deleteImg}
            alt=""
            onClick={() =>
              this.handleDelete(this.state.messageList[i].messageId)
            }
          />
          <img
            class="editMessage"
            src={editImg}
            alt=""
            onClick={() =>
              this.props.notifyParentForUpdate(
                this.state.messageList[i].messageId
              )
            }
          />
          <span className="username">{this.state.messageList[i].from}</span>
          {this.state.messageList[i].content}
        </li>
      );
    }
    return (
      <div className="message-container">
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
          <Button
            className="btn btn-primary ml-4"
            variant="primary"
            onClick={this.sendMessage}
          >
            Send
          </Button>
        </div>
      </div>
    );
  }
}

export default ConversationView;
