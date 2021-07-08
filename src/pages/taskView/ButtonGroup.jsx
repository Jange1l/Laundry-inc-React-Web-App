import React from "react";
import { Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent:'space-between'
  },
  buttonNormal: {
    textTransform: "none",
    marginRight: "10px",
    // marginLeft:'5px',
    opacity: 0.6,
    borderRadius: 10,
    border: "1px solid #737373",
    "&:hover": {
      color: "#1c63cd",
      transform: `scale(1.05)`,
    },
  },
  selectedButton: {
    textTransform: "none",
    marginRight: "10px",
    // marginLeft:'5px',
    backgroundColor: "#1c63cd",
    color: "#fff",
    opacity: 1,
    borderRadius: 10,
    "&:hover": {
      opacity: 0.8,
      color: "#fff",
      transform: `scale(1.05)`,
      // backgroundColor:'#00A2FE',
      backgroundColor: "#1c63cd",
    },
  },
});

const ButtonGroup = (props) => {
  const classes = useStyles();
  
  let content = props.names.map((tab, indx) => (
    <Button
      key={indx}
      classes={{
        root:
          props.selected !== indx
            ? classes.buttonNormal
            : classes.selectedButton,
      }}
      onClick={() => props.buttonClicked(indx)}
    >
      {tab}
    </Button>
  ));

  return (
    // <Grid item container spacing={4}>
    <div className={classes.root}>{content}</div>
    // </Grid>
  );
};

export default ButtonGroup;
