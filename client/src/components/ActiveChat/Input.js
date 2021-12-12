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

  const handleImgChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gglru5ny");
    await fetch("https://api.cloudinary.com/v1_1/tjdrz/image/upload", {
      method: "POST",
      body: formData,
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => setImgURL(res.secure_url))
      .catch((err) => console.log(err));
  };

  const handleImgSubmit = async (event) => {
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
          src={previewSource}
          alt="Chosen"
          style={{ width: "10rem", height: "10rem" }}
        />
      )}
      <form
        ref={imgInput}
        className={classes.root}
        style={{ display: "none" }}
        onSubmit={handleImgSubmit}
      >
        <FormControl fullWidth hiddenLabel style={{ position: "relative" }}>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            type="file"
            name="imgFile"
            onChange={handleImgChange}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          style={{ width: "10rem" }}
        >
          Attach
        </Button>
      </form>
      <Typography ref={imgAttachTypo} variant="h6" style={{ display: "none" }}>
        Image(s) Attached:
      </Typography>
      {attachments.map((img, index) => {return <img key={index} src={img} alt="Attached" style={{ width: "10rem", height: "10rem", margin: "1rem" }}/>})}
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
