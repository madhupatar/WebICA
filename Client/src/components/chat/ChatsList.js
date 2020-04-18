import React from "react";
import ChatCard from "./ChatCard";
import history from "../../services/History";

class ChatsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUserName: "",
      chatArr: [
        //   {
        //     userName: this.props.toUserName,
        //     profileImg:
        //       "https://lh5.googleusercontent.com/-8Cn6iryzXOs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcQA3W99z1gUxEWhpuL7zHf3GiwYA/photo.jpg",
        //   },
        {
          userName: "User1",
          profileImg:
            "https://lh5.googleusercontent.com/-8Cn6iryzXOs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcQA3W99z1gUxEWhpuL7zHf3GiwYA/photo.jpg",
          lastMessage: "Message 1",
          readAllMessages: false,
        },
        {
          userName: "User2",
          profileImg:
            "https://lh5.googleusercontent.com/-8Cn6iryzXOs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcQA3W99z1gUxEWhpuL7zHf3GiwYA/photo.jpg",
          lastMessage: "Message 2",
          readAllMessages: false,
        },
        {
          userName: "User3",
          profileImg:
            "https://lh5.googleusercontent.com/-8Cn6iryzXOs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcQA3W99z1gUxEWhpuL7zHf3GiwYA/photo.jpg",
          lastMessage: "Message 3",
          readAllMessages: false,
        },
        {
          userName: "User4",
          profileImg:
            "https://lh5.googleusercontent.com/-8Cn6iryzXOs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcQA3W99z1gUxEWhpuL7zHf3GiwYA/photo.jpg",
          lastMessage: "Message 4",
          readAllMessages: false,
        },
        {
          userName: "User5",
          profileImg:
            "https://lh5.googleusercontent.com/-8Cn6iryzXOs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcQA3W99z1gUxEWhpuL7zHf3GiwYA/photo.jpg",
          lastMessage: "Message 5",
          readAllMessages: true,
        },
        {
          userName: "User6",
          profileImg:
            "https://lh5.googleusercontent.com/-8Cn6iryzXOs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcQA3W99z1gUxEWhpuL7zHf3GiwYA/photo.jpg",
          lastMessage: "Message 6",
          readAllMessages: true,
        },
      ],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    // Call get chats list API
    // let self = this;
    // fetch("fetchChatsAPIUrl", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     console.log(resp);
    //     // self.setState({chatArr: resp});
    //   });
    if (this.state.selectedUserName === "" && this.state.chatArr.length > 0) {
      this.handleClick(this.state.chatArr[0].userName);
    }
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  markMessageAsRead = (userName) => {
    let modifiedChatArray = this.state.chatArr;
    modifiedChatArray.forEach((element) => {
      if (element.userName === userName) {
        element.readAllMessages = true;
      }
    });
    this.setState({ chatArr: modifiedChatArray });
  };

  handleClick(userName) {
    if (this.state.selectedUserName === userName) return;
    this.markMessageAsRead(userName);
    history.push("/conversation/" + userName);
    this.setState({ selectedUserName: userName });
  }

  addNewMessage = (newMessage) => {
    let obtainedChat = this.state.chatArr.find(
      (element) =>
        element.userName === newMessage.from ||
        element.userName === newMessage.to
    );

    let indexOfChat = this.state.chatArr.indexOf(obtainedChat);
    let chatsArray = this.state.chatArr;
    chatsArray.splice(indexOfChat, 1);

    obtainedChat.lastMessage = newMessage.content;
    if (
      this.state.selectedUserName !== newMessage.to &&
      this.state.selectedUserName !== newMessage.from
    ) {
      obtainedChat.readAllMessages = false;
    }
    this.setState({ chatArr: [obtainedChat].concat(chatsArray) });
  };

  render() {
    // this.addNewMessage();
    let chatHistory = [];
    for (let i = 0; i < this.state.chatArr.length; i++) {
      chatHistory.push(
        <ChatCard
          userName={this.state.chatArr[i].userName}
          profileImg={this.state.chatArr[i].profileImg}
          lastMessage={this.state.chatArr[i].lastMessage}
          readAllMessages={this.state.chatArr[i].readAllMessages}
          onClick={this.handleClick}
          isSelected={
            this.state.chatArr[i].userName === this.state.autoSelectUserName ||
            this.state.chatArr[i].userName === this.state.selectedUserName
          }
        />
      );
    }
    return <div className="user-list">{chatHistory}</div>;
  }
}

export default ChatsList;
