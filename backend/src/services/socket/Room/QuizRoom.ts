import { Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const QuizRoomSocketListener = (socket: Socket) => {
  socket.on("CheckRoom", () => {
    var room: Array<string> = [];
    socket.rooms.forEach((set) => {
      room.push(set);
    });
    room.reverse();
    room.pop();

    socket.emit("CheckRoom", room);
  });

  socket.on("JoinRoom", async (dataIO) => {
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
          socket.emit("JoinRoom", "successfully joined");
          socket
            .to(dataIO.Roomname)
            .emit("JoinRoom", "new user have joined: " + dataIO.Username);
        } else {
          socket.emit("JoinRoom", "Room Doesn't exist");
        }
      });

    console.log(socket.rooms);
  });
};
