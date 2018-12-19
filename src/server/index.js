const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const departments = require('./routes/departments');

const publicPath = path.join(__dirname, '../../', 'dist');
const app = express();


// Connect to MongoDB database
// DB connection of production saved Heroku config - it can see Heroku -> setting
const URI = process.env.NODE_ENV === 'production' ? process.env.prod_db : 'mongodb://localhost:27017/redux-demo';
mongoose.connect(URI, { useNewUrlParser: true })
  .then(
    () => console.log(`Connected MongoDB...${URI}`),
    (err) => console.log('Could not connect to MongoDB...', err)
  )

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist'));
// RESTful API router
app.use('/api/departments', departments);


// Client router
app.get('/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
