import React from "react";
import { Typography, AppBar, Button } from "@material-ui/core";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notif from "./components/Notif";
import makeStyles from "./styles";
import app from "./authentication/Firebase";
import { useAuthState } from 'react-firebase-hooks/auth'

import { signOut, getAuth } from "firebase/auth";

import AuthScreen from "./components/AuthScreen";
const authh = getAuth();
const App = () => {
  
 
  const classes = makeStyles();
  const [user] = useAuthState(authh);
  console.log(user);
  const clickHandler = () =>{
    signOut(authh).then(() => {
      console.log('done');
    }).catch((error) => {
      console.log(error);
    });

  }

  return (
   
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Button onClick = {clickHandler}> Sign Out</Button>
        <Typography variant="h2" align="center">
          Connect
        </Typography>
      </AppBar>
      {user ? 
      <div>
      <VideoPlayer />
      <Options>
        <Notif />
      </Options>
      </div>
      : <AuthScreen />
      }
    </div>
  );
};

export default App;
