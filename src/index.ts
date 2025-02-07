import express, { Application, Request, Response } from "express";
import routes from "./routes";
import { configBodyParser } from "./middleware/body_parser";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config(); //USE FOR LOCAL PURPOSES

const app: Application = express();
const port: number = 4000;

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true
// };

const allowedOrigins = [
    process.env.FRONTEND_DEV_URL,
    process.env.FRONTEND_PRODUCT_URL,
];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors<Request>(corsOptions));

//LIMIT UPLOAD FILE SIZE
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

configBodyParser(app);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "Connected sucessfully.",
    });
});

app.use(routes);

app.listen(4000, () => console.log(`Listening on port ${port}.`));