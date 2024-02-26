import Send from "../messages/Send";
import Input from "../inputs/Input";
import "../../Chat.css"
import ScrollToBottom from "react-scroll-to-bottom";
import { useEffect, useState } from "react";
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (username && currentMessage) {
      const info = {
        message: currentMessage,
        room,
        author: username,
        time: `${new Date(Date.now()).getHours()}:${new Date().getMinutes()}`,
      };
      await socket.emit("send_message", info);
      setMessageList((list) => [...list, info]);
    }
  };
  useEffect(() => {
    const messageSend = (data) => {
      setMessageList((list) => [...list, data]);
      console.log(data);
    }
    socket.on("receive_message",messageSend);
    return ()=> socket.off("receive_message",messageSend)
  }, [socket]);
  return (
    <div className="chat-container">
  <section className="chat-messages">
    <ScrollToBottom className="message-list">
      {messageList.map((message, index) => (
        <div
          key={index}
          className={`message-container ${
            message.author === username ? "sent" : "received"
          }`}
        >
          <div className="message">
            <span className="author">{message.author}: </span>
            <span className="text">{message.message}</span>
            <span className="time">{message.time}</span>
          </div>
        </div>
      ))}
    </ScrollToBottom>
  </section>
  <div className="chat-input">
    <Input
      press={(e) => {
        if (e.key === "Enter") sendMessage() ;
      }}
      text={(e) => setCurrentMessage(e.target.value)}
    >
    </Input>
    <Send action={sendMessage}>Send</Send>
  </div>
</div>
  );
}

export default Chat;
