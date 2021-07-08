import React from "react";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./app.css";
import CreateTask from "./pages/taskView/CreateTask";
import Sidebar from "./components/sidebar/Sidebar";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import CreateStaff from "./pages/createStaff/CreateStaff";
import TaskView from "./pages/taskView/TaskView";
import SideBarMu from "./components/sidebar/SideBarMu";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

function checkUserStatus() {
  const isLoggedIn = false;
  const history = useHistory();
}

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
function App() {
  const classes = useStyles();
  checkUserStatus();
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <SideBarMu />
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/users">
            <SideBarMu />
            <UserList />
          </Route>
          <Route exact path="/taskView:taskViewId">
            <SideBarMu />
            <TaskView />
          </Route>
          <Route exact path="/createTask">
            <SideBarMu />
            <CreateTask />
          </Route>
          <Route exact path="/createStaff">
            <SideBarMu />
            <CreateStaff />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
