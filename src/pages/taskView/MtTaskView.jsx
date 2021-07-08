import React, {useEffect} from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { Link, useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";

import Tasks from "../../components/tasks/Tasks";
import ButtonGroup from "./ButtonGroup";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" style={{ textDecoration: "none" }}>
        Laundry inc.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  button: {
    textTransform: "none",
    marginRight: "10px",
    // marginLeft:'5px',
    opacity: 0.6,
    borderRadius: 10,
    border: "2px solid #00008b",
    height: 50,
    "&:hover": {
      color: "#00008b",
      transform: `scale(1.10)`,
    },
  },
  buttonPending: {
    textTransform: "none",
    marginRight: "10px",
    // marginLeft:'5px',
    opacity: 0.6,
    borderRadius: 10,
    border: "1px solid #f50057",
    height: 50,
    "&:hover": {
      color: "#f50057",
      transform: `scale(1.05)`,
    },
  },
  buttonCompleted: {
    textTransform: "none",
    marginRight: "10px",
    // marginLeft:'5px',
    opacity: 0.6,
    borderRadius: 10,
    border: "1px solid #4caf50",
    height: 50,
    "&:hover": {
      color: "#4caf50",
      transform: `scale(1.05)`,
    },
  },
  selectedCompleted: {
    textTransform: "none",
    marginRight: "10px",
    // marginLeft:'5px',
    backgroundColor: "#4caf50",
    color: "#fff",
    opacity: 1,
    borderRadius: 10,
    "&:hover": {
      opacity: 0.8,
      color: "#fff",
      transform: `scale(1.05)`,
      // backgroundColor:'#00A2FE',
      backgroundColor: "#4caf50",
    },
  },
  selectedPending: {
    textTransform: "none",
    marginRight: "10px",
    // marginLeft:'5px',
    backgroundColor: "#f50057",
    color: "#fff",
    opacity: 1,
    borderRadius: 10,
    "&:hover": {
      opacity: 0.8,
      color: "#fff",
      transform: `scale(1.05)`,
      // backgroundColor:'#00A2FE',
      backgroundColor: "#f50057",
    },
  },
}));

export default function MtTaskView(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [pending, setPending] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [data, setData] = React.useState([])
  const [ogData, setOgData] = React.useState([])

  const history = useHistory();

  const names = ["All Pending", "All Completed"];

  function handleButtonClick(event) {
    if (event === "newTask") {
      history.push("/createTask");
    } else if (event === "pending") {
      if (pending === false) {
        setPending(true);
        setCompleted(false);
        sortPending();
      } else {
        setPending(false);
        setData(ogData);
      }
    } else if (event === "completed") {
      if (completed === false) {
        setCompleted(true);
        setPending(false);
        sortCompleted();
      } else {
        setCompleted(false);
        setData(ogData)
      }
    }
  };

  function sortCompleted() {
    let cd;
    cd = ogData
    setData(cd.filter((d) => d.status === "Completed"))
  }

  function sortPending() {
    let cd;
    cd = ogData;
    setData(cd.filter((d) => d.status === "Pending"));
  }

  useEffect(() => {
    setData(props.data)
    setOgData(props.data)
  }, []);
  
  return (
    <Grid item xs={12}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1> Task Management </h1>
          <Grid item xs={12} spacing={3} justifyContent="space-between">
            <Button
              className={classes.button}
              onClick={() => handleButtonClick("newTask")}
            >
              Create New Task
            </Button>
            <Button
              className={pending ? classes.selectedPending : classes.buttonPending}
              onClick={() => handleButtonClick("pending")}
            >
              View All Pending
            </Button>
            <Button
              className={completed ? classes.selectedCompleted : classes.buttonCompleted}
              onClick={() => handleButtonClick("completed")}
            >
              View All Completed
            </Button>
          </Grid>

          <Tasks data={data} />
        </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </Grid>
  );
}
