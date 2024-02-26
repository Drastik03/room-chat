import { io } from "socket.io-client";
import { useState } from "react";
import Input from "../inputs/Input";
import Login from "../messages/Login";
import Chat from "../chat/Chat";
import "../../Session.css";
const socket = io.connect("http://localhost:8080");
function Session() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const getRoom = () => {
    if (username != "" && room != "") {
      socket.emit("rooms", room);
      setShowChat(true)
      console.log("sent request for rooms");

    }
  };

  const enterRoom = (e) => {
    const id = e.target.value;
    if (isNaN(Number(id))) {
      alert("Please enter a valid number");
    } else {
      setRoom(Number(id));
    }
  }

  return (
    <div className="session-container">
      <h1 className="text">Chat App</h1>
      {!showChat ? (
        <div className="input-container">
          <Input
            text={(e) => {
              setUsername(e.target.value);
            }}
          >
            Enter your username
          </Input>
          <Input
            text={enterRoom}
            press={(e)=> {
              if(e.key  === 'Enter') getRoom()
            }}
          >
            Enter your ID Room
          </Input>
          <Login action={getRoom}>Unirme</Login>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}
export default Session;
