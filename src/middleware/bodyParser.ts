import { Application } from "express";
import bodyParser from "body-parser";

export const configBodyParser = (app: Application): void => {
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
}