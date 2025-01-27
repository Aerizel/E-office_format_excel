import express, { Application, Request, Response } from "express";
import routes from "./routes";
import { configBodyParser } from "./middleware/bodyParser";
import cors from 'cors';

const app: Application = express();
const port: number = 4000;

configBodyParser(app);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success connected.",
    });
});

app.use(routes);

app.listen(4000, () => console.log(`Listening on port ${port}.`));