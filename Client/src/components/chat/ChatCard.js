import React from "react";
import "./ChatCard.css";

class ChatCard extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.onClick(this.props.userName);
  }

  render() {
    return (
      <div
        className={
          "chat-card-container " +
          (this.props.isSelected ? "card-selected" : "")
        }
        onClick={this.clickHandler}
      >
        <img
          className="card-profile-pic"
          src={this.props.profilePic}
          alt=""
          key="profile-pic"
        />
        <div className="user-info-container">
          <div
            className={
              "user-full-name" + (this.props.readAllMessages ? "" : " bold")
            }
          >
            {this.props.userName}
          </div>
          <br></br>
          <div
            className={
              "last-text" + (this.props.readAllMessages ? "" : " bold")
            }
          >
            {this.props.lastMessage}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatCard;
