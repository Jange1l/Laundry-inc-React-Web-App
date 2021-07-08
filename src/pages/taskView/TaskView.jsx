import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.js";
import { Message } from "./Message";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "./ButtonGroup.jsx";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      height: "100vh",
      width: "100wh",
      flex: 4,
      justifyContent: "center",
    },
    paper: {
      width: "60vw",
      height: "70vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    },
    paper2: {
      display: "flex",
      boxShadow:
        "0 3.5px 10.3px -40px rgba(0, 0, 0, 0.115),0 9.6px 28.4px -40px rgba(0, 0, 0, 0.165),0 23.2px 68.4px -40px rgba(0, 0, 0, 0.215)",
    },
    buttonContainer: {
      width: "60vw",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )",
    },
    title: {
      fontSize: 17,
      color: "green",
    },
    titlePending: {
      fontSize: 17,
      color: "red",
    },
    pos: {
      marginBottom: 12,
    },
    statusBarPending: {
      backgroundColor: "#f50057",
      display: "felx",
      flexDirection: "column",
      width: "5%",
    },
    statusBarCompleted: {
      backgroundColor: "#4caf50",
      display: "felx",
      flexDirection: "column",
      width: "5%",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      width: "95%",
    },
    cardContent: {
      flex: "1 0 auto",
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
  })
);

export default function TaskView(props) {
  const classes = useStyles();
  const params = useParams();

  const [taskName, setTaskName] = useState("");
  const [staffName, setStaffName] = useState("");
  const [messages, setMessages] = React.useState([]);
  const [description, setDescription] = useState("");
  const [viewType, setViewType] = useState(0);
  const [status, setStatus] = useState("");
  // console.log(params);
  const buttonNames = ["Details", "Conversation"];

  const onButtonSelected = (event) => {
    setViewType(event);
  };
  useEffect(() => {
    const fetchConversation = async () => {
      const res = await axios.get(
        `http://localhost:8080/tasks/taskConversation/${params.taskViewId}`
      );
      console.log(res);
      setTaskName(res.data.conversation.conversationName);
      setMessages(res.data.conversation.messages);
    };

    const fecthTaskDetails = async () => {
      const res = await axios.get(
        `http://localhost:8080/tasks/taskDetails/${params.taskViewId}`
      );
      console.log(res);
      setDescription(res.data.task.taskDescription);
      setStatus(res.data.task.status);
      setStaffName(res.data.task.staffName);
    };

    fetchConversation();
    fecthTaskDetails();
  }, []);

  function Title(props) {
    const status = props.task;
    console.log(status);
    if (status === "Pending") {
      return (
        <Typography className={classes.titlePending} gutterBottom>
          {"Status: " + props.task}
        </Typography>
      );
    } else {
      return (
        <Typography className={classes.title} gutterBottom>
          {"Status: " + props.task}
        </Typography>
      );
    }
  }

  function Status(props) {
    const status = props.task;
    console.log(status);
    if (status === "Pending") {
      return <div className={classes.statusBarPending}></div>;
    } else {
      return <div className={classes.statusBarCompleted}></div>;
    }
  }
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid
          container
          spacing={3}
          align="center"
          justify="center"
          direction="column"
        >
          <Grid item xs={12}>
            <h1> {"Task Name: " + taskName} </h1>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.buttonContainer}>
              <ButtonGroup
                names={buttonNames}
                buttonClicked={onButtonSelected}
                value={viewType}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {viewType === 0 ? (
              <Grid item xs={4}>
                <Card className={classes.paper2}>
                  <Status task={status} />
                  <div className={classes.details}>
                    <CardContent className={classes.cardContent}>
                      <Title task={status} />
                      <Typography variant="h5" component="h2">
                        {description}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {"Assigned to: " + staffName}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            ) : (
              <Paper className={classes.paper} elevation={1}>
                <Paper id="style-1" className={classes.messagesBody}>
                  {messages.map((m) => (
                    <Message message={m} />
                  ))}
                </Paper>
                <TextInput length={messages.length} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
