import express, {Request, Response} from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import * as mailer from "./modules/mailer";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const port:number = 3000 | <number>Number(process.env.PORT);

app.get('/', async (req: Request, res: Response) => {
    res.send("Api is running...")
});

app.post('/send_email', async (req: Request, res: Response) => {
    try {
        const { respostas, type } = req.body;

        //@ts-ignore
        await mailer.default.sendMail({
            to: ["goltaraguilherme@gmail.com, andreluizgsantos01@gmail.com"],
            from: 'vamoturismo.app@gmail.com',
            template: 'form/resp_forms',
            subject: type == "Contato" ? "Contato SeuRoteiro": 'Resposta SeuRoteiro',
            context: {respostas},
        }, (err:any) => {
            console.log(err)
            if(err)
                return res.status(400).send({err: 'Não foi possível enviar o email. Tente novamente.'})
        })
        return res.send('Email enviado')
    } catch (error) {
        res.status(400).send({err: 'Tente novamente em instantes.'})
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


export default app;