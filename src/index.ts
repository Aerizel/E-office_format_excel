import express, { Application, Request, Response } from "express";
import routes from "./routes";
import { configBodyParser } from "./middleware/body_parser";
import cors from 'cors';

const app: Application = express();
const port: number = 4000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

app.use(cors<Request>(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

configBodyParser(app);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "Connected scessfully.",
    });
});

app.use(routes);

app.listen(4000, () => console.log(`Listening on port ${port}.`));