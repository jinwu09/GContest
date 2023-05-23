import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { sendTemplate, Code } from "../methods/template";
const bcrypt = require('bcrypt')


const prisma = new PrismaClient();
const router = Router();


router.get("/me", async (req: Request, res: Response)=>{
    const showUser: any = await prisma.user.findUnique({
        where:{
            id: res.locals.userId
        },
        select:{
            first_name: true,
            last_name: true,
            school: true,
            email: true,
            username: true
        }
    })

    return res.status(Code.s200_OK).send(sendTemplate(showUser))
})

router.put("/me/update",async (req: Request, res: Response)=>{
    const updateUser: any = await prisma.user.update({
        where:{
            id: Number(res.locals.userId)
        },
        data:{
            first_name: req.body.first_name || undefined,
            last_name: req.body.last_name || undefined,
            // school: req.body.school || undefined,
            // username: req.body.username,
            email: req.body.email || undefined
        }
    }).catch((err: any)=>{
        return res.status(Code.S400_Bad_Request).send(sendTemplate({message: "There has been an error in updating your credentials", error :err}))

    })

    return res.status(Code.s200_OK)
    .send(sendTemplate({message: "Your credentials has been updated!"}))
})

router.put("/me/password", async (req: Request, res: Response)=>{

    if(req.body.password === req.body.confirm_password){
        const updatePassword: any = await prisma.user.update({
            where:{
                id : Number(res.locals.userId)
            },
            data:{
                password: await bcrypt.hash(req.body.password, 10)

            }
        }).catch((err)=>{
            return res.status(Code.S400_Bad_Request).send(sendTemplate({message: "There has been an error in updating your password", error: err}))
        })

    return res.status(Code.s200_OK).send(sendTemplate({message: "Your password has been updated!"}))

    }

    return res.status(Code.S400_Bad_Request).send(sendTemplate({message: "Password mismatch"}))
    
})

router.delete("/me/deactivate", async (req: Request, res: Response)=>{
    const userDelete = await prisma.user.delete({
        where:{
            id: Number(res.locals.userId)
        }
    }).then(()=>{
        return res.status(Code.s200_OK).send(sendTemplate({message: "Successfully deleted your account!"}))

    }).catch((err: any)=>{
        return res.send(sendTemplate({message: "There has been an error in deleting your account", error: err})).status(Code.S400_Bad_Request)
    })
})

export const UserRouter: Router = router;