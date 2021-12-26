import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import SideBanner from "./components/style/SideBanner";

const useStyles = makeStyles((theme) => ({
  componentContainer: {
    height: "100vh",
    width: "100vw",
  },
  topBanner: {
    position: "absolute",
    top: "2rem",
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      top: "0",
      marginBottom: "1rem",
    },
    padding: "0 2rem",
    [theme.breakpoints.up("xs")]: {
      gap: "1rem",
    },
    [theme.breakpoints.up("sm")]: {
      gap: "15rem",
    },
    [theme.breakpoints.up("lg")]: {
      gap: "10rem",
    },
  },
  pageButton: {
    width: "10.625rem",
    height: "3.375rem",
    color: "#3A8DFF",
    backgroundColor: "#FFF",
    borderRadius: "5px",
  },
  form: {
    width: "75%",
  },
  formTitle: {
    fontWeight: "600",
  },
  submitButton: {
    width: "10rem",
    alignSelf: "center",
  },
  gap: {
    gap: "1rem",
  },
  positionRelative: {
    position: "relative",
  },
  bannerMarginLeft: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: "20rem",
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: "0rem",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid className={classes.componentContainer} container>
      <Grid item md={4} xs={12}>
        <SideBanner />
      </Grid>
      <Grid
        className={classes.positionRelative}
        md={8}
        xs={12}
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid
          className={classes.topBanner}
          container
          item
          justify="center"
          alignItems="center"
        >
          <Typography className={classes.bannerMarginLeft} color="secondary">
            Already have an account?
          </Typography>
          <Button
            className={classes.pageButton}
            onClick={() => history.push("/login")}
            variant="contained"
          >
            Login
          </Button>
        </Grid>
        <form className={classes.form} onSubmit={handleRegister}>
          <Grid
            className={classes.gap}
            container
            item
            direction="column"
            alignItems="stretch"
          >
            <Typography
              className={classes.formTitle}
              variant="h4"
              component="h1"
            >
              Create an account.
            </Typography>
            <FormControl>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                required
              />
            </FormControl>
            <FormControl>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required
              />
            </FormControl>
            <FormControl error={!!formErrorMessage.confirmPassword}>
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
            <FormControl error={!!formErrorMessage.confirmPassword}>
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
            <Button
              className={classes.submitButton}
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              disableElevation
            >
              Create
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
