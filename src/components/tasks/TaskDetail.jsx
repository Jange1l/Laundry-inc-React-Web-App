import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    boxShadow: "0 3.5px 10.3px -40px rgba(0, 0, 0, 0.115),0 9.6px 28.4px -40px rgba(0, 0, 0, 0.165),0 23.2px 68.4px -40px rgba(0, 0, 0, 0.215)",
    borderRadius: 15
  },
  statusBarPending: {
    backgroundColor: "#f50057",
    display: "felx",
    flexDirection: "column",
    width: 5,
  },
  statusBarCompleted: {
    backgroundColor: "#4caf50",
    display: "felx",
    flexDirection: "column",
    width: 5,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: 300,
  },
  content: {
    flex: "1 0 auto",
  },

  pos: {
    marginBottom: 12,
    fontSize: 19,
  },
});

export default function TaskDetail(props) {
  const classes = useStyles();
  const history = useHistory();

  function Status(props) {
    const status = props.task.status;

    if (status === "Pending") {
      return <div className={classes.statusBarPending}></div>;
    } else {
      return <div className={classes.statusBarCompleted}></div>;
    }
  }

  const handleClick = (e) => {
    const id = props.task.messagesId;
    const taskId = props.task._id;
    console.log(taskId);
    history.push("/taskView:" + id + ":" + taskId);
  };

  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <Status task={props.task} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h2">
              {props.task.taskName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {"Assigned to: " + props.task.staffName}
            </Typography>
            <Typography noWrap variant="body1" component="p">
              {props.task.taskDescription}
            </Typography>
          </CardContent>
        </div>

        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleClick}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
