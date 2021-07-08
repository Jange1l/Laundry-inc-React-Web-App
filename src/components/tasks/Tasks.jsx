import React from "react";
import "./tasks.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useHistory } from "react-router-dom";

import { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { composeClasses } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TaskDetail from "./TaskDetail";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 20,
  },
  paper: {
    height: 200,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Tasks(props) {
  const gridRef = useRef(null);
  const history = useHistory();
  const [data, setData] = useState([]);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid container justify="center" spacing={3}>
        {props.data.map((task) => (
          <TaskDetail task={task} key={task._id} />
        ))}
      </Grid>
    </Grid>
    
  );
}
