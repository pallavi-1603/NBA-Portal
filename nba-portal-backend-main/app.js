const express = require('express')
const cors = require('cors')

const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const profRouter = require('./routes/profRoutes')
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json())
app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Origin', req.headers.origin);   
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, PUT, OPTIONS")
//     next();
// })


app.use('/user', userRouter);
app.use('/professor', profRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);


module.exports = app;
