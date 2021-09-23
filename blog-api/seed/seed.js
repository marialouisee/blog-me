import mongoose from "mongoose";
import "../db-connect.js";
import faker from "faker";
import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import User from '../models/User.js';

const seed = async () => {
  try {
    // CLEANUP 
    await Comment.deleteMany();
    await Post.deleteMany();
    await User.deleteMany();

    // INSERT 2 USERS
    const users = await User.insertMany([
      {
        username: faker.internet.userName(),
        password: "12345",
        email: faker.internet.email()
      },
      {
        username: faker.internet.userName(),
        password: "12345",
        email: faker.internet.email()
      }
    ]);

    // INSERT 2 BLOG POSTS
    const posts = await Post.insertMany([
      {
        title: faker.lorem.words(),
        authorId: users[0],
        text: "Post 1 " + faker.lorem.sentences(5),
        stats: { likes: faker.datatype.number(50), dislikes: faker.datatype.number(50) }
      },
      {
        title: faker.lorem.words(),
        authorId: users[1],
        text: "Post 2 " + faker.lorem.sentences(5),
        stats: { likes: faker.datatype.number(50), dislikes: faker.datatype.number(50) }
      },
    ]);

    // INSERT 5 COMMENTS TO BLOG POSTS ...

    const comments = await Comment.insertMany([
      {
        postId: faker.random.arrayElement(posts),
        author: faker.random.arrayElement(users),
        text: "Oh no",
        
      },
      {
        postId: faker.random.arrayElement(posts),
        author: faker.random.arrayElement(users),
        text: "Fuck no..",
      },
      {
        postId: faker.random.arrayElement(posts),
        author: faker.random.arrayElement(users),
        text: "Whyyyy",
      },
      {
        postId: faker.random.arrayElement(posts),
        author: faker.random.arrayElement(users),
        text: "Hell No",
      },
      {
        postId: faker.random.arrayElement(posts),
        author: faker.random.arrayElement(users),
        text: "Just NO.",
      },
    ]);


    

    //  SUCCESS REPORT
    console.log(`Seeded ${users.length} Users + ${posts.length} Posts + ${comments.length} comments`);

    // CLOSE CONNECTION TO DATABASE AND FINISH SCRIPT
    await mongoose.connection.close();
  } catch (error) {
    console.log(error.message, error);
  }
};

seed();
