import express, { Request, Response } from "express";
import * as mailer from "../modules/mailer";

export const emailRouter = express.Router();

emailRouter.use(express.json());

emailRouter.post('/send_email', async (req: Request, res: Response) => {
    try {
        const { respostas, type } = req.body;

        //@ts-ignore
        await mailer.default.sendMail({
            to: ["goltaraguilherme@gmail.com, andreluizgsantos01@gmail.com"],
            from: 'vamoturismo.app@gmail.com',
            template: 'form/resp_forms',
            subject: type == "Contato" ? "Contato SeuRoteiro": 'Resposta SeuRoteiro',
            context: {respostas},
        }, (error:any) => {
            console.log(error)
            if(error)
                return res.status(400).send({err: 'Não foi possível enviar o email. Tente novamente.'})
        })
        return res.send('Email enviado')
    } catch (error) {
        res.status(400).send({err: 'Tente novamente em instantes.'})
    }
})

