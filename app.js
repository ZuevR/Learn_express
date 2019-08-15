const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const mainRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');
const apiRouter = require('./api/v1/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/api/v1', apiRouter);

module.exports = app;
