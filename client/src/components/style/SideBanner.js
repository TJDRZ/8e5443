import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import bgImg from "../../assets/bg-img.png";
import bubble from "../../assets/bubble.svg";

const useStyles = makeStyles(() => ({
  asidePic: {
    position: "relative",
    height: "100%",
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  asideGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)",
    opacity: "0.85",
  },
}));

const SideBanner = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.asidePic} container>
      <Grid
        container
        item
        direction="column"
        style={{ width: "100%", gap: "2rem" }}
        justify="center"
        alignItems="center"
      >
        <Grid item style={{ width: "67px", height: "66px", zIndex: 1 }}>
          <img
            className={classes.chatBubbleImg}
            src={bubble}
            alt="Chat Bubble"
          />
        </Grid>
        <Grid
          item
          style={{
            width: "50%",
            fontSize: "26px",
            textAlign: "center",
            lineHeight: "40px",
            color: "#fff",
            zIndex: 1,
          }}
        >
          <Typography
            className={classes.sideBannerText}
            variant="h6"
            component="h2"
          >
            Converse with anyone with any language
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.asideGradient}></Box>
    </Grid>
  );
};

export default SideBanner;
