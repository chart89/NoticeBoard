const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
const noticeRoutes = require('./routes/notices.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', noticeRoutes);

app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
  });

// connects our backend code with the database
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'url to remote db';
else if(NODE_ENV === 'test') dbUri = 'mongodb://0.0.0.0:27017/noticeDBtest';
else dbUri = 'mongodb://0.0.0.0:27017/noticeDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;

