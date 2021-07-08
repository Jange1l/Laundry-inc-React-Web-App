import React from "react";
import "./sidebar.css";
import { LineStyle, PermIdentity } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function Sidebar() {
  const [active, SetActive] = useState("");

  const classes = useStyles();

  return (
    // <div className="sidebar">
      <Paper classes={classes.paper}>
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle"> Dashboard </h3>
            <ul className="sidebarList">
              <Link to="/" className="link" style={{ textDecoration: "none" }}>
                <li className="sidebarListItem">
                  <LineStyle className="sidebarIcon" />
                  Dashboard
                </li>
              </Link>
              <Link
                to="/users"
                className="link"
                style={{ textDecoration: "none" }}
              >
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Staff
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </Paper>
    // </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    flex: 1,
    top: '50px',
    position: 'sticky',
    
  }
}));