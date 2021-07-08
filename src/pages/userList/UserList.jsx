import React from "react";
import "./userList.css";

import { useEffect, useState, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import UserDetail from "./UserDetail";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  button: {
    marginTop: theme.spacing(3),
    alignContent: "center",
  },
  gridContainer: {
    flex: 4,
  },
  root: {
    paddingTop: 20,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function UserList() {
  const classes = useStyles();

  const gridRef = useRef(null);

  const [users, setUsers] = useState([]);

  
  const rowData = [
    {
      _id: 1,
      firstName: "Jon",
      lastName: "Smith",
      email: "jon.smith@gmail.com",
    },
    {
      _id: 1,
      firstName: "Jon",
      lastName: "Smith",
      email: "jon.smith@gmail.com",
    },
    {
      _id: 1,
      firstName: "Jon",
      lastName: "Smith",
      email: "jon.smith@gmail.com",
    },
  ];

  const onButtonClick = (e) => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.make} ${node.model}`)
      .join(", ");
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:8080/users/usersList");
      const staff = res.data.users.filter((user) => user.userType === "Staff");
      setUsers(staff);
    };
    fetchUsers();
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid className={classes.gridContainer}>
          <h1> Laundry inc Staff </h1>
          <Link to="/createStaff" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Create New Staff
            </Button>
          </Link>
          <Grid container className={classes.root} spacing={2}>
            <Grid container item xs={12}>
              <Grid container justify="center" spacing={5}>
                {users.map((user) => (
                  <UserDetail user={user} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
