import { Grid, Paper } from "@material-ui/core";
import React from "react";
import "./featuredInfo.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 100,
    borderRadius: 20,
  },
  title: {
    color: "#4caf50",
  },
}));

export default function CompletedTasks(props) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid item xs>
      <Paper className={fixedHeightPaper}>
        <Typography
          component="h2"
          variant="h6"
          gutterBottom
          className={classes.title}
        >
          Completed Tasks
        </Typography>
        <Typography component="p" variant="h4">
          {props.completedTask}
        </Typography>
      </Paper>
    </Grid>
  );
}
