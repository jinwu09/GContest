import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { sendTemplate, Code } from "../methods/template";
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

    return res.send(sendTemplate(showUser)).status(Code.s200_OK)
})

router.put("/me/update",async (req: Request, res: Response)=>{
    const updateUser: any = await prisma.user.update({
        where:{
            id: Number(res.locals.userId)
        },
        data:{
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            school: req.body.school,
            username: req.body.username
        }
    }).catch((err: any)=>{
        return res.send(sendTemplate({message: "There has been an error in updating your credentials", error :err})).status(Code.S400_Bad_Request)

    })

    return res.send(sendTemplate({message: "Your credentials has been updated!"})).status(Code.s200_OK)

})

router.put("/me/password", async (req: Request, res: Response)=>{

    if(req.body.password === req.body.confirm_password){
        const updatePassword: any = await prisma.user.update({
            where:{
                id : Number(res.locals.userId)
            },
            data:{
                password: req.body.password
            }
        }).catch((err)=>{
            return res.send(sendTemplate({message: "There has been an error in updating your password", error: err})).status(Code.S400_Bad_Request)
        })

    return res.send(sendTemplate({message: "Your password has been updated!"})).status(Code.s200_OK)

    }

    return res.send(sendTemplate({message: "Password mismatch"})).status(Code.S400_Bad_Request)
    
})

router.delete("/me/deactivate", async (req: Request, res: Response)=>{
    const userDelete = await prisma.user.delete({
        where:{
            id: Number(res.locals.userId)
        }
    }).catch((err: any)=>{
        return res.send(sendTemplate({message: "There has been an error in deleting your account", error: err})).status(Code.S400_Bad_Request)
    })
})

export const UserRouter: Router = router;