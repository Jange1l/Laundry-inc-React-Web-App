import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import CardActions from "@material-ui/core/CardActions";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 15,
    boxShadow:
      "0 3.5px 10.3px -40px rgba(0, 0, 0, 0.115),0 9.6px 28.4px -40px rgba(0, 0, 0, 0.165),0 23.2px 68.4px -40px rgba(0, 0, 0, 0.215)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function UserDetail(props) {
  const classes = useStyles();

  console.log('button')
  console.log(props);

  const deleteUser = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/users//deleteStaff/:${props.user._id}`)
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid key={props.user._id} item>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.user.firstName + " " + props.user.lastName}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.user.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={deleteUser}
          >
            {" "}
            Delete{" "}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
