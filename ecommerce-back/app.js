const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();
// Import rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// app
const app = express();

//db connection
mongoose.connect(
    process.env.MONGO_URI, /* CDN do mongo no arquivo .env */ {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
  ).then(() => console.log('DB Conectado'))
  .catch((error) => console.log(error))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Rotas Middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

// app.get('/', (req, res) => {
//     res.send('It\'s not here ')
// });

const port = process.env.PORT || 8000; // 8000

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});