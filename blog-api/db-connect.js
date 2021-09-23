import mongoose from 'mongoose'
import config from './config/config.js'

const strConn = config.mongooseUrl

mongoose.connect(strConn, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log("Connection to database established!"))
.catch((err) => console.log("[ERROR] Connection failed!"))
