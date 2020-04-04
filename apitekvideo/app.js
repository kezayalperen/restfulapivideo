const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

const app = express();

app.use(bodyParser.json());

// Import routes

const postRoute = require('./routes/posts');

app.use('/posts', postRoute)

// Connect to DB

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true,
      useUnifiedTopology: true},
     () => console.log('connect to db')
)

// Routes

app.get('/' , (req,res) => {
    res.send('Merhaba dünya');
});


// Listening

app.listen(3000);