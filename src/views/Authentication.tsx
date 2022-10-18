import {
  Avatar,
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../service/firebaseConfig";


const Authentication = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const signInView = () => setIsLoginView(false);
  const logInView = () => setIsLoginView(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginView) {
      signInWithEmailAndPassword(auth, registerEmail, registerPassword).then(
        (userCredential) => {
          const user = userCredential;
          console.log(user);
        }
      );
    } else {
      createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ).then((userCredential) => {
        const user = userCredential;
        console.log(user);
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLoginView ? "Log In" : "Sign In"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            value={isLoginView ? loginEmail : registerEmail}
            onChange={
              isLoginView
                ? (e: React.ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value)
                : (e: React.ChangeEvent<HTMLInputElement>) => setRegisterEmail(e.target.value)
            }
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={isLoginView ? loginPassword : registerPassword}
            onChange={
              isLoginView
                ? (e: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)
                : (e: React.ChangeEvent<HTMLInputElement>) => setRegisterPassword(e.target.value)
            }
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoginView ? "Log In" : "Sign In"}
          </Button>
          <Typography onClick={isLoginView ? signInView : logInView}>
            {isLoginView ? "Don't have an account? Sign In" : "Log in"}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Authentication;
