import io from "socket.io-client";

var chatSocket = null;


if (chatSocket === null)
    chatSocket = io('localhost:4000');

export function getSocket() {
    return chatSocket;
}

export function registerForEvent(eventKey, callback) {
    chatSocket.on(eventKey, callback);
}

export function sendMessage(eventKey, data) {
    chatSocket.emit(eventKey, data)
}