import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import jwt from 'jsonwebtoken';
import config from '../config/config.js'

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      validate: {
        // check if the username is unique
        validator: async (value) => {
          const User = mongoose.model("User");
          const user = await User.findOne({ username: value });
          if (user) return false;
          else return true;
        },
        message: (props) => `${props.value} is taken!`,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        // check if the email is unique
        validator: async (value) => {
          const User = mongoose.model("User");
          const user = await User.findOne({ email: value });
          if (user) return false;
          else return true;
        },
        message: (props) => `${props.value} is taken!`,
      },
    },
    password: { type: String, required: [true, "password is required"] },
    image: {
      type: String,
      default: "https://upload.wikimedia.org/wikipedia/en/f/fb/Yellow_icon.svg",
    },
  },
  {
    versionKey: false,
    timestamps: true, // will create createdAt and updatedAt fields
  }, {
    toJSON: { 
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      }
    },
  }
);


// is user?
UserSchema.statics.findByToken =  function (token) {
  // console.log(token)
  const User = this;
  try {
    let decoded = jwt.verify(token, config.secretKey);
    // console.log(decoded)
    // will return the payload : { _id: user._id }
    let user = User.findOne({ _id: decoded._id });
    return user;
  } catch (error) {
    return;
  }
}

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, config.secretKey , {expiresIn: '2d'});
  console.log('this is the token', token)
  return token;
};

UserSchema.methods.deleteToken = function (token) {
  const user = this;
  user.tokens = user.tokens.filter((t) => {
    return t.token !== token;
  });
  return user.save();
};

const User = model("User", UserSchema);

export default User;