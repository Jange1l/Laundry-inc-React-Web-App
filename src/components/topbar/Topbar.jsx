import React from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      backgroundColor: "transparent",
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

export default function Topbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="topLeft">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logo">Laundry inc.</span>
            </Link>
          </div>
        </Grid>
        <Grid item justify="flex-end" container xs={6}>
          <div className="topRight">
            {/* <img src="https://images.pexels.com/photos/5218021/pexels-photo-5218021.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" className="topAvatar" /> */}
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Account
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Grid>
      </Grid>
    </Paper>

    // <div className="topbar">
    //   <div className="topbarWrapper">
    //     <div className="topLeft">
    //       <Link to="/" style={{ textDecoration: "none" }}>
    //         <span className="logo">Laundry inc.</span>
    //       </Link>
    //     </div>
    //     <div className="topRight">
    //       {/* <img src="https://images.pexels.com/photos/5218021/pexels-photo-5218021.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" className="topAvatar" /> */}
    //       <Button
    //         aria-controls="simple-menu"
    //         aria-haspopup="true"
    //         onClick={handleClick}
    //       >
    //         Account
    //       </Button>
    //       <Menu
    //         id="simple-menu"
    //         anchorEl={anchorEl}
    //         keepMounted
    //         open={Boolean(anchorEl)}
    //         onClose={handleClose}
    //       >
    //         <MenuItem onClick={handleClose}>Logout</MenuItem>
    //       </Menu>
    //     </div>
    //   </div>
    // </div>
  );
}
