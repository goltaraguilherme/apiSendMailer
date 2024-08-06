import express, {Request, Response} from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { emailRouter } from "./routes/email.router";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.use("/utils", emailRouter);

const port:number = 3000 | <number>Number(process.env.PORT);

app.get('/', async (req: Request, res: Response) => {
    res.send("Api is running...")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


export default app;