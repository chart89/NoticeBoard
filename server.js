const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');


// start express server
const app = express();
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

// connects our backend code with the database
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = `mongodb+srv://${process.env.DB_PASS}@cluster0.3qxxs4z.mongodb.net/noticeDB?retryWrites=true&w=majority`;
else if(NODE_ENV === 'test') dbUri = 'mongodb://0.0.0.0:27017/noticeDBtest';
else dbUri = 'mongodb://0.0.0.0:27017/noticeDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

// add middleware
if(NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'Halo', 
                  store: MongoStore.create(mongoose.connection), 
                  resave: false, 
                  saveUninitialized: false,
                  cookie: {
                    secure: NODE_ENV === 'production',
                  }, 
}));      

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));

// add routes
const noticeRoutes = require('./routes/notices.routes');
const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');


// add endpoints
app.use('/api', noticeRoutes);
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);


app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
  });





