import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import PostsProvider from './context/blogposts/PostsProvider'

ReactDOM.render(
  <React.StrictMode>
    <PostsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
