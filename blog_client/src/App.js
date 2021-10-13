import { useContext } from 'react';
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostList from "./pages/PostList";
import PostView from "./pages/PostView";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import User from "./pages/User";
import PrivateRoute from './components/PrivateRoute';
import { UserContext } from "./context/UserProvider";
import './style/main.scss';
import  { Toaster } from 'react-hot-toast';



function App() {
  const { user } = useContext(UserContext);
  // console.log('this is user',user)

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/register" component={user? null : Register} />
        <Route exact path="/login" component={user ? null : Login} />
        <Route exact path="/posts/:id" component={PostView} />
        <Route exact path="/posts" component={PostList} />
        <PrivateRoute exact path="/users/:id/write" component={Write} />
        <PrivateRoute exact path="/users/:id" component={user ? User : null} />
        <Route exact path="/" component={Home} />
      </Switch>
      <Toaster />
    </div>
  );
}
export default App;
