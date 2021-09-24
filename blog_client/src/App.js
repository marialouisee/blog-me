import { useContext } from 'react';
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostList from "./pages/PostList";
import PostView from "./pages/PostView";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import { UserContext } from "./context/UserProvider";
import './style/main.scss';
// import { ToastContainer } from 'react-toastify';
import  { Toaster } from 'react-hot-toast';


function App() {

  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          {user? null : <Login />}
        </Route>
        <Route exact path="/posts/:id">
          <PostView />
        </Route>
        <Route exact path="/posts">
          <PostList />
        </Route>
        <Route path="/users/:id/write">
          {user? <Write /> : <Login/> }
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Toaster />
    </div>
  );
}

export default App;
