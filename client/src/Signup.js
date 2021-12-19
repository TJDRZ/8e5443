import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
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

const Login = (props) => {
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
    <Grid container style={{ height: "100vh", width: "100vw" }}>
      <Grid item md={4} xs={12}>
        <SideBanner />
      </Grid>
      <Grid
        md={8}
        xs={12}
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        style={{ position: "relative" }}
      >
        <Grid
          container
          item
          alignItems="center"
          style={{ position: "absolute", top: "2rem" }}
        >
          <Grid
            item
            md={11}
            xs={9}
            style={{ textAlign: "center", whiteSpace: "nowrap" }}
          >
            <Typography color="secondary">Already have an account?</Typography>
          </Grid>
          <Grid item md={1} xs={3} style={{ textAlign: "center" }}>
            <Button onClick={() => history.push("/login")} color="primary">
              Login
            </Button>
          </Grid>
        </Grid>
        <form onSubmit={handleRegister} style={{ width: "75%" }}>
          <Grid
            container
            item
            direction="column"
            alignItems="stretch"
            style={{ gap: "1rem" }}
          >
            <Typography
              variant="h4"
              component="h1"
              style={{ fontWeight: "600" }}
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
            <Grid item style={{ alignSelf: "center" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                disableElevation
                style={{ width: "10rem" }}
              >
                Create
              </Button>
            </Grid>
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
