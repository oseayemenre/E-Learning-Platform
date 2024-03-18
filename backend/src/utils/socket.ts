import { server } from "../server";
import { Server } from "socket.io";
import { ISocket } from "../interface/socket.interface";

const io = new Server<ISocket>(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});
