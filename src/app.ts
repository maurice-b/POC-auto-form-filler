import express from "express";
import path from "path";
import bodyParser from "body-parser";
import {FormModelInterface} from "../shared/interfaces/form-model.interface";
import fs from "fs";

const nocache = require('nocache');
const dayjs = require('dayjs')

const app = express();
const port = 8080; // default port to listen

app.use('/static', express.static(path.join(__dirname, 'assets')));

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(nocache());

// define a route handler for the default home page
app.get("/", (req, res) => {
    // render the index template
    res.render("index");
});

app.post("/submit-form", (req, res) => {
    const requestData = req.body as FormModelInterface;
    requestData.processedDateTime = dayjs().format('YYYY-MM-DD_HH-mm-ss');
    console.info(requestData);

    // Create new file
    const fileName = `${requestData.name}-${requestData.processedDateTime}.txt`;
    const json = JSON.stringify(requestData);
    fs.writeFileSync(`src/assets/files/${fileName}`, json, 'utf8');

    res.render("page-thanks", {
        fileName: fileName
    });
});

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.info(`server started at http://localhost:${port}`);
});