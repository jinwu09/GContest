import { Socket, Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { sendTemplate } from "../../../methods/template";
import { Code } from "../../../methods/template";
import { io } from "../../../../app";
import e from "express";
const prisma = new PrismaClient();

export const QuizRoomSocketListener = (socket: Socket, io: Server) => {
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
    const RoomExist = await prisma.room
      .findUnique({
        where: {
          room: dataIO.Roomname,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then(async (data) => {
        return data;
      })
      .finally(() => {
        prisma.$disconnect();
      });
    if (RoomExist != null) {
      if (io.sockets.adapter.rooms.get(dataIO.Roomname) == null) {
        const clearRoom = await prisma.attendees
          .deleteMany({
            where: {
              Room: {
                room: dataIO.Roomname,
              },
            },
          })
          .catch((e) => {
            console.log(e);
          })
          .then(() => {
            // console.log("Room attendees cleared");
          })
          .finally(() => {
            prisma.$disconnect();
          });
      }
      const addAttendees = await prisma.attendees
        .create({
          data: {
            Room: {
              connect: {
                room: dataIO.Roomname,
              },
            },
            User: {
              connect: {
                id: socket.data.userID,
              },
            },
          },
        })
        .catch((e) => {
          console.log;
        })
        .finally(() => {
          prisma.$disconnect();
        });
      socket.join(dataIO.Roomname);

      const RoomAttendees: any = await prisma.attendees
        .findMany({
          where: {
            Room: {
              room: dataIO.Roomname,
            },
          },
          select: {
            User: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        })
        .then((data) => {
          return data;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          prisma.$disconnect();
        });
      // console.log(socket);
      const IsUserCreator = await prisma.room
        .findFirst({
          where: {
            room: dataIO.Roomname,
          },
          select: {
            room: true,
            Quiz: {
              select: {
                creator_id: true,
              },
            },
          },
        })
        .catch((e) => {
          console.log(e);
        })
        .then((data) => {
          if (data?.Quiz?.creator_id == socket.data.userID) {
            return true;
          }
          return false;
        })
        .finally(() => {
          prisma.$disconnect();
        });
      const RoomData = { RoomAttendees };
      // who just joined
      socket.emit("JoinRoom", {
        admin: IsUserCreator,
        data: RoomData,
        message: `Successfully joined!`,
      });
      // emits to all in the room except who just join
      socket.to(dataIO.Roomname).emit("Room", {
        data: RoomData,
        message: `new user have joined: ${socket.data.first_name} ${socket.data.last_name}`,
      });
    } else {
      socket.emit("JoinRoom", "Room Doesn't exist");
    }
  });

  // interface RoomAttendee {
  //   [Room: { room: string }];
  // }
  socket.on("disconnect", async () => {
    const RoomAttendee: any = await prisma.attendees
      .findMany({
        where: {
          userId: socket.data.userID,
        },
        select: {
          Room: {
            select: {
              room: true,
            },
          },
        },
      })
      .then((data: any) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        prisma.$disconnect();
      });
    const deleteAttendee = await prisma.attendees
      .deleteMany({
        where: {
          userId: socket.data.userID,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        prisma.$disconnect();
      });
    RoomAttendee.forEach(async (NestedRoom: any) => {
      const room = NestedRoom.Room.room;

      const RoomAttendees: any = await prisma.attendees
        .findMany({
          where: {
            Room: {
              room: room,
            },
          },
          select: {
            User: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        })
        .then((data) => {
          return data;
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          prisma.$disconnect();
        });
      const RoomData = { RoomAttendees };
      socket.to(room).emit("Room", {
        data: RoomData,
        message: `User Disconnected ${socket.data.first_name} ${socket.data.last_name}`,
      });
    });
  });
};
