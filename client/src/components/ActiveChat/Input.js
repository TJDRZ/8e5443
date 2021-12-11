import React, { useState, useRef } from "react";
import { Grid, FormControl, FilledInput, Typography } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [attachments, setAttachments] = useState([]);
  const imgInput = useRef(null);
  const imgAttachTypo = useRef(null);
  const { postMessage, otherUser, conversationId, user } = props;

  const toggleImgInput = () => {
    imgInput.current.style.display === "none"
      ? (imgInput.current.style.display = "block")
      : (imgInput.current.style.display = "none");
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImgChange = (event) => {
    setImgUrl(event.target.value);
  };

  const handleTextSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: attachments ? attachments : null,
    };
    await postMessage(reqBody);
    await props.fetchConvos();
    setText("");
    setAttachments([]);
    imgAttachTypo.current.style.display = "none";
    imgInput.current.style.display = "none";
  };

  const handleImgSubmit = (event) => {
    event.preventDefault();
    setAttachments([...attachments, imgUrl]);
    setImgUrl("");
    imgAttachTypo.current.style.display = "block";
  };

  return (
    <Grid>
      <form ref={imgInput} className={classes.root} style={{ display: "none" }} onSubmit={handleImgSubmit}>
        <FormControl fullWidth hiddenLabel style={{ position: "relative" }}>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type image url..."
            value={imgUrl}
            name="imgUrl"
            onChange={handleImgChange} 
          />
        </FormControl>
      </form>
      <Typography ref={imgAttachTypo} variant="h6" style={{ display: "none" }}>Image(s) Attached!</Typography>
      <form className={classes.root} onSubmit={handleTextSubmit}>
        <FormControl fullWidth hiddenLabel style={{ position: "relative" }}>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleTextChange}
          />
          <ImageIcon
            fontSize="large"
            style={{
              position: "absolute",
              bottom: "2.5rem",
              right: "1rem",
              cursor: "pointer",
            }}
            onClick={toggleImgInput}
          />
        </FormControl>
      </form>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
