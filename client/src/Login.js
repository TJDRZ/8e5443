import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import SideBanner from "./components/style/SideBanner";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
            <Typography color="secondary">Don't have an account?</Typography>
          </Grid>
          <Grid item md={1} xs={3} style={{ textAlign: "center" }}>
            <Button onClick={() => history.push("/register")} color="primary">
              Create account
            </Button>
          </Grid>
        </Grid>
        <form onSubmit={handleLogin} style={{ width: "75%" }}>
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
              Welcome back!
            </Typography>
            <FormControl margin="normal" required>
              <TextField
                aria-label="username"
                label="E-mail address"
                name="username"
                type="text"
              />
            </FormControl>
            <FormControl margin="normal" required>
              <TextField
                label="Password"
                aria-label="password"
                type="password"
                name="password"
              />
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
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
