import React from "react";
import ChatCard from "./ChatCard";
import history from "../../services/History";
import * as sessionMgmt from "../../services/SessionHandler";

class ChatsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  markMessageAsRead = (chatId) => {
    let modifiedChatArray = this.props.chatArr;
    modifiedChatArray.forEach((element) => {
      if (element.chatId === chatId) {
        element.readAllMessages = true;
      }
    });
    this.setState({ chatArr: modifiedChatArray });
  };

  handleClick(chatType, chatId) {
    if (this.props.selectedChatId === chatId) return;
    this.markMessageAsRead(chatId);
    history.push("/conversation/" + chatType + "/" + chatId);
  }

  render() {
    let chatHistory = [];
    for (let i = 0; i < this.props.chatArr.length; i++) {
      chatHistory.push(
        <ChatCard
          chatId={this.props.chatArr[i].chatId}
          chatName={this.props.chatArr[i].chatName}
          profileImg={this.props.chatArr[i].profileImg}
          lastMessage={this.props.chatArr[i].lastMessage}
          readAllMessages={this.props.chatArr[i].readAllMessages}
          chatType={this.props.chatArr[i].convoType}
          onClick={this.handleClick}
          isSelected={
            this.props.chatArr[i].chatId === this.props.selectedChatId
          }
        />
      );
    }
    return <div className="user-list">{chatHistory}</div>;
  }
}

export default ChatsList;
