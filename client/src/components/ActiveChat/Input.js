import React, { useState, useRef } from "react";
import {
  Grid,
  FormControl,
  FilledInput,
  Button,
  Typography,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage, fetchCloudinary } from "../../store/utils/thunkCreators";
import uniqid from "uniqid";

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
  hidden: {
    display: "none",
  },
  img: {
    width: "auto",
    height: "10rem",
    margin: "1rem",
  },
  imgIcon: {
    position: "absolute",
    bottom: "2.5rem",
    right: "1rem",
    cursor: "pointer",
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [imgURL, setImgURL] = useState();
  const [attachments, setAttachments] = useState([]);
  const imgInput = useRef(null);
  const imgAttachTypo = useRef(null);
  const { postMessage, otherUser, conversationId, user } = props;

  const handleTextChange = (event) => {
    setText(event.target.value);
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
    setPreviewSource();
    setAttachments([]);
    imgAttachTypo.current.style.display = "none";
    imgInput.current.style.display = "none";
  };

  const toggleImgInput = () => {
    imgInput.current.style.display === "none"
      ? (imgInput.current.style.display = "block")
      : (imgInput.current.style.display = "none");
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY);

    fetchCloudinary(formData, setImgURL);
  };

  const handleImgSubmit = (event) => {
    event.preventDefault();
    if (!previewSource) return;
    setPreviewSource();
    setAttachments([...attachments, imgURL]);
    imgInput.current[0].value = "";
    imgInput.current.style.display = "none";
    imgAttachTypo.current.style.display = "block";
  };

  return (
    <Grid>
      {previewSource && (
        <img
          key={uniqid()}
          className={classes.img}
          src={previewSource}
          alt="Chosen"
        />
      )}
      <form
        ref={imgInput}
        className={`${classes.root} ${classes.hidden}`}
        onSubmit={handleImgSubmit}
      >
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            type="file"
            name="imgFile"
            inputProps={{ accept: "image/*" }}
            onChange={handleImgChange}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          disableElevation
        >
          Attach
        </Button>
      </form>
      <Typography ref={imgAttachTypo} className={classes.hidden} variant="h6">
        Image(s) Attached:
      </Typography>
      {attachments.map((img) => {
        return (
          <img
            className={classes.img}
            key={uniqid()}
            src={img}
            alt="Attached"
          />
        );
      })}
      <form className={classes.root} onSubmit={handleTextSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleTextChange}
          />
          <ImageIcon
            className={classes.imgIcon}
            fontSize="large"
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
