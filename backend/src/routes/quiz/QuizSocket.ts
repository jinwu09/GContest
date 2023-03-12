import { Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";
import { TokenCheck } from "./methods/TokenCheck";

const prisma = new PrismaClient();

export const SocketListener = (socket: Socket) => {
  socket.on("message", (dataIO) => {
    console.log("this is from quiz" + dataIO);
  });

  socket.on("Room", async (dataIO) => {
    const RoomExist = await prisma.quiz
      .findUnique({
        where: {
          room: dataIO.Roomname,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        if (data != null) {
          socket.join(dataIO.Roomname);
          socket.emit("room", "successfully joined");
          socket
            .to(dataIO.Roomname)
            .emit("roomJoined", "new user have joined: " + dataIO.Username);
        } else {
          socket.emit("room", "Room Doesn't exist");
        }
      });

    console.log(socket.rooms);
  });

  socket.on("CheckRoom", () => {
    var room: Array<string> = [];
    socket.rooms.forEach((set) => {
      room.push(set);
    });
    room.reverse();
    room.pop();

    socket.emit("room?", room);
  });

  socket.on("disconnect", (dataIO) => {
    console.log(socket.rooms);
  });

  socket.on("start", (dataIO) => {
    // guard clause
    // room
    // token check if its creator

    const output = {};
    socket.to(dataIO.room).emit("start", output);
  });
};
