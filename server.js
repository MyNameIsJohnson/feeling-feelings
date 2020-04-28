// imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// require('dotenv').config()

const PORT = process.env.PORT || 4000;

const routes = require('./routes');

const db = require('./models');

const corsOptions = {
  origin: [process.env.FRONTEND_URL], // allows the env variable to define allowable origin URLs
  methods: "GET,POST,PUT,DELETE",
  credentials: true, //allows session cookies to be sent back and forth
  optionsSuccessStatus: 200 //legacy browsers
}

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use((req, res, next) => {
  const { url, method } = req;
  const requestedAt = new Date().toLocaleTimeString();
  const result = `${method} ${url} ${requestedAt}`;
  console.log(result);
  next();
});

app.use(session({
  store: new MongoStore({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/feeling-feelings'
  }),
  secret: 'anythingjustdontgiveitoutanddontuploadyourenvtogithub',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
  }
}));

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: false}));


app.use('/', routes.views);

app.use('/api/v1', routes.api);

app.use('/api/*', (req, res) => {
  res.status(404).json({status: 404, error: 'Error 404: Resource not found'});
});

app.use('*', (req, res) => {
  res.send('<h2>Error 404: Not Found</h2>');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
