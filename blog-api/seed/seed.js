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
        username: 'user1',
        password: "$2a$10$oKYnJDcvcQqEad9G3pTy7.On7VPfPaUZXDx.k8oQDAz.8JbV.oZeW",
        email: "user1@email.de"
      },
      {
        username: "user2",
        password: "$2a$10$oKYnJDcvcQqEad9G3pTy7.On7VPfPaUZXDx.k8oQDAz.8JbV.oZeW",
        email: "user2@email.de"
      }
    ]);

    // INSERT 2 BLOG POSTS
    const posts = await Post.insertMany([
      {
        title: faker.lorem.words(),
        authorId: users[0],
        text: "Post 1 " + faker.lorem.sentences(5),
        imageUrl: 'https://cdn.pixabay.com/photo/2021/08/24/15/38/sand-6570980_1280.jpg',
        stats: { likes: faker.datatype.number(50), dislikes: faker.datatype.number(50) }
      },
      {
        title: faker.lorem.words(),
        authorId: users[1],
        text: "Post 2 " + faker.lorem.sentences(5),
        imageUrl: 'https://cdn.pixabay.com/photo/2021/08/17/14/48/sea-6553205_1280.jpg',
        stats: { likes: faker.datatype.number(50), dislikes: faker.datatype.number(50) }
      },
      {
        title: faker.lorem.words(),
        authorId: users[1],
        text: "Post 3 " + faker.lorem.sentences(5),
        imageUrl: 'https://cdn.pixabay.com/photo/2021/08/24/15/38/sand-6570980_1280.jpg',
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
  } catch (err) {
    console.log(err);
  }
};

seed();
