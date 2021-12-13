import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import uniqid from "uniqid";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  img: {
    width: "10rem",
    height: "10rem",
    margin: "1rem",
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, attachments, text } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
        {attachments ? attachments.map(img => {
          return (
            <img
              key={uniqid()}
              className={classes.img}
              src={img}
              alt="Sent"
            />
          );
        }) : null}
      </Box>
    </Box>
  );
};

export default SenderBubble;
