const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { MONGO_URI } = require("./config");
const app = express();



(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a Mongo DB');
  } catch(error) {
    console.log(error);
  }
})();

// Middleware para parsear JSON y datos de formulario
app.use(cors());
app.use(express.json());
app.use(cookieParser());


//RUTAS FRONTEND
// Rutas corregidas según la estructura real
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/img', express.static(path.resolve('img')));
//app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));

app.use(morgan('tiny'));

//RUTAS BACKEND
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



module.exports = app;

