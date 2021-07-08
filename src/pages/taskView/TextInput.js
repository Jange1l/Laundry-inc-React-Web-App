import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const uuidv4 = require('uuid/v4');

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
      margin: `${theme.spacing(0)} auto`,
    },
    wrapText: {
      width: "100%",
    },
    button: {
      //margin: theme.spacing(1),
    },
  })
);

export const TextInput = (props) => {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const { taskViewId } = useParams();

  const sendMessage = async (e) => {
    const length = props.length + 1;
    try {
      const res = await axios.post(
        `http://localhost:8080/tasks/taskConversation/${taskViewId}`,
        {
          text: message,
          _id: uuidv4(),
          user: { _id: 1, name: "Admin", avatar: "" },
          createdAt: new Date(),
        }
      );
      
      setMessage("");
      window.location.reload();
    } catch (err) {}
  };
  return (
    <form className={classes.wrapForm} noValidate autoComplete="off">
      <TextField
        id="standard-text"
        label="Type message here"
        className={classes.wrapText}
        margin="normal"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={sendMessage}
      >
        <SendIcon />
      </Button>
    </form>
  );
};
