import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 400,
  },
  layout: {
    flex: 4,
    paddingTop: 20,
    justifyContent: "center",
    display: "flex",
    width: "auto",
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
    maxWidth: "50vw",
    maxHeight: "35vh",
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

export default function CreateStaff() {
  const classes = useStyles();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const userType = "Staff";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.put("http://localhost:8080/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        userType,
      });
      res.data && window.location.replace("/users");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <CssBaseline />
              <Typography variant="h6" gutterBottom>
                Create Staff
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    label="Last name"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleSubmit}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          </Paper>
        </main>
      </Container>
    </main>
  );
}
