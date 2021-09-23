import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostList from "./pages/PostList";
import PostView from "./pages/PostView";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import './style/main.scss'

function App() {

  const user = true // this will be replaced by user data from the server

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/posts/:id">
          <PostView />
        </Route>
        <Route exact path="/posts">
          <PostList />
        </Route>
        <Route path="/write">
          user? <Write /> : <Login/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
