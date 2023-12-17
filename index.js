const bodyParser = require('body-parser');
const express = require('express');
const yaml = require('yaml');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const cors = require("cors");

const host = 'localhost';
const port = 8000;
    
const app = express();

let type = 'utf-8';
let filePath = 'openapi.yaml'

const fileData = fs.readFileSync(filePath, type);
const swaggerDocument = yaml.parse(fileData);

const authRouter = require('./routes/auth-router');
const deviceRouter = require('./routes/device-router');
const mainRouter = require('./routes/main-router');

var corsOptions = {
    origin: `http://${host}:${port}`, // Змінено порт на 8000, як у вашому клієнтському скрипті
  };
app.use(cors(corsOptions));

app.use('/server-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use('/auth', authRouter);
app.use('/device', deviceRouter);
app.use('/', mainRouter);

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
    