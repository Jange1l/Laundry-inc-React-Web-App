import React from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import MtTaskView from "../taskView/MtTaskView";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid, Paper } from "@material-ui/core";
import CompletedTasks from "../../components/featuredInfo/CompletedTasks";
import PendingTasks from "../../components/featuredInfo/PendingTasks";
import AllTasks from "../../components/featuredInfo/AllTasks";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: '#fafafa'
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    flexDirection: "row",
  },
  root: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const [taskData, setData] = useState("");
  const [completed, setCompleted] = useState("");
  const [pending, setPending] = useState("");

  const classes = useStyles();

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("http://localhost:8080/tasks/tasks");
      setData(res.data.tasks);
      console.log(res.data.tasks);
      setCompleted(
        res.data.tasks.filter((d) => d.status === "Completed").length
      );
      setPending(res.data.tasks.filter((d) => d.status === "Pending").length);
    };
    fetchTasks();
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <AllTasks allTask={taskData.length} />
          <PendingTasks pendingTask={pending} />
          <CompletedTasks completedTask={completed} />

          {taskData ? <MtTaskView data={taskData} /> : null}
        </Grid>
      </Container>
    </main>
  );
}
