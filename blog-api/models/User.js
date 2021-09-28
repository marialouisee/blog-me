import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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
    avatar: {
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

const User = model("User", UserSchema);

export default User;