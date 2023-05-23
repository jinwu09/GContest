// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";

const bcrypt = require('bcrypt')
const prisma = new PrismaClient();

async function main(student_num: String,password: String,first_name: string,last_name: string){

  const create_user = await prisma.user.create({
        data: {
          email: student_num + "@gordoncollege.edu.ph",
          first_name: first_name,
          last_name: last_name,
          password: await bcrypt.hash(password, 10),
        },
      });
}

main("202010597","albert","Mark Thaddeus","Manuel")
main("202011580","albert","Albert John","Santos")
main("201910981","albert","Bryan Lee","Diaz")
main("202011019","albert","Bryne Lance","Babasa")
main("202011020","albert","John Lorenz","Alcantara")
main("202011022","albert","David","Veluz")
