import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import PostsProvider from './context/PostsProvider'
import UserProvider from './context/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <PostsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
