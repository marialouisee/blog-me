import express from 'express';
import cors from "cors";
import './db-connect.js'
import postsRouter from './routes/postsRouter.js';
import commentsRouter from './routes/commentsRouter.js';
import usersRouter from './routes/usersRouter.js';
import config from './config/config.js'
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json({ limit: '1MB' }));
app.use(
  cors({ origin: config.frontendOrigin, credentials: true })
);
app.use(cookieParser());

// HOME ROUTE
app.get('/', (req, res) => {
    res.send('Hello World!');
  });

// ROUTERS
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter) 


// LISTEN
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}, http://localhost:${PORT}`);
})

// ERROR HANDLER

app.use( (err, req, res, next) => {
  res.status(err.status || 400).send({
    error: {
      message: err.message,
      status: err.status,
    },
  });
});
