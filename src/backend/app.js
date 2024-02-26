import express from "express";
import http from "http";
import morgan from "morgan";
import pc from "picocolors";
import cors from "cors";
import "dotenv/config";
import { Server } from "socket.io"
const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT ?? 8000;

app.use(morgan("dev"));
app.use(cors())
const io =  new Server(server,{
    cors: {
        "origin": process.env.PORT_CLIENT, 
        "methods": ["GET","POST"],
    }
});

io.on(("connection"), (socket)=> { 
    console.log(`[${pc.cyan("SOCKET")}] ${pc.yellow("User connect")} ${socket.id}`)
    socket.on("rooms",(data)=>{
        console.log(`[${pc.cyan("SOCKET")}] ${pc.yellow("User id session in room")} ${socket.id} ${"Rooms:"+ data}`);
        socket.join(data)
    })
    socket.on("send_message",(data)=>{
        console.log(data)
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("disconnect",()=>{
        console.log(`[${pc.red("SOCKET")}] ${pc.yellow("Disconnected")} ${socket.id}`)
    })
})
server.listen(PORT, () => {
  console.log(`Server is running on ${pc.yellow(`http://localhost:${PORT}`)}`);
});
