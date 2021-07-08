import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";

import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import ApartmentIcon from "@material-ui/icons/Apartment";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import BathtubIcon from "@material-ui/icons/Bathtub";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 400,
  },
  layout: {
    flex: 4,
    justifyContent: "center",
    display: "flex",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    alignItems: "center",
    // maxWidth: "50vw",
    // maxHeight: "40vh",
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    alignContent: "center",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CreateTask() {
  const classes = useStyles();
  const theme = useTheme();
  const [staffName, setStaffName] = React.useState([]);
  const [staffEmail, setStaffEmail] = React.useState([]);
  const [users, setUsers] = useState([]);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [error, setError] = useState(false);

  const categories = ["Car", "Apartment", "Bus", "Laundry", "Bath Tub"];

  function Icon(p) {
    console.log(p);
    switch (p.name) {
      case "Car":
        return (
          <ListItemIcon>
            <DirectionsCarIcon />
          </ListItemIcon>
        );

      case "Apartment":
        return (
          <ListItemIcon>
            <ApartmentIcon />
          </ListItemIcon>
        );
      case "Bus":
        return (
          <ListItemIcon>
            <DirectionsBusIcon />
          </ListItemIcon>
        );
      case "Laundry":
        return (
          <ListItemIcon>
            <LocalLaundryServiceIcon />
          </ListItemIcon>
        );
      default:
        return (
          <ListItemIcon>
            <BathtubIcon />
          </ListItemIcon>
        );
    }
  }
  const handleChange = (event) => {
    console.log(event.target);
    setStaffName(event.target.value);
    setStaffEmail(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const createTask = async (e) => {
    e.preventDefault();
    setError(false);
    const i = (element) => element.email === staffEmail;
    const u = users[users.findIndex(i)];

    try {
      const res = await axios.post("http://localhost:8080/tasks/task", {
        taskName: taskName,
        staffName: u.firstName + " " + u.lastName,
        staffEmail: u.email,
        staffId: u._id,
        taskDescription: taskDescription,
        status: "Pending",
        category: category,
      });
      res.data && window.location.replace("/");
    } catch (err) {
      setError(true);
    }
    console.log(taskName);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:8080/users/usersList");
      const staff = res.data.users.filter((user) => user.userType === "Staff");
      setUsers(staff);
      console.log(staff);
    };
    fetchUsers();
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        {/* <main className={classes.layout}> */}
        <Grid container justify="center" alignItems="center">
          <Paper className={classes.paper} elevation={2}>
            <React.Fragment>
              <CssBaseline />
              <Typography variant="h6" gutterBottom>
                Create Task
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Task Name"
                    fullWidth
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Task Description"
                    fullWidth
                    multiline
                    value={taskDescription}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="demo-mutiple-chip-label">
                    Assigned Staff
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={staffName}
                    fullWidth
                    onChange={handleChange}
                  >
                    {users.map((user) => (
                      <MenuItem
                        key={user.firstName}
                        value={user.email}
                        name={user.firstName}
                        style={getStyles(user.firstName, staffName, theme)}
                      >
                        {user.firstName + " " + user.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="demo-mutiple-chip-label">
                    Task Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    fullWidth
                    onChange={handleChangeCategory}
                  >
                    {categories.map((c) => (
                      <MenuItem
                        key={c}
                        value={c}
                        name={c}
                        style={getStyles(c, category, theme)}
                      >
                        <Icon name={c} />
                        <Typography variant="inherit">{c}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={createTask}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          </Paper>
        </Grid>
        {/* </main> */}
      </Container>
    </main>
  );
}
