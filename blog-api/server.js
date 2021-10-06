import express from 'express';
import cors from "cors";
import './db-connect.js'
import postsRouter from './routes/postsRouter.js';
import commentsRouter from './routes/commentsRouter.js';
import usersRouter from './routes/usersRouter.js';
import config from './config/config.js'
import cookieParser from 'cookie-parser';
import createHttpError from 'http-errors';

const app = express();

try {
  app.use(express.json({ limit: '1MB' }));
} catch (error) {
  console.log(error)
}

app.use((err, req, res, next) => {
  console.log(err.toString())
  if (err.type === 'entity.too.large') {
    res.send('this is the errorooooorrrr')
  }
  // if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
  //     if (err.type === 'entity.parse.failed') {
  //         let data = req.body || req.query;
  //         try {
  //             JSON.parse(data); // <-- reproduce error in order to catch it
  //         } catch (error) {
  //             // get the first line of error which is "SyntaxError: Unexpected string in JSON at position 59"
  //             let message = error.toString().split("\n")[0];
  //             return res.status(400).send({ status: 400, message: message }); // Bad request
  //         }
  //     }            
  //     else return res.status(400).send(err); // Bad request
  // }
});


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
  console.log('i am the err', err.message)
  res.status(400).send({
    error: {
      message: err.message,
      status: err.status,
    },
  });
});
