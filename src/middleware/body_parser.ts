import { Application } from "express";
import bodyParser from "body-parser";

export const configBodyParser = (app: Application): void => {
    app.use(bodyParser.json());
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

}